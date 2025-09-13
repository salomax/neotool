import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, ErrorState } from '../emptystate/EmptyErrorState';
import { Stack } from '@mui/material';

const meta: Meta = { title: 'UI/States/Empty & Error' };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Stack spacing={2}>
      <EmptyState title="No results" description="Try adjusting your filters." actionText="Reset filters" onAction={() => alert('Reset')} />
      <ErrorState description="Could not load data." onRetry={() => alert('Retry')} />
    </Stack>
  ),
};
