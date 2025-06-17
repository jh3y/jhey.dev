import { openExtensionPreferences, showToast, Toast } from "@raycast/api";
import { useGithubStorage } from "./useGithubStorage";
import { useLocalStorage } from "./useLocalStorage";
import { CONFIG } from "../config";
import { v4 as uuidv4 } from "uuid";

export interface ThoughtItem {
  id: string;
  title?: string;
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
