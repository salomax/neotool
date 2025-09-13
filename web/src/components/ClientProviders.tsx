"use client";

import React from "react";
import { AppThemeProvider } from "../theme/AppThemeProvider";
import { AppQueryProvider } from "../query/AppQueryProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppThemeProvider>
      <AppQueryProvider>{children}</AppQueryProvider>
    </AppThemeProvider>
  );
}
