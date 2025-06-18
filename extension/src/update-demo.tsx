import { getPreferenceValues } from "@raycast/api";
import DemoForm, { DemoFormValues } from "./components/DemoForm";
import { useDemoStorage } from "./hooks/useThoughtStorage";
import { ConfigurationCheck } from "./components/ConfigurationCheck";
import { CONFIG } from "./config";

interface Preferences {
  localRepoPath?: string;
  githubToken?: string;
}

export default function UpdateDemo() {
  const preferences = getPreferenceValues<Preferences>();
  const DEMO_FILE_PATH = "site/src/data/demo.json";
  const { isLoading, addDemo } = useDemoStorage({
    localRepoPath: preferences.localRepoPath,
    githubToken: preferences.githubToken,
    repoOwner: CONFIG.REPO_OWNER,
    repoName: CONFIG.REPO_NAME,
    filePath: DEMO_FILE_PATH,
    branch: CONFIG.BRANCH,
    onError: (error) => {
      console.error("Error adding demo:", error);
    },
  });

  const handleSubmit = async (values: DemoFormValues) => {
    const success = await addDemo({
      title: values.title,
      url: values.url,
    });
    if (!success) {
      console.log("AddDemo - Operation failed");
      return;
    }
  };

  return (
    <ConfigurationCheck preferences={preferences}>
      <DemoForm onSubmit={handleSubmit} isLoading={isLoading} />
    </ConfigurationCheck>
  );
} 