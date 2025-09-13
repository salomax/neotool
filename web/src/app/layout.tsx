import { I18nProvider } from "@/i18n/config";
import * as React from "react";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
