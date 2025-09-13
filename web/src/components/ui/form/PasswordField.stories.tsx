import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordField } from './PasswordField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const meta: Meta = {
  title: 'Forms/Fields/PasswordField',
};
export default meta;
type Story = StoryObj;

const schema = z.object({ password: z.string().min(6, 'At least 6 characters') });
type FormData = z.infer<typeof schema>;

export const Default: Story = {
  render: () => {
    const methods = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { password: '' },
    });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 360 }}>
            <PasswordField name="password" label="Password" />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};
