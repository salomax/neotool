"use client";

import * as React from "react";
import AppShell from "@/layouts/AppShell";
export default function AppShellClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
