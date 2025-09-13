import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { RadioGroupField } from "./RadioGroupField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const meta: Meta = {
  title: "Forms/Fields/RadioGroupField",
};
export default meta;
type Story = StoryObj;

function RadioGroupFieldDemo() {
  const methods = useForm({ defaultValues: { role: "member" } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 420 }}>
          <RadioGroupField
            name="role"
            label="Role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "Member", value: "member" },
            ]}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <RadioGroupFieldDemo />,
};
