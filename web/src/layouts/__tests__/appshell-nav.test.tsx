import React from "react";
import { render, screen } from "@testing-library/react";
import AppShellClient from "@/layouts/AppShell";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import "@/i18n/config";

// mocka a pathname
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("AppShell nav", () => {
  it("marca item ativo baseado no pathname (data-testid)", () => {
    render(
      <AppThemeProvider>
        <AppShellClient>
          <div>content</div>
        </AppShellClient>
      </AppThemeProvider>,
    );
    expect(screen.getByTestId("appshell-nav-dashboard")).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(screen.getByTestId("appshell-nav-profile")).toHaveAttribute(
      "data-active",
      "false",
    );
  });
});
