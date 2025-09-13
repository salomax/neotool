import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { NumberField } from './NumberField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const meta: Meta = {
  title: 'Forms/Fields/NumberField',
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { amount: 10 } });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 360 }}>
            <NumberField name="amount" label="Amount" min={0} step={1} />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};
