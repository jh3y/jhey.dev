import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useState } from "react";

export interface DemoFormValues {
  title: string;
  url: string;
}

interface DemoFormProps {
  defaultValues?: DemoFormValues;
  onSubmit: (values: DemoFormValues) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function DemoForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: DemoFormProps) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [url, setUrl] = useState(defaultValues?.url || "");

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Both fields are required",
        message: "Please provide both a title and a URL.",
      });
      return;
    }
    await onSubmit({ title, url });
    setTitle("");
    setUrl("");
    await showToast({
      style: Toast.Style.Success,
      title: "Demo updated",
    });
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Demo" onSubmit={handleSubmit} />
          {onCancel && <Action title="Cancel" onAction={onCancel} />}
        </ActionPanel>
      }
    >
      <Form.TextField
        id="title"
        title="Title"
        value={title}
        onChange={setTitle}
      />
      <Form.TextField
        id="url"
        title="URL"
        value={url}
        onChange={setUrl}
      />
    </Form>
  );
} 