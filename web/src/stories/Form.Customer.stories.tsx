// web/src/stories/Form.Customer.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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
  ControlledNumberField,
  ControllerCurrencyField,
  ControllerPercentField,
  ControlledDatePicker,
  ControlledSelect,
  ControlledAutocomplete,
  ControllerCPFField,
  ControllerCNPJField,
  ControllerCEPField,
  ControllerPhoneBRField,
  zodBR,
} from "../components/form";

type Customer = {
  name: string;
  email: string;
  birthDate: Date | null;
  income: number | null;
  discount: number | null; // 0..1
  docType: "CPF" | "CNPJ";
  doc: string; // armazenado sem máscara (apenas dígitos)
  cep: string; // idem
  phone: string; // idem
  cityId: number | null;
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
    cityId: z.number().nullable(),
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

// dataset com algumas cidades brasileiras
const CITIES = [
  { id: 3550308, label: "São Paulo" },
  { id: 3304557, label: "Rio de Janeiro" },
  { id: 3106200, label: "Belo Horizonte" },
  { id: 4106902, label: "Curitiba" },
  { id: 4314902, label: "Porto Alegre" },
  { id: 2927408, label: "Salvador" },
  { id: 2611606, label: "Recife" },
  { id: 4205407, label: "Florianópolis" },
  { id: 1302603, label: "Manaus" },
  { id: 2111300, label: "São Luís" },
  { id: 1501402, label: "Belém" },
  { id: 2304400, label: "Fortaleza" },
  { id: 5300108, label: "Brasília" },
  { id: 5208707, label: "Goiânia" },
  { id: 1400100, label: "Boa Vista" },
  { id: 2704302, label: "Maceió" },
  { id: 4106902, label: "Maringá" },
  { id: 3304904, label: "Volta Redonda" },
  { id: 3543402, label: "Osasco" },
  { id: 3549805, label: "Ribeirão Preto" },
  { id: 5002704, label: "Campo Grande" },
  { id: 4209102, label: "Joinville" },
  { id: 4314902, label: "Caxias do Sul" },
  { id: 3205309, label: "Vitória" },
];

const meta: Meta = { title: "Forms/Customer Form" };
export default meta;
type Story = StoryObj;

function FullCustomerFormDemo() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Customer>({
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
      cityId: null,
    },
  });

    const docType = watch("docType");

    const onSubmit = async (data: Customer) => {
      await new Promise((r) => setTimeout(r, 300));
      alert(JSON.stringify(data, null, 2));
    };

    // cidades aleatórias filtradas pelo input
    const loadCities = async (input: string) => {
      await new Promise((r) => setTimeout(r, 180));
      const filtered = CITIES.filter((o) =>
        o.label.toLowerCase().includes(input.toLowerCase()),
      );
      // embaralha e pega até 8 resultados
      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 8);
      return shuffled;
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormLayout>
          {Object.keys(errors).length > 0 && (
            <FormErrorBanner message="Please fix the highlighted fields." />
          )}

          <FormSection title="Basic info">
            <FormRow cols={{ xs: 1, sm: 2, md: 3 }}>
              <ControlledTextField control={control} name="name" label="Name" />
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
            <FormRow cols={{ xs: 1, sm: 2, md: 2 }}>
              <ControlledNumberField
                control={control}
                name="income"
                label="Income"
              />
              <ControllerCurrencyField
                control={control}
                name="income"
                label="Income (Currency)"
              />
            </FormRow>
            <FormRow cols={{ xs: 1, sm: 2, md: 2 }}>
              <ControllerPercentField
                control={control}
                name="discount"
                label="Discount"
              />
            </FormRow>
          </FormSection>

          <FormSection title="Documents & Contact">
            <FormRow cols={{ xs: 1, sm: 3, md: 3 }}>
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
                <ControllerCPFField control={control} name="doc" label="CPF" />
              ) : (
                <ControllerCNPJField
                  control={control}
                  name="doc"
                  label="CNPJ"
                />
              )}
              <ControllerCEPField control={control} name="cep" label="CEP" />
            </FormRow>
            <FormRow cols={{ xs: 1, sm: 2, md: 2 }}>
              <ControllerPhoneBRField
                control={control}
                name="phone"
                label="Phone (BR)"
              />
              <ControlledAutocomplete
                control={control}
                name="cityId"
                label="City"
                placeholder="Type a city…"
                loadOptions={loadCities}
              />
            </FormRow>
          </FormSection>

          <FormActions submitting={isSubmitting} />
        </FormLayout>
      </form>
    );
}

export const FullCustomerForm: Story = {
  render: () => <FullCustomerFormDemo />,
};
