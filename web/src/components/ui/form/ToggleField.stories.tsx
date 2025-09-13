import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { ToggleField } from "./ToggleField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const meta: Meta = {
  title: "Forms/Fields/ToggleField",
};
export default meta;
type Story = StoryObj;

function ToggleFieldDemo() {
  const methods = useForm({ defaultValues: { enabled: true } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <ToggleField name="enabled" label="Enabled" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <ToggleFieldDemo />,
};
