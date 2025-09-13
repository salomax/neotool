import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI/Atoms/Link",
  component: Link,
  args: {
    href: "#",
    children: "A simple link",
    external: false,
    showIcon: false,
  },
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Internal: Story = {};

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "External link",
    external: true,
    showIcon: true,
  },
};

export const WithIconButInternal: Story = {
  args: {
    href: "#",
    children: "Internal with icon",
    external: false,
    showIcon: true,
  },
};
