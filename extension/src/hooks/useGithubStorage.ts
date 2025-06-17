import { useState, useEffect } from "react";
import { showHUD } from "@raycast/api";
import { Octokit } from "octokit";
import { ThoughtItem } from "./useThoughtStorage";
import {
  addThought as addThoughtOperation,
  editThought as editThoughtOperation,
  deleteThought as deleteThoughtOperation,
} from "../utils/thoughtOperations";

interface UseGithubStorageProps {
  githubToken: string;
  repoOwner: string;
  repoName: string;
  filePath: string;
  branch: string;
}

export function useGithubStorage({
  githubToken,
  repoOwner,
  repoName,
  filePath,
  branch,
}: UseGithubStorageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [thoughts, setThoughts] = useState<ThoughtItem[]>([]);
  const octokit = new Octokit({ auth: githubToken });

  const fetchThoughts = async () => {
    try {
      setIsLoading(true);
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
        ref: branch,
      });

      if ("content" in fileData) {
        const content = Buffer.from(fileData.content, "base64").toString();
        const parsedData = JSON.parse(content);
        setThoughts(Array.isArray(parsedData) ? parsedData : []);
      } else {
        setThoughts([]);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Not Found") {
        // File doesn't exist yet, that's okay
        setThoughts([]);
      } else {
        console.error(error);
        showHUD("Failed to fetch thoughts");
        setThoughts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateThoughts = async (newThoughts: ThoughtItem[]) => {
    try {
      setIsLoading(true);
      const content = JSON.stringify(newThoughts, null, 2);
      console.log("useGithubStorage - Attempting to update thoughts");

      try {
        // Try to get the existing file
        console.log("useGithubStorage - Fetching existing file");
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: filePath,
          ref: branch,
        });

        if (!("sha" in fileData)) {
          console.log("useGithubStorage - Could not get file SHA");
          throw new Error("Could not get file SHA");
        }

        // Update existing file
        console.log("useGithubStorage - Updating existing file");
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: repoOwner,
          repo: repoName,
          path: filePath,
          message: "Update thoughts",
          content: Buffer.from(content).toString("base64"),
          sha: fileData.sha,
          branch,
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "Not Found") {
          // File doesn't exist, create it
          console.log(
            "useGithubStorage - File doesn't exist, creating new file",
          );
          await octokit.rest.repos.createOrUpdateFileContents({
            owner: repoOwner,
            repo: repoName,
            path: filePath,
            message: "Create thoughts file",
            content: Buffer.from(content).toString("base64"),
            branch,
          });
        } else {
          console.error(
            "useGithubStorage - Error during file operation:",
            error,
          );
          throw error;
        }
      }

      console.log("useGithubStorage - Successfully updated thoughts");
      setThoughts(newThoughts);
      return true;
    } catch (error) {
      console.error("useGithubStorage - Failed to update thoughts:", error);
      showHUD("Failed to update thoughts");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const operations = { updateThoughts };

  const addThought = (thought: Omit<ThoughtItem, "date">) =>
    addThoughtOperation(operations, thoughts, thought);
  const editThought = (date: string, thought: Omit<ThoughtItem, "date">) =>
    editThoughtOperation(operations, thoughts, date, thought);
  const deleteThought = (index: number) =>
    deleteThoughtOperation(operations, thoughts, index);

  useEffect(() => {
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
