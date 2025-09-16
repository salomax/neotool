"use client";

import * as React from "react";
import { AppThemeProvider } from "@/styles/themes/AppThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
