import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Stack } from "@mui/material";
import { ToastProvider, useToast } from "@/shared/components/ui/molecules/ToastProvider";
import { AppThemeProvider } from "@/styles/themes/AppThemeProvider";

const meta: Meta = {
  title: "Feedback/Toast",
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </AppThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj;

function Demo() {
  const toast = useToast();
  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={() => toast.success("Saved successfully!")}>
        Success
      </Button>
      <Button onClick={() => toast.info("Heads up, something to note.")}>
        Info
      </Button>
      <Button onClick={() => toast.warning("Be careful with this action.")}>
        Warning
      </Button>
      <Button onClick={() => toast.error("Oops, that failed.")}>Error</Button>
    </Stack>
  );
}

export const Playground: Story = { render: () => <Demo /> };
