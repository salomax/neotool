import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { PercentField } from "./PercentField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const meta: Meta = {
  title: "Forms/Fields/PercentField",
};
export default meta;
type Story = StoryObj;

function PercentFieldDefaultDemo() {
  const methods = useForm({ defaultValues: { discount: 15 } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <PercentField name="discount" label="Discount" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

function PercentFieldRatioModeDemo() {
  const methods = useForm({ defaultValues: { ratio: 0.25 } });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((d) =>
          alert(JSON.stringify(d, null, 2)),
        )}
      >
        <Stack spacing={2} sx={{ width: 360 }}>
          <PercentField name="ratio" label="Ratio" ratio />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <PercentFieldDefaultDemo />,
};

export const RatioMode: Story = {
  render: () => <PercentFieldRatioModeDemo />,
};
