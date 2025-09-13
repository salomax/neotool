import * as React from "react";
import ClientProviders from "@/components/ClientProviders";
import { SentryInit } from "@/sentry";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SentryInit />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
