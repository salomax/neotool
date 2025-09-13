import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Link from "../components/ui/Link";
import Tooltip from "../components/ui/Tooltip";
import { Stack } from "@mui/material";

const meta: Meta = {
  title: "UI/Atoms/Overview",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const All: Story = {
  render: () => (
    <Stack spacing={2} direction="column">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" src="https://i.pravatar.cc/40?img=1" />
      </Stack>

      <Stack direction="row" spacing={1}>
        <Badge label="Default" />
        <Badge color="success" label="Success" />
        <Badge color="warning" label="Warning" />
        <Badge color="error" label="Error" />
        <Badge color="info" label="Info" />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Link href="#">Internal link</Link>
        <Link href="https://example.com" external>
          External
        </Link>
      </Stack>

      <Tooltip title="Helpful tip">
        <span style={{ borderBottom: "1px dotted", cursor: "help" }}>
          Hover for tooltip
        </span>
      </Tooltip>
    </Stack>
  ),
};
