import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import Button from "../components/ui/Button";
import { PasswordField } from "../components/ui/form/PasswordField";
import { NumberField } from "../components/ui/form/NumberField";
import { CurrencyField } from "../components/ui/form/CurrencyField";
import { PercentField } from "../components/ui/form/PercentField";
import { CheckboxField } from "../components/ui/form/CheckboxField";
import { RadioGroupField } from "../components/ui/form/RadioGroupField";
import { ToggleField } from "../components/ui/form/ToggleField";

const meta: Meta = {
  title: "Forms/Fields",
};
export default meta;
type Story = StoryObj;

const schema = z.object({
  password: z.string().min(6, "At least 6 characters"),
  amount: z.number().min(0),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  agreed: z.boolean().refine((v) => v, "You must agree"),
  role: z.enum(["admin", "member"]),
  enabled: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export const All: Story = {
  render: () => <Demo />,
};

const Demo: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      amount: 10,
      price: 99.9,
      discount: 15,
      agreed: false,
      role: "member",
      enabled: true,
    },
  });

  const onSubmit = (data: FormData) => alert(JSON.stringify(data, null, 2));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <PasswordField name="password" label="Password" />

          <NumberField name="amount" label="Amount" min={0} step={1} />

          <CurrencyField
            name="price"
            label="Price"
            currency="USD"
            currencyChoices={["USD", "EUR", "BRL"]}
            locale="en-US"
          />

          <PercentField name="discount" label="Discount" />

          <CheckboxField name="agreed" label="I agree to the terms" />

          <RadioGroupField
            name="role"
            label="Role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" },
            ]}
          />

          <ToggleField name="enabled" label="Enabled" />

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
