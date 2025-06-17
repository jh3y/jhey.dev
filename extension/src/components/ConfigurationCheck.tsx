import {
  ActionPanel,
  Action,
  List,
  showToast,
  Toast,
  openExtensionPreferences,
} from "@raycast/api";
import { CONFIG } from "../config";

interface Preferences {
  localRepoPath?: string;
  githubToken?: string;
}

interface ConfigurationCheckProps {
  preferences: Preferences;
  children: React.ReactNode;
}

export function useConfigurationCheck(preferences: Preferences) {
  const hasLocalConfig = !!preferences.localRepoPath;
  const hasGithubConfig = !!(
    preferences.githubToken &&
    CONFIG.REPO_OWNER &&
    CONFIG.REPO_NAME
  );
  const isConfigured = hasLocalConfig || hasGithubConfig;

  return {
    isConfigured,
    hasLocalConfig,
    hasGithubConfig,
  };
}

export function ConfigurationCheck({
  preferences,
  children,
}: ConfigurationCheckProps) {
  const { isConfigured } = useConfigurationCheck(preferences);

  if (!isConfigured) {
    return (
      <List
        actions={
          <ActionPanel>
            <Action
              title="Open Extension Preferences"
              onAction={async () => {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "Configuration Required",
                  message:
                    "Please configure either local or GitHub storage in preferences",
                });
                await openExtensionPreferences();
              }}
            />
          </ActionPanel>
        }
      >
        <List.EmptyView
          icon="⚙️"
          title="Configuration Required"
          description="Please configure either a local repository path or GitHub settings in the extension preferences to start adding thoughts."
        />
      </List>
    );
  }

  return <>{children}</>;
}
