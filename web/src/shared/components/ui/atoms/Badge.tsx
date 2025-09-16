"use client";

import * as React from "react";
import { Chip, ChipProps } from "@mui/material";

export type BadgeColor = "default" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends Omit<ChipProps, "color"> {
  color?: BadgeColor;
}

export const Badge: React.FC<BadgeProps> = ({ color = "default", ...rest }) => {
  const map: Record<BadgeColor, ChipProps["color"]> = {
    default: "default",
    success: "success",
    warning: "warning",
    error: "error",
    info: "info",
  };
  const chipColor = map[color] ?? "default";
  return <Chip size="small" color={chipColor} variant="outlined" {...rest} />;
};

export default Badge;
