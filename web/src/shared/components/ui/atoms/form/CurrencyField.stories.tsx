import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { CurrencyField } from "./CurrencyField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const meta: Meta = {
  title: "Forms/Fields/CurrencyField",
};
export default meta;
type Story = StoryObj;

function CurrencyFieldWithSelectorDemo() {
  const methods = useForm({ defaultValues: { price: 99.9 } });
  const onCurrencyChange = (c: string) => console.log("currency:", c);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <CurrencyField
            name="price"
            label="Price"
            currency="USD"
            currencyChoices={["USD", "EUR", "BRL"]}
            locale="en-US"
            onCurrencyChange={onCurrencyChange}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

function CurrencyFieldBRLLocaleDemo() {
  const methods = useForm({ defaultValues: { price: 1234.5 } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <CurrencyField
            name="price"
            label="Preço"
            currency="BRL"
            locale="pt-BR"
            currencyChoices={["BRL", "USD", "EUR"]}
          />
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const WithSelector: Story = {
  render: () => <CurrencyFieldWithSelectorDemo />,
};

export const BRLLocale: Story = {
  render: () => <CurrencyFieldBRLLocaleDemo />,
};
