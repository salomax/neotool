import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { Box, Button, Typography } from "@mui/material";

const meta: Meta<typeof AppShell> = {
  title: "Layouts/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  args: {
    title: "NeoTool",
    navItems: [
      { label: "Dashboard", href: "#" },
      { label: "Financial Institutions", href: "#" },
      { label: "Settings", href: "#" },
    ],
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>
          Hello Storybook
        </Typography>
        <Typography paragraph>
          Use this page as a playground for your shell layout.
        </Typography>
        <Button>Primary action</Button>
      </Box>
    ),
  },
};
