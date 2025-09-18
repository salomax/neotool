"use client";
import React from "react";
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
export type TextFieldProps = MUITextFieldProps;
export const TextField: React.FC<TextFieldProps> = (props) => (
  <MUITextField fullWidth {...props} />
);
export default TextField;
