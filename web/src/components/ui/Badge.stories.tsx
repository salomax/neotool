import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';
import { Stack } from '@mui/material';

const meta: Meta<typeof Badge> = {
  title: 'UI/Atoms/Badge',
  component: Badge,
  args: { label: 'Status' },
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Badge {...args} />
      <Badge {...args} color="success" label="Success" />
      <Badge {...args} color="warning" label="Warning" />
      <Badge {...args} color="error" label="Error" />
      <Badge {...args} color="info" label="Info" />
    </Stack>
  ),
};
