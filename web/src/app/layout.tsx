export { metadata } from "@/shared/seo/metadata";
import * as React from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import Providers from "./providers";

// Lazy load AppShell to reduce initial bundle size
const AppShell = dynamic(() => import("@/shared/ui/shell/AppShell").then(mod => ({ default: mod.AppShell })), {
  ssr: false,
  loading: () => {
    const { LoadingSpinner } = require("@/shared/components/ui/atoms/LoadingSpinner");
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
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
