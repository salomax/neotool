import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Atoms/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  args: { title: "Helpful tooltip" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <span style={{ borderBottom: "1px dotted", cursor: "help" }}>
        Hover me
      </span>
    </Tooltip>
  ),
};
