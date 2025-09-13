import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { DatePickerField, DateRangeField } from './DatePickers';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const meta: Meta = { title: 'Forms/Fields/DatePickers' };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const methods = useForm({ defaultValues: { date: null, start: null, end: null } });
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
            <Stack spacing={2} sx={{ width: 480 }}>
              <Typography variant="overline">Single</Typography>
              <DatePickerField name="date" label="Date" />
              <Typography variant="overline">Range</Typography>
              <DateRangeField nameStart="start" nameEnd="end" />
              <Button type="submit" variant="contained">Submit</Button>
            </Stack>
          </form>
        </FormProvider>
      </LocalizationProvider>
    );
  },
};
