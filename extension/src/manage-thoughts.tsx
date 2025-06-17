import { List, ActionPanel, Action, getPreferenceValues } from "@raycast/api";
import ThoughtForm, { ThoughtFormValues } from "./components/ThoughtForm";
import { useThoughtStorage, ThoughtItem } from "./hooks/useThoughtStorage";
import { useState } from "react";
import { ConfigurationCheck } from "./components/ConfigurationCheck";
import { CONFIG } from "./config";

interface Preferences {
  localRepoPath?: string;
  githubToken?: string;
}

export default function ManageThoughts() {
  const [selectedThought, setSelectedThought] = useState<ThoughtItem | null>(
    null,
  );
  const [searchText, setSearchText] = useState("");
  const preferences = getPreferenceValues<Preferences>();
  const { isLoading, thoughts, editThought, deleteThought } = useThoughtStorage(
    {
      localRepoPath: preferences.localRepoPath,
      githubToken: preferences.githubToken,
      repoOwner: CONFIG.REPO_OWNER,
      repoName: CONFIG.REPO_NAME,
      filePath: CONFIG.FILE_PATH,
      branch: CONFIG.BRANCH,
      onError: (error) => {
        console.error("Error managing thoughts:", error);
      },
    },
  );

  const handleEdit = async (values: ThoughtFormValues) => {
    if (selectedThought) {
      const success = await editThought(selectedThought.date, {
        id: selectedThought.id,
        ...values,
      });
      if (success) {
        setSelectedThought(null);
      }
    }
  };

  const handleDelete = async (thought: ThoughtItem) => {
    const index = thoughts.findIndex((t) => t.date === thought.date);
    if (index === -1) return;

    const success = await deleteThought(index);
    if (success) {
      setSelectedThought(null);
    }
  };

  if (selectedThought) {
    return (
      <ThoughtForm
        defaultValues={selectedThought}
        onSubmit={handleEdit}
        onCancel={() => setSelectedThought(null)}
      />
    );
  }

  const filteredThoughts = thoughts.filter((thought) => {
    const searchLower = searchText.toLowerCase();
    const titleMatch =
      thought.title?.toLowerCase().includes(searchLower) || false;
    const bodyMatch =
      thought.body?.toLowerCase().includes(searchLower) || false;
    return titleMatch || bodyMatch;
  });

  return (
    <ConfigurationCheck preferences={preferences}>
      <List
        isLoading={isLoading}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        searchBarPlaceholder="Search thoughts..."
      >
        {filteredThoughts.map((thought: ThoughtItem) => (
          <List.Item
            key={thought.id}
            title={thought.title || (thought.body || "").split("\n")[0]}
            subtitle={
              thought.title
                ? thought.body
                : (thought.body || "").split("\n").slice(1).join("\n")
            }
            accessories={[
              { text: new Date(thought.date).toLocaleDateString() },
            ]}
            actions={
              <ActionPanel>
                <Action
                  title="Edit"
                  onAction={() => setSelectedThought(thought)}
                />
                <Action
                  title="Delete"
                  style={Action.Style.Destructive}
                  onAction={() => handleDelete(thought)}
                />
              </ActionPanel>
            }
          />
        ))}
      </List>
    </ConfigurationCheck>
  );
}
