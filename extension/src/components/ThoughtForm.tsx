import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { ThoughtItem } from "../hooks/useThoughtStorage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ThoughtFormValues {
  status?: string;
  body: string;
}

interface ThoughtFormProps {
  defaultValues?: ThoughtItem;
  onSubmit: (values: ThoughtFormValues) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ThoughtForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: ThoughtFormProps) {
  const [status, setStatus] = useState(defaultValues?.status || "");
  const [body, setBody] = useState(defaultValues?.body || "");

  const handleSubmit = async (values: ThoughtFormValues) => {
    if (!values.body.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Body is required",
        message: "Please write your thought before saving",
      });
      return;
    }

    try {
      await showToast({
        style: Toast.Style.Animated,
        title: defaultValues ? "Updating thought..." : "Adding thought...",
      });

      // Only include status if it's not empty
      const submissionValues = {
        id: defaultValues?.id || uuidv4(),
        body: values.body,
        ...(values.status?.trim() ? { status: values.status } : {}),
      };

      await onSubmit(submissionValues);

      // Clear form fields after successful submission
      setStatus("");
      setBody("");

      // Show success toast instead of HUD
      await showToast({
        style: Toast.Style.Success,
        title: defaultValues ? "Thought updated" : "Thought added",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to save thought",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Thought" onSubmit={handleSubmit} />
          {onCancel && <Action title="Cancel" onAction={onCancel} />}
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="body"
        title="Thought"
        placeholder="Write your thought here"
        value={body}
        onChange={setBody}
      />
      <Form.TextField
        id="status"
        title="Status"
        value={status}
        onChange={setStatus}
      />
    </Form>
  );
}
