'use client';
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

export interface RHFFormProps<T> { defaultValues?: Partial<T>; onSubmit: SubmitHandler<T>; children: React.ReactNode; }
export function RHFForm<T>({ defaultValues, onSubmit, children }: RHFFormProps<T>) {
  const methods = useForm<T>({ defaultValues: defaultValues as T });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
