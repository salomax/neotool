
"use client";
import React, { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0066cc" },
    secondary: { main: "#00b894" }
  },
  shape: { borderRadius: 12 }
});

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
