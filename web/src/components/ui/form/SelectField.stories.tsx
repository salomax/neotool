import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectField } from './SelectField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const meta: Meta = { title: 'Forms/Fields/SelectField' };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { role: 'viewer' } });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 360 }}>
            <SelectField
              name="role"
              label="Role"
              options={[
                { label: 'Admin', value: 'admin' },
                { label: 'Manager', value: 'manager' },
                { label: 'Viewer', value: 'viewer' },
              ]}
            />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};
