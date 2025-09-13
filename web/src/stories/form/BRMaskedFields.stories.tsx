import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useZodForm } from "../../hooks/useZodForm";
import { AppThemeProvider } from "../../theme/AppThemeProvider";
import { CPFField } from "../../components/inputs/br/CPFField";
import { CNPJField } from "../../components/inputs/br/CNPJField";
import { CEPField } from "../../components/inputs/br/CEPField";
import { zCPF, zCNPJ, zCEP } from "../../lib/br/validators";
import { FormErrorBanner, FormRow } from "../../components/form";

const meta: Meta = { title: "Forms/BR Masks & Validators" };
export default meta;
type Story = StoryObj;

const schema = z.object({
  cpf: zCPF,
  cnpj: zCNPJ,
  cep: zCEP,
});

type FormData = z.infer<typeof schema>;

export const Playground: Story = {
  render: () => {
    const form = useZodForm(schema, {
      defaultValues: { cpf: "", cnpj: "", cep: "" } as unknown as FormData,
      mode: "onChange",
    });

    const onSubmit = form.handleSubmit((data) => {
      alert("Submit: " + JSON.stringify(data, null, 2));
    });

    return (
      <AppThemeProvider>
        <FormProvider {...form}>
          <Stack spacing={2} sx={{ maxWidth: 640 }}>
            <Typography variant="h6">Máscaras BR com validação Zod</Typography>
            <FormErrorBanner errors={form.formState.errors} />

            <Grid container spacing={2}>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <CPFField name="cpf" label="CPF" />
              </FormRow>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <CNPJField name="cnpj" label="CNPJ" />
              </FormRow>
              <FormRow cols={{ xs: 12, md: 6 }}>
                <CEPField name="cep" label="CEP" />
              </FormRow>
            </Grid>

            <Box>
              <Button variant="contained" onClick={onSubmit}>
                Enviar
              </Button>
              <Button
                sx={{ ml: 1 }}
                variant="outlined"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </AppThemeProvider>
    );
  },
};
