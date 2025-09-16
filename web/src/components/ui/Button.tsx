"use client";
import React from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";

export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends Omit<MUIButtonProps, "size"> {
  size?: ButtonSize;
}

const sizeMap: Record<ButtonSize, MUIButtonProps["size"]> = {
  sm: "small",
  md: "medium",
  lg: "large",
};
export const Button: React.FC<ButtonProps> = ({ size = "md", ...rest }) => {
  const muiSize = sizeMap[size] ?? "medium";
  return <MUIButton size={muiSize} {...rest} />;
};
export default Button;
