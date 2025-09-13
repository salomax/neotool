import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { AutocompleteField } from './AutocompleteField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const meta: Meta = { title: 'Forms/Fields/AutocompleteField' };
export default meta;
type Story = StoryObj;

const skills = ['React','TypeScript','Node','GraphQL','Design','Testing'];

export const Single: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { skill: 'React' } });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 420 }}>
            <AutocompleteField name="skill" label="Skill" options={skills} getOptionLabel={(x) => x} />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { skills: ['React'] } });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
          <Stack spacing={2} sx={{ width: 420 }}>
            <AutocompleteField name="skills" label="Skills" multiple options={skills} getOptionLabel={(x) => x} />
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
};
