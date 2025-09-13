"use client";

import * as React from "react";
import { useThemeSettings } from "../../../web/src/theme/AppThemeProvider";
import {
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";

export const ThemeControls: React.FC = () => {
  const {
    mode,
    setMode,
    direction,
    setDirection,
    highContrast,
    setHighContrast,
  } = useThemeSettings();
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_, v) => v && setMode(v)}
      >
        <ToggleButton value="light" aria-label="light">
          <LightModeIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="system" aria-label="system">
          <AutoModeIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark">
          <DarkModeIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={direction}
        onChange={(_, v) => v && setDirection(v)}
      >
        <ToggleButton value="ltr" aria-label="ltr">
          <FormatTextdirectionLToRIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="rtl" aria-label="rtl">
          <FormatTextdirectionRToLIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <FormControlLabel
        control={
          <Switch
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
          />
        }
        label="High contrast"
      />
    </Stack>
  );
};
