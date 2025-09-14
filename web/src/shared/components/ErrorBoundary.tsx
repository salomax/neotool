"use client";

import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/nextjs";

function DefaultFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div role="alert" style={{ padding: 16 }}>
      <h2>Algo deu errado</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={DefaultFallback}
      onReset={() => {
        if (typeof window !== "undefined") window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
