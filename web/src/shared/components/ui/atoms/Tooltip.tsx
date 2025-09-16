"use client";

import * as React from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";

export type TooltipProps = MuiTooltipProps;

export const Tooltip: React.FC<TooltipProps> = (props) => (
  <MuiTooltip enterDelay={400} arrow {...props} />
);

export default Tooltip;
