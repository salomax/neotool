import React from "react";
import {
  useForm,
  FormProvider,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

type HarnessProps<T> = {
  defaultValues?: UseFormProps<T>["defaultValues"];
  children: (methods: UseFormReturn<T>) => React.ReactNode;
};

// Componente de teste para permitir uso de useForm em testes sem violar regras de hooks
export function HookFormHarness<T = any>({
  defaultValues,
  children,
}: HarnessProps<T>) {
  const methods = useForm<T>({ defaultValues });
  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
}
