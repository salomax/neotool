'use client';

import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField, Chip } from '@mui/material';

export interface AutocompleteFieldProps<T> {
  name: string;
  label?: string;
  options: T[];
  getOptionLabel: (opt: T) => string;
  multiple?: boolean;
  freeSolo?: boolean;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
}

export function AutocompleteField<T>({
  name, label, options, getOptionLabel, multiple, freeSolo, helperText, fullWidth = true,
}: AutocompleteFieldProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={getOptionLabel as any}
          value={field.value ?? (multiple ? [] : null)}
          onChange={(_, v) => field.onChange(v)}
          renderTags={(value: readonly T[], getTagProps) =>
            (value as readonly any[]).map((option: any, index: number) => (
              <Chip variant="outlined" label={getOptionLabel(option)} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? helperText}
              fullWidth={fullWidth}
            />
          )}
        />
      )}
    />
  );
}
