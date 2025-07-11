import { useState, useEffect } from "react";
import { showToast, Toast } from "@raycast/api";
import fs from "fs";
import path from "path";
import { ThoughtItem } from "./useThoughtStorage";
import {
  addThought as addThoughtOperation,
  editThought as editThoughtOperation,
  deleteThought as deleteThoughtOperation,
} from "../utils/thoughtOperations";
import { handleGitOperations } from "../utils/gitOperations";
import { updateJsonFileWithGitSync } from "../utils/gitOperations";
import { v4 as uuidv4 } from "uuid";

interface UseLocalStorageProps {
  localRepoPath: string;
  filePath: string;
}

export function useLocalStorage({
  localRepoPath,
  filePath,
}: UseLocalStorageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [thoughts, setThoughts] = useState<ThoughtItem[]>([]);

  const fullPath = path.join(localRepoPath, filePath);
  console.log("useLocalStorage - Full file path:", fullPath);

  const fetchThoughts = async () => {
    try {
      setIsLoading(true);
      console.log("useLocalStorage - Fetching thoughts from:", fullPath);

      // Ensure the directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        console.log("useLocalStorage - Creating directory:", dir);
        fs.mkdirSync(dir, { recursive: true });
      }

      // Read the file if it exists, otherwise create an empty array
      if (fs.existsSync(fullPath)) {
        console.log("useLocalStorage - Reading existing file");
        const content = fs.readFileSync(fullPath, "utf8");
        const data = JSON.parse(content);
        setThoughts(Array.isArray(data) ? data : []);
      } else {
        console.log(
          "useLocalStorage - File doesn't exist, initializing empty array",
        );
        setThoughts([]);
        // Create the file with an empty array
        fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error("useLocalStorage - Error fetching thoughts:", error);
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to fetch thoughts",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      setThoughts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateThoughts = async (newThoughts: ThoughtItem[]) => {
    try {
      setIsLoading(true);
      // Use shared utility for local file + git sync
      const success = await updateJsonFileWithGitSync(
        localRepoPath,
        filePath,
        newThoughts,
        "Thoughts updated"
      );
      if (success) setThoughts(newThoughts);
      return success;
    } catch (error) {
      console.error("useLocalStorage - Failed to update thoughts:", error);
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to update thoughts",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const operations = { updateThoughts };

  const addThought = async (thought: Omit<ThoughtItem, "date" | "id">) => {
    console.log("useLocalStorage - Adding new thought");
    console.log("useLocalStorage - Thought data:", thought);
    return await addThoughtOperation(operations, thoughts, {
      ...thought,
      id: uuidv4(),
    });
  };

  const editThought = async (
    date: string,
    thought: Omit<ThoughtItem, "date">,
  ) => {
    console.log("useLocalStorage - Editing thought from:", date);
    console.log("useLocalStorage - New thought data:", thought);
    return await editThoughtOperation(operations, thoughts, date, thought);
  };

  const deleteThought = async (index: number) => {
    console.log("useLocalStorage - Deleting thought at index:", index);
    return await deleteThoughtOperation(operations, thoughts, index);
  };

  useEffect(() => {
    console.log("useLocalStorage - Initializing hook");
    console.log("useLocalStorage - Local repo path:", localRepoPath);
    console.log("useLocalStorage - File path:", filePath);
    fetchThoughts();
  }, []);

  return {
    isLoading,
    thoughts,
    fetchThoughts,
    addThought,
    editThought,
    deleteThought,
  };
}
