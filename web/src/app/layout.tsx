export { metadata } from "@/shared/seo/metadata";
import * as React from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import ClientProviders from "@/components/ClientProviders";

// Lazy load AppShell to reduce initial bundle size
const AppShell = dynamic(() => import("@/shared/ui/shell/AppShell").then(mod => ({ default: mod.AppShell })), {
  ssr: false,
  loading: () => {
    const { LoadingSpinner } = require("@/components/LoadingSpinner");
    return <LoadingSpinner message="Loading application..." />;
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ClientProviders>
            <AppShell>{children}</AppShell>
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
