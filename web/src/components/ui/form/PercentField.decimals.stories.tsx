import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { PercentField } from './PercentField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';

const meta: Meta = {
  title: 'Forms/Fields/PercentField.Decimals',
};
export default meta;
type Story = StoryObj;

function Demo({ fractionDigits, label }: { fractionDigits: number; label: string }) {
  const methods = useForm({ defaultValues: { pct: 12.34 } });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))}>
        <Stack spacing={2} sx={{ width: 360 }}>
          <Typography variant="overline">{label}</Typography>
          <PercentField name="pct" label="Percent" fractionDigits={fractionDigits} />
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const NoDecimals: Story = { render: () => <Demo fractionDigits={0} label="0 decimals" /> };
export const OneDecimal: Story = { render: () => <Demo fractionDigits={1} label="1 decimal" /> };
export const TwoDecimals: Story = { render: () => <Demo fractionDigits={2} label="2 decimals" /> };
