"use client";
import React, { ReactNode } from "react";
// import { ThemeRegistry } from "../theme/ThemeRegistry";
// import { SentryInit } from "../sentry";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <SentryInit /> */}
      {/* <ThemeRegistry>{children}</ThemeRegistry> */}
      {children}
    </>
  );
}
