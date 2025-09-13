"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export interface SelectOption {
  label: string;
  value: string | number;
}
export interface SelectProps {
  id?: string;
  label?: string;
  value?: string | number;
  options: SelectOption[];
  onChange?: (_value: string | number) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
}) => {
  const handleChange = (e: SelectChangeEvent) =>
    onChange?.(e.target.value as any);
  const labelId = id ? `${id}-label` : undefined;
  return (
    <FormControl fullWidth disabled={disabled}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MUISelect
        labelId={labelId}
        id={id}
        value={value ?? ""}
        label={label}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <MenuItem key={String(opt.value)} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
export default Select;
