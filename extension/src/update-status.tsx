import { getPreferenceValues } from "@raycast/api";
import StatusForm, { StatusFormValues } from "./components/StatusForm";
import { useStatusStorage } from "./hooks/useThoughtStorage";
import { ConfigurationCheck } from "./components/ConfigurationCheck";
import { CONFIG } from "./config";

interface Preferences {
  localRepoPath?: string;
  githubToken?: string;
}

export default function UpdateStatus() {
  const preferences = getPreferenceValues<Preferences>();
  const STATUS_FILE_PATH = "site/src/data/status.json";
  const { isLoading, updateStatus } = useStatusStorage({
    localRepoPath: preferences.localRepoPath,
    githubToken: preferences.githubToken,
    repoOwner: CONFIG.REPO_OWNER,
    repoName: CONFIG.REPO_NAME,
    filePath: STATUS_FILE_PATH,
    branch: CONFIG.BRANCH,
    onError: (error) => {
      console.error("Error updating status:", error);
    },
  });

  const handleSubmit = async (values: StatusFormValues) => {
    const success = await updateStatus({
      location: values.location,
      status: values.status,
    });
    if (!success) {
      console.log("UpdateStatus - Operation failed");
      return;
    }
  };

  return (
    <ConfigurationCheck preferences={preferences}>
      <StatusForm onSubmit={handleSubmit} isLoading={isLoading} />
    </ConfigurationCheck>
  );
} 