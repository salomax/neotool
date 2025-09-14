export { metadata } from "@/shared/seo/metadata";
import * as React from "react";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
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
        <ErrorBoundary>
        <ClientProviders>{children}</ClientProviders>
      </ErrorBoundary>
      </body>
    </html>
  );
}
