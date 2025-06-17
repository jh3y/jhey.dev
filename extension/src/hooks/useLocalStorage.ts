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
      console.log("useLocalStorage - Starting updateThoughts operation");
      console.log("useLocalStorage - Updating thoughts in:", fullPath);
      console.log("useLocalStorage - Local repo path:", localRepoPath);
      console.log("useLocalStorage - File path:", filePath);

      // Ensure the directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        console.log("useLocalStorage - Creating directory:", dir);
        fs.mkdirSync(dir, { recursive: true });
      }

      // Handle git operations first - pull latest changes
      console.log(
        "useLocalStorage - ABOUT TO CALL handleGitOperations for pull",
      );
      console.log("useLocalStorage - localRepoPath:", localRepoPath);
      console.log("useLocalStorage - filePath:", filePath);

      try {
        const gitSuccess = await handleGitOperations(
          localRepoPath,
          filePath,
          "pull",
        );
        console.log(
          "useLocalStorage - AFTER handleGitOperations call, result:",
          gitSuccess,
        );

        if (!gitSuccess) {
          console.log("useLocalStorage - Git operations failed");
          await showToast({
            style: Toast.Style.Failure,
            title: "Git sync failed",
            message:
              "Failed to sync with git. Your changes may not be up to date.",
          });
          return false; // Don't proceed with local changes if git sync failed
        }
      } catch (error) {
        console.error("useLocalStorage - Error during git operations:", error);
        await showToast({
          style: Toast.Style.Failure,
          title: "Git sync failed",
          message:
            "Failed to sync with git. Your changes may not be up to date.",
        });
        return false; // Don't proceed with local changes if git sync failed
      }

      // Write the updated data
      console.log("useLocalStorage - Writing to file");
      fs.writeFileSync(fullPath, JSON.stringify(newThoughts, null, 2));
      setThoughts(newThoughts);
      console.log("useLocalStorage - Successfully updated thoughts locally");

      // Show success for local update
      await showToast({
        style: Toast.Style.Success,
        title: "Thought added",
      });

      // Now commit and push the changes
      try {
        const gitSuccess = await handleGitOperations(
          localRepoPath,
          filePath,
          "push",
        );
        console.log(
          "useLocalStorage - AFTER handleGitOperations call for push, result:",
          gitSuccess,
        );

        if (!gitSuccess) {
          console.log(
            "useLocalStorage - Git push failed, but file was saved locally",
          );
          await showToast({
            style: Toast.Style.Failure,
            title: "Git push failed",
            message:
              "Thought was added but failed to push to git. You may need to manually commit and push changes.",
          });
        } else {
          console.log("useLocalStorage - Git push completed successfully");
          await showToast({
            style: Toast.Style.Success,
            title: "Thought pushed",
            message: "Successfully synced with git repository",
          });
        }
      } catch (error) {
        console.error("useLocalStorage - Error during git push:", error);
        await showToast({
          style: Toast.Style.Failure,
          title: "Git push failed",
          message:
            "Thought was added but failed to push to git. You may need to manually commit and push changes.",
        });
      }

      return true;
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
