import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  args: { children: "Click me" },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    variant: { control: "radio", options: ["contained", "outlined", "text"] },
    color: {
      control: "radio",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
        "inherit",
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { color: "primary" } };
export const Secondary: Story = { args: { color: "secondary" } };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
