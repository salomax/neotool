"use client";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function SentryInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: 1.0,
      });
    }
  }, []);
  return null;
}
