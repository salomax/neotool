// web/src/components/form/fields/ControlledAsyncValidateField.tsx
'use client';

import * as React from 'react';
import { Controller, Control, UseFormSetError, UseFormClearErrors } from 'react-hook-form';
import { TextField, TextFieldProps, InputAdornment, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useDebouncedFieldValidator } from '../helpers/useDebouncedFieldValidator';

export type ControlledAsyncValidateFieldProps = Omit<TextFieldProps, 'name' | 'defaultValue' | 'onChange' | 'value' | 'render'> & {
  control: Control<any>;
  name: string;
  /** Função assíncrona: retorna true se válido, ou mensagem de erro */
  asyncValidate: (value: string) => Promise<true | string>;
  delay?: number;
};

export default function ControlledAsyncValidateField({
  control, name, asyncValidate, delay = 600, helperText, ...rest
}: ControlledAsyncValidateFieldProps) {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        useDebouncedFieldValidator(name as any, field.value, async (v) => {
          if (!v) return 'Required';
          setStatus('loading');
          const res = await asyncValidate(String(v));
          setStatus(res === true ? 'ok' : 'error');
          return res;
        }, formState.setError, formState.clearErrors, delay);

        const adornment = (
          <InputAdornment position="end">
            {status === 'loading' && <CircularProgress size={16} />}
            {status === 'ok' && <CheckCircleOutlineIcon color="success" fontSize="small" />}
            {status === 'error' && <ErrorOutlineIcon color="error" fontSize="small" />}
          </InputAdornment>
        );

        return (
          <TextField
            {...rest}
            {...field}
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message || helperText}
            InputProps={{ ...(rest.InputProps || {}), endAdornment: (<>{rest.InputProps?.endAdornment}{adornment}</>) }}
          />
        );
      }}
    />
  );
}
