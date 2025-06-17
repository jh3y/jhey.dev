import { showToast, Toast } from "@raycast/api";
import { ThoughtItem } from "../hooks/useThoughtStorage";

export interface ThoughtOperations {
  updateThoughts: (newThoughts: ThoughtItem[]) => Promise<boolean>;
}

export async function addThought(
  operations: ThoughtOperations,
  thoughts: ThoughtItem[],
  thought: Omit<ThoughtItem, "date">,
): Promise<boolean> {
  console.log("thoughtOperations - Starting addThought");
  try {
    const newThought: ThoughtItem = {
      ...thought,
      date: new Date().toISOString(),
    };
    console.log("thoughtOperations - Created new thought:", newThought);
    console.log("thoughtOperations - Calling updateThoughts");
    const success = await operations.updateThoughts([newThought, ...thoughts]);
    console.log("thoughtOperations - updateThoughts result:", success);

    // We don't show success toast here anymore - it will be handled by useLocalStorage
    // based on whether both local and git operations succeeded
    return success;
  } catch (error) {
    console.error("thoughtOperations - Error adding thought:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to add thought",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
    return false;
  }
}

export async function editThought(
  operations: ThoughtOperations,
  thoughts: ThoughtItem[],
  date: string,
  thought: Omit<ThoughtItem, "date">,
): Promise<boolean> {
  try {
    const index = thoughts.findIndex((i) => i.date === date);
    if (index === -1) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to edit thought",
        message: "Thought not found",
      });
      return false;
    }

    const newThoughts = [...thoughts];
    newThoughts[index] = { ...thought, date };
    const success = await operations.updateThoughts(newThoughts);
    if (success) {
      await showToast({
        style: Toast.Style.Success,
        title: "Updated Thought",
      });
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to update thought",
      });
    }
    return success;
  } catch (error) {
    console.error("Error editing thought:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to edit thought",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
    return false;
  }
}

export async function deleteThought(
  operations: ThoughtOperations,
  thoughts: ThoughtItem[],
  index: number,
): Promise<boolean> {
  try {
    const newThoughts = [...thoughts];
    newThoughts.splice(index, 1); // Actually remove the item
    const success = await operations.updateThoughts(newThoughts);
    if (success) {
      await showToast({
        style: Toast.Style.Success,
        title: "Deleted Thought",
      });
    } else {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to delete thought",
      });
    }
    return success;
  } catch (error) {
    console.error("Error deleting thought:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to delete thought",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
    return false;
  }
}
