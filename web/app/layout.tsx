
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { ClientProviders } from "../src/components/ClientProviders";
// import "../src/i18n/client";

export const metadata: Metadata = {
  title: "Invistus",
  description: "Invistus web app"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
