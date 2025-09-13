import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { PercentField } from "./PercentField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";

const meta: Meta = { title: "Forms/Fields/PercentField.Locale" };
export default meta;
type Story = StoryObj;

function Demo({ locale, label }: { locale: string; label: string }) {
  const methods = useForm({ defaultValues: { pct: 12.34 } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <Typography variant="overline">{label}</Typography>
          <PercentField
            name="pct"
            label="Percent"
            fractionDigits={2}
            locale={locale}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const EN_US: Story = {
  render: () => <Demo locale="en-US" label="en-US: dot as decimal" />,
};
export const PT_BR: Story = {
  render: () => <Demo locale="pt-BR" label="pt-BR: comma as decimal" />,
};
