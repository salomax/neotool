import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxField } from './CheckboxField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const meta: Meta = {
  title: 'Forms/Fields/CheckboxField',
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { agreed: true } });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 360 }}>
            <CheckboxField name="agreed" label="I agree to the terms" />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};
