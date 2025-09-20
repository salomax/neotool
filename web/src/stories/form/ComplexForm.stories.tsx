import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { useAutoSave } from "@/shared/hooks/useAutoSave";
import { FormErrorBanner, FormRow } from "@/shared/components/ui/forms/components";
import { MaskedField } from "@/shared/components/ui/molecules/MaskedField";
import { FileUploader } from "@/shared/components/ui/molecules/FileUploader";
import { AsyncAutocomplete } from "@/shared/components/ui/molecules/AsyncAutocomplete";
import { AppThemeProvider } from "@/styles/themes/AppThemeProvider";

const meta: Meta = { title: "Forms/ComplexForm" };
export default meta;
type Story = StoryObj;

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(14, "Enter full phone"),
  country: z.object({ code: z.string(), label: z.string() }).nullable(),
  bio: z.string().max(200, "Max 200 chars").optional().or(z.literal("")),
  attachments: z.array(z.any()).max(5, "Up to 5 files").optional(),
});

type FormData = z.infer<typeof schema>;

const COUNTRIES = [
  { code: "BR", label: "Brazil" },
  { code: "US", label: "United States" },
  { code: "DE", label: "Germany" },
  { code: "ES", label: "Spain" },
  { code: "FR", label: "France" },
  { code: "PT", label: "Portugal" },
  { code: "JP", label: "Japan" },
  { code: "CN", label: "China" },
  { code: "IN", label: "India" },
];

async function fetchCountries(q: string) {
  const ql = q.toLowerCase();
  await new Promise((r) => setTimeout(r, 250));
  return COUNTRIES.filter(
    (c) =>
      c.label.toLowerCase().includes(ql) || c.code.toLowerCase().includes(ql),
  ).slice(0, 10);
}

function ComplexFormDemo() {
  const form = useZodForm(schema, {
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: null,
      bio: "",
      attachments: [],
    } as FormData,
    mode: "onChange",
  });

  const values = form.watch();
  const { isSaving } = useAutoSave(
    values,
    async (_v) => {
      await new Promise((r) => setTimeout(r, 300));
    },
      1200,
    );

    const onSubmit = form.handleSubmit((data) => {
      alert("Submit: " + JSON.stringify(data, null, 2));
    });

    return (
      <AppThemeProvider>
        <FormProvider {...form}>
          <Stack spacing={2} sx={{ maxWidth: 900 }}>
            <Typography variant="h6">User Profile</Typography>
            <Typography variant="body2" color="text.secondary">
              {isSaving ? "Saving draft…" : "Autosave enabled"}
            </Typography>

            {Object.keys(form.formState.errors).length > 0 && (
              <FormErrorBanner message="Please fix the highlighted fields." />
            )}

            <Grid container spacing={2}>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <TextField
                  label="Name"
                  fullWidth
                  {...form.register("name")}
                  error={!!form.formState.errors.name}
                  helperText={form.formState.errors.name?.message}
                />
              </FormRow>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email"
                  fullWidth
                  {...form.register("email")}
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                />
              </FormRow>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <MaskedField
                  name="phone"
                  label="Phone"
                  mask="(99) 99999-9999"
                />
              </FormRow>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <AsyncAutocomplete
                  name="country"
                  label="Country"
                  fetchOptions={fetchCountries}
                  getOptionLabel={(o) => o.label}
                  isOptionEqualToValue={(a, b) => a.code === b.code}
                />
              </FormRow>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">About</Typography>
              <TextField
                label="Bio"
                fullWidth
                multiline
                minRows={3}
                {...form.register("bio")}
                error={!!form.formState.errors.bio}
                helperText={form.formState.errors.bio?.message}
              />
              <Box sx={{ mt: 2 }}>
                <FileUploader
                  name="attachments"
                  label="Attachments"
                  accept="image/*,.pdf"
                  multiple
                  maxFiles={5}
                  maxSizeMb={5}
                />
              </Box>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={isSaving}
              >
                Submit
              </Button>
              <Button variant="outlined" onClick={() => form.reset()}>
                Reset
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </AppThemeProvider>
    );
}

export const Playground: Story = {
  render: () => <ComplexFormDemo />,
};
