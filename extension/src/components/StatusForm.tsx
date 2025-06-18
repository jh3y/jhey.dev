import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useState } from "react";

export interface StatusFormValues {
  location: string;
  status: string;
}

interface StatusFormProps {
  defaultValues?: StatusFormValues;
  onSubmit: (values: StatusFormValues) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function StatusForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: StatusFormProps) {
  const [location, setLocation] = useState(defaultValues?.location || "");
  const [status, setStatus] = useState(defaultValues?.status || "");

  const handleSubmit = async () => {
    if (!location.trim() || !status.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Both fields are required",
        message: "Please provide both a location and a status.",
      });
      return;
    }
    await onSubmit({ location, status });
    setLocation("");
    setStatus("");
    await showToast({
      style: Toast.Style.Success,
      title: "Status updated",
    });
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Status" onSubmit={handleSubmit} />
          {onCancel && <Action title="Cancel" onAction={onCancel} />}
        </ActionPanel>
      }
    >
      <Form.TextField
        id="location"
        title="Location"
        value={location}
        onChange={setLocation}
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