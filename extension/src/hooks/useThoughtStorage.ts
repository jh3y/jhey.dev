import { openExtensionPreferences, showToast, Toast } from "@raycast/api";
import { useGithubStorage } from "./useGithubStorage";
import { useLocalStorage } from "./useLocalStorage";
import { CONFIG } from "../config";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { handleGitOperations, updateJsonFileWithGitSync } from "../utils/gitOperations";

export interface ThoughtItem {
  id: string;
  status?: string;
  body: string;
  date: string;
}

interface UseThoughtStorageProps {
  localRepoPath?: string;
  githubToken?: string;
  repoOwner?: string;
  repoName?: string;
  filePath?: string;
  branch?: string;
  onError?: (error: Error) => void;
}

export function useThoughtStorage(props: UseThoughtStorageProps) {
  console.log("useThoughtStorage - Props:", {
    hasLocalPath: !!props.localRepoPath,
    hasGithubConfig: !!(props.githubToken && props.repoOwner && props.repoName),
    filePath: props.filePath || CONFIG.FILE_PATH,
  });

  const filePath = props.filePath || CONFIG.FILE_PATH;
  const hasLocalConfig = props.localRepoPath;
  const hasGithubConfig =
    props.githubToken && props.repoOwner && props.repoName;

  if (!hasLocalConfig && !hasGithubConfig) {
    console.log("useThoughtStorage - No valid configuration found");
    const handleMissingConfig = async () => {
      console.log(
        "useThoughtStorage - Opening preferences due to missing config",
      );
      await showToast({
        style: Toast.Style.Failure,
        title: "Configuration Required",
        message:
          "Please configure either local or GitHub storage in preferences",
      });
      await openExtensionPreferences();
    };

    return {
      isLoading: false,
      thoughts: [],
      fetchThoughts: handleMissingConfig,
      addThought: async () => {
        console.log("useThoughtStorage - addThought called with no config");
        await handleMissingConfig();
        return false;
      },
      editThought: async () => {
        await handleMissingConfig();
        return false;
      },
      deleteThought: async () => {
        await handleMissingConfig();
        return false;
      },
    };
  }

  // If local path is configured, use it
  if (hasLocalConfig) {
    console.log("useThoughtStorage - Using local storage");
    return useLocalStorage({
      localRepoPath: props.localRepoPath!,
      filePath,
    });
  }

  // Otherwise use GitHub
  console.log("useThoughtStorage - Using GitHub storage");
  const storage = useGithubStorage({
    githubToken: props.githubToken!,
    repoOwner: props.repoOwner!,
    repoName: props.repoName!,
    filePath,
    branch: props.branch || "main",
  });

  // Wrap the addThought function to generate an ID
  const originalAddThought = storage.addThought;
  storage.addThought = async (thought: Omit<ThoughtItem, "date" | "id">) => {
    return originalAddThought({
      ...thought,
      id: uuidv4(),
    });
  };

  return storage;
}

export interface DemoItem {
  title: string;
  url: string;
}

export function useDemoStorage(props: UseThoughtStorageProps) {
  const filePath = props.filePath || "site/src/data/demo.json";
  const hasLocalConfig = props.localRepoPath;
  const hasGithubConfig = props.githubToken && props.repoOwner && props.repoName;

  const [isLoading, setIsLoading] = useState(false);
  const [demo, setDemo] = useState<DemoItem | null>(null);

  const fetchDemo = async () => {
    setIsLoading(true);
    try {
      let content = "";
      if (hasLocalConfig) {
        const fs = await import("fs");
        const path = await import("path");
        const fullPath = path.join(props.localRepoPath!, filePath);
        if (fs.existsSync(fullPath)) {
          content = fs.readFileSync(fullPath, "utf8");
        }
      } else if (hasGithubConfig) {
        const { Octokit } = await import("octokit");
        const octokit = new Octokit({ auth: props.githubToken });
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: props.repoOwner!,
          repo: props.repoName!,
          path: filePath,
          ref: props.branch || "main",
        });
        if ("content" in fileData) {
          content = Buffer.from(fileData.content, "base64").toString();
        }
      }
      if (content) {
        setDemo(JSON.parse(content));
      }
    } catch (error) {
      setDemo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addDemo = async (demo: DemoItem) => {
    setIsLoading(true);
    try {
      if (hasLocalConfig) {
        // Use shared utility for local file + git sync
        const success = await updateJsonFileWithGitSync(
          props.localRepoPath!,
          filePath,
          demo,
          "Update demo"
        );
        if (!success) return false;
      } else if (hasGithubConfig) {
        const { Octokit } = await import("octokit");
        const octokit = new Octokit({ auth: props.githubToken });
        let sha = undefined;
        try {
          const { data: fileData } = await octokit.rest.repos.getContent({
            owner: props.repoOwner!,
            repo: props.repoName!,
            path: filePath,
            ref: props.branch || "main",
          });
          if ("sha" in fileData) sha = fileData.sha;
        } catch {}
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: props.repoOwner!,
          repo: props.repoName!,
          path: filePath,
          message: "Update demo",
          content: Buffer.from(JSON.stringify(demo, null, 2)).toString("base64"),
          branch: props.branch || "main",
          ...(sha ? { sha } : {}),
        });
      }
      setDemo(demo);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, demo, fetchDemo, addDemo };
}

export interface StatusItem {
  location: string;
  status: string;
}

export function useStatusStorage(props: UseThoughtStorageProps) {
  const filePath = props.filePath || "site/src/data/status.json";
  const hasLocalConfig = props.localRepoPath;
  const hasGithubConfig = props.githubToken && props.repoOwner && props.repoName;

  const [isLoading, setIsLoading] = useState(false);
  const [statusObj, setStatusObj] = useState<StatusItem | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      let content = "";
      if (hasLocalConfig) {
        const fs = await import("fs");
        const path = await import("path");
        const fullPath = path.join(props.localRepoPath!, filePath);
        if (fs.existsSync(fullPath)) {
          content = fs.readFileSync(fullPath, "utf8");
        }
      } else if (hasGithubConfig) {
        const { Octokit } = await import("octokit");
        const octokit = new Octokit({ auth: props.githubToken });
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: props.repoOwner!,
          repo: props.repoName!,
          path: filePath,
          ref: props.branch || "main",
        });
        if ("content" in fileData) {
          content = Buffer.from(fileData.content, "base64").toString();
        }
      }
      if (content) {
        setStatusObj(JSON.parse(content));
      }
    } catch (error) {
      setStatusObj(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (statusObj: StatusItem) => {
    setIsLoading(true);
    try {
      if (hasLocalConfig) {
        // Use shared utility for local file + git sync
        const success = await updateJsonFileWithGitSync(
          props.localRepoPath!,
          filePath,
          statusObj,
          "Update status"
        );
        if (!success) return false;
      } else if (hasGithubConfig) {
        const { Octokit } = await import("octokit");
        const octokit = new Octokit({ auth: props.githubToken });
        let sha = undefined;
        try {
          const { data: fileData } = await octokit.rest.repos.getContent({
            owner: props.repoOwner!,
            repo: props.repoName!,
            path: filePath,
            ref: props.branch || "main",
          });
          if ("sha" in fileData) sha = fileData.sha;
        } catch {}
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: props.repoOwner!,
          repo: props.repoName!,
          path: filePath,
          message: "Update status",
          content: Buffer.from(JSON.stringify(statusObj, null, 2)).toString("base64"),
          branch: props.branch || "main",
          ...(sha ? { sha } : {}),
        });
      }
      setStatusObj(statusObj);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, statusObj, fetchStatus, updateStatus };
}
