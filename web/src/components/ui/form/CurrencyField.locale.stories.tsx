import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { CurrencyField } from './CurrencyField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';

const meta: Meta = { title: 'Forms/Fields/CurrencyField.Locale' };
export default meta;
type Story = StoryObj;

function Demo({ locale, currency, label }: { locale: string; currency: string; label: string }) {
  const methods = useForm({ defaultValues: { price: 1234567.89 } });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
        <Stack spacing={2} sx={{ width: 420 }}>
          <Typography variant="overline">{label}</Typography>
          <CurrencyField name="price" label="Price" locale={locale} currency={currency} />
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const EN_US_USD: Story = { render: () => <Demo locale="en-US" currency="USD" label="en-US / USD: 1,234,567.89" /> };
export const PT_BR_BRL: Story = { render: () => <Demo locale="pt-BR" currency="BRL" label="pt-BR / BRL: 1.234.567,89" /> };
