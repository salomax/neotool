// web/src/stories/Form.Wizard.CustomerOnboarding.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
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
  ControlledAutocomplete,
  ControllerCPFField,
  ControllerCNPJField,
  ControllerCEPField,
  ControllerPhoneBRField,
  useFormPersist,
  zodBR,
} from "../components/form";
import { Stepper, Step, StepLabel, Stack, Button } from "@mui/material";

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

const meta: Meta = { title: "Forms/Wizard — Customer Onboarding" };
export default meta;
type Story = StoryObj;

function WizardDemo() {
  const methods = useForm<Data>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      birthDate: null,
      income: 5000,
      discount: 0.1,
      docType: "CPF",
      doc: "",
      cep: "",
      phone: "",
      cityId: null,
    },
    mode: "onTouched",
  });
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  // Persist draft
  useFormPersist<Data>("wizard-customer-draft", watch, setValue);

  const [step, setStep] = React.useState(0);
    const steps = ["Basic", "Financial", "Docs", "Address", "Review"];

    const goNext = async () => {
      const fieldsByStep = [
        ["name", "email", "birthDate"],
        ["income", "discount"],
        ["docType", "doc", "cep", "phone"],
        ["cityId"],
        [],
      ][step] as (keyof Data)[];
      const ok = await trigger(fieldsByStep as any, { shouldFocus: true });
      if (!ok) return;
      setStep((s) => Math.min(s + 1, steps.length - 1));
    };
    const goBack = () => setStep((s) => Math.max(s - 1, 0));

    const docType = watch("docType");

    const loadCities = async (input: string) => {
      await new Promise((r) => setTimeout(r, 150));
      const CITIES = [
        "São Paulo",
        "Rio de Janeiro",
        "Belo Horizonte",
        "Curitiba",
        "Porto Alegre",
        "Salvador",
        "Recife",
        "Florianópolis",
        "Manaus",
        "São Luís",
        "Belém",
        "Fortaleza",
        "Brasília",
        "Goiânia",
        "Boa Vista",
        "Maceió",
        "Maringá",
        "Vitória",
        "Natal",
        "João Pessoa",
        "Campinas",
        "Santos",
        "Ribeirão Preto",
      ];
      return CITIES.filter((l) => l.toLowerCase().includes(input.toLowerCase()))
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map((l, idx) => ({ id: 1000 + idx, label: l }));
    };

    const onSubmit = async (data: Data) => {
      await new Promise((r) => setTimeout(r, 400));
      alert("Submitted!\\n" + JSON.stringify(data, null, 2));
      // clear draft
      try {
        localStorage.removeItem("wizard-customer-draft");
      } catch {
        // Ignore localStorage errors
      }
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormLayout>
            <Stepper activeStep={step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <FormSection>
              {step === 0 && (
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
              )}

              {step === 1 && (
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
              )}

              {step === 2 && (
                <>
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
                    <ControllerCEPField
                      control={control}
                      name="cep"
                      label="CEP"
                    />
                  </FormRow>
                  <FormRow cols={{ xs: 1, sm: 2 }}>
                    <ControllerPhoneBRField
                      control={control}
                      name="phone"
                      label="Phone"
                    />
                  </FormRow>
                </>
              )}

              {step === 3 && (
                <FormRow cols={{ xs: 1 }}>
                  <ControlledAutocomplete
                    control={control}
                    name="cityId"
                    label="City"
                    placeholder="Type a city…"
                    loadOptions={loadCities}
                  />
                </FormRow>
              )}

              {step === 4 && (
                <pre
                  style={{
                    padding: 12,
                    border: "1px solid #eee",
                    borderRadius: 8,
                    background: "rgba(0,0,0,0.02)",
                  }}
                >
                  {JSON.stringify(
                    {
                      name: watch("name"),
                      email: watch("email"),
                      birthDate: watch("birthDate"),
                      income: watch("income"),
                      discount: watch("discount"),
                      docType: watch("docType"),
                      doc: watch("doc"),
                      cep: watch("cep"),
                      phone: watch("phone"),
                      cityId: watch("cityId"),
                    },
                    null,
                    2,
                  )}
                </pre>
              )}
            </FormSection>

            {Object.keys(errors).length > 0 && (
              <FormErrorBanner message="Please fix the highlighted fields." />
            )}

            <Stack direction="row" spacing={1} justifyContent="space-between">
              <div>
                <Button onClick={goBack} disabled={step === 0}>
                  Back
                </Button>
              </div>
              <div>
                {step < steps.length - 1 ? (
                  <Button variant="contained" onClick={goNext}>
                    Next
                  </Button>
                ) : (
                  <FormActions submitting={isSubmitting} submitLabel="Finish" />
                )}
              </div>
            </Stack>
          </FormLayout>
        </form>
      </FormProvider>
    );
}

export const Wizard: Story = {
  render: () => <WizardDemo />,
};
