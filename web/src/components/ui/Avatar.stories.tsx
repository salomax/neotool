import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';
import { Stack } from '@mui/material';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Atoms/Avatar',
  component: Avatar,
  args: { name: 'Ada Lovelace' },
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=10',
    name: 'Alan Turing',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Avatar {...args} sx={{ width: 32, height: 32 }} />
      <Avatar {...args} sx={{ width: 48, height: 48 }} />
      <Avatar {...args} sx={{ width: 64, height: 64 }} />
    </Stack>
  ),
  args: { name: 'Grace Hopper' },
};
