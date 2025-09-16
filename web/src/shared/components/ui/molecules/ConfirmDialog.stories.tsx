import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./ConfirmDialog";
import Button from "@mui/material/Button";
import { useState } from "react";

const meta: Meta = { title: "Feedback/ConfirmDialog" };
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => <Demo />,
};

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Delete item…
      </Button>
      <ConfirmDialog
        open={open}
        title="Delete item"
        description="This action cannot be undone."
        tone="danger"
        confirmText="Delete"
        onConfirm={() => {
          alert("Deleted");
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
