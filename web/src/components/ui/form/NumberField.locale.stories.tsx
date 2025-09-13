import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { NumberField } from './NumberField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';

const meta: Meta = { title: 'Forms/Fields/NumberField.Locale' };
export default meta;
type Story = StoryObj;

function Demo({ locale, label }: { locale: string; label: string }) {
  const methods = useForm({ defaultValues: { amount: 1234.56 } });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
        <Stack spacing={2} sx={{ width: 360 }}>
          <Typography variant="overline">{label}</Typography>
          <NumberField name="amount" label="Amount" locale={locale} fractionDigits={2} />
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const EN_US: Story = { render: () => <Demo locale="en-US" label="en-US: dot as decimal" /> };
export const PT_BR: Story = { render: () => <Demo locale="pt-BR" label="pt-BR: comma as decimal" /> };
