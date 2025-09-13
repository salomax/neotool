"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

export interface CheckboxFieldProps {
  name: string;
  label: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!field.value}
              onChange={(e, v) => field.onChange(v)}
            />
          }
          label={label}
        />
      )}
    />
  );
};
