import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { Button } from "@/shared/components/ui/atoms/Button";
import { FormTextField } from "@/shared/components/ui/atoms/form/FormField";

const meta: Meta<any> = { title: "Patterns/Form Example" };
export default meta;

const schema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Invalid email"),
});
type FormData = z.infer<typeof schema>;

const DemoForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });
  const onSubmit = (data: FormData) => {
    alert("Submitted: " + JSON.stringify(data, null, 2));
  };
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2}>
          <FormTextField name="name" label="Name" />
          <FormTextField name="email" label="Email" />
          <Button type="submit">Submit</Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export const Example: StoryObj = { render: () => <DemoForm /> };
