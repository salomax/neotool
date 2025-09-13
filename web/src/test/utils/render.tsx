import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import "@/i18n/config";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AppThemeProvider>{children}</AppThemeProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
export { screen } from "@testing-library/react";
