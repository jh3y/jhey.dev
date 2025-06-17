import { getPreferenceValues } from "@raycast/api";
import ThoughtForm, { ThoughtFormValues } from "./components/ThoughtForm";
import { useThoughtStorage } from "./hooks/useThoughtStorage";
import { ConfigurationCheck } from "./components/ConfigurationCheck";
import { CONFIG } from "./config";
import { v4 as uuidv4 } from "uuid";

interface Preferences {
  localRepoPath?: string;
  githubToken?: string;
}

export default function AddThoughts() {
  const preferences = getPreferenceValues<Preferences>();
  console.log("AddThoughts - Preferences:", {
    hasLocalPath: !!preferences.localRepoPath,
    hasGithubConfig: !!(
      preferences.githubToken &&
      CONFIG.REPO_OWNER &&
      CONFIG.REPO_NAME
    ),
    filePath: CONFIG.FILE_PATH,
  });

  const { isLoading, addThought } = useThoughtStorage({
    localRepoPath: preferences.localRepoPath,
    githubToken: preferences.githubToken,
    repoOwner: CONFIG.REPO_OWNER,
    repoName: CONFIG.REPO_NAME,
    filePath: CONFIG.FILE_PATH,
    branch: CONFIG.BRANCH,
    onError: (error) => {
      console.error("Error adding thought:", error);
    },
  });

  const handleSubmit = async (values: ThoughtFormValues) => {
    console.log("AddThoughts - handleSubmit called with values:", values);
    const success = await addThought({
      id: uuidv4(),
      body: values.body,
      ...(values.title ? { title: values.title } : {}),
    });
    console.log("AddThoughts - addThought result:", success);
    if (!success) {
      console.log("AddThoughts - Operation failed");
      return;
    }
  };

  return (
    <ConfigurationCheck preferences={preferences}>
      <ThoughtForm onSubmit={handleSubmit} isLoading={isLoading} />
    </ConfigurationCheck>
  );
}
