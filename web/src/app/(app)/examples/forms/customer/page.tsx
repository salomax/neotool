"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormLayout,
  FormSection,
  FormActions,
  FormErrorBanner,
  FormRow,
  ControlledTextField,
  ControlledDatePicker,
  ControllerCurrencyField,
  ControllerPercentField,
  ControlledSelect,
  ControllerCPFField,
  ControllerCNPJField,
  ControllerCEPField,
  ControllerPhoneBRField,
  zodBR,
} from "@/components/form";
import { Paper } from "@mui/material";

type Data = {
  name: string;
  email: string;
  birthDate: Date | null;
  income: number | null;
  discount: number | null;
  docType: "CPF" | "CNPJ";
  doc: string;
  cep: string;
  phone: string;
};

const Schema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    birthDate: z.date().nullable(),
    income: z.number().min(0).nullable(),
    discount: z.number().min(0).max(1).nullable(),
    docType: z.enum(["CPF", "CNPJ"]),
    doc: z.string().min(11),
    cep: zodBR.cepSchema,
    phone: z.string().min(10),
  })
  .superRefine((val, ctx) => {
    if (val.docType === "CPF" && !zodBR.cpfSchema.safeParse(val.doc).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid CPF",
        path: ["doc"],
      });
    }
    if (
      val.docType === "CNPJ" &&
      !zodBR.cnpjSchema.safeParse(val.doc).success
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid CNPJ",
        path: ["doc"],
      });
    }
  });

export default function CustomerFormPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Data>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      birthDate: null,
      income: 5000,
      discount: 0.15,
      docType: "CPF",
      doc: "",
      cep: "",
      phone: "",
    },
  });

  const docType = watch("docType");

  const onSubmit = async (data: Data) => {
    await new Promise((r) => setTimeout(r, 300));
    alert("Submitted (mock):\\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 16 }}>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormLayout>
            <FormErrorBanner
              message={
                Object.keys(errors).length
                  ? "Please fix the highlighted fields."
                  : undefined
              }
            />

            <FormSection title="Basic">
              <FormRow cols={{ xs: 1, sm: 2, md: 3 }}>
                <ControlledTextField
                  control={control}
                  name="name"
                  label="Name"
                />
                <ControlledTextField
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                />
                <ControlledDatePicker
                  control={control}
                  name="birthDate"
                  label="Birth date"
                />
              </FormRow>
              <FormRow cols={{ xs: 1, sm: 2 }}>
                <ControllerCurrencyField
                  control={control}
                  name="income"
                  label="Income"
                />
                <ControllerPercentField
                  control={control}
                  name="discount"
                  label="Discount"
                />
              </FormRow>
            </FormSection>

            <FormSection title="Documents">
              <FormRow cols={{ xs: 1, sm: 3 }}>
                <ControlledSelect
                  control={control}
                  name="docType"
                  label="Document type"
                  options={[
                    { label: "CPF", value: "CPF" },
                    { label: "CNPJ", value: "CNPJ" },
                  ]}
                />
                {docType === "CPF" ? (
                  <ControllerCPFField
                    control={control}
                    name="doc"
                    label="CPF"
                  />
                ) : (
                  <ControllerCNPJField
                    control={control}
                    name="doc"
                    label="CNPJ"
                  />
                )}
                <ControllerCEPField control={control} name="cep" label="CEP" />
              </FormRow>
              <FormRow cols={{ xs: 1, sm: 2 }}>
                <ControllerPhoneBRField
                  control={control}
                  name="phone"
                  label="Phone (BR)"
                />
              </FormRow>
            </FormSection>

            <FormActions submitting={isSubmitting} />
          </FormLayout>
        </form>
      </Paper>
    </div>
  );
}
