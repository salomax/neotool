"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const MAP: Record<string, string> = {
  "": "routes.home",
  "dashboard": "routes.dashboard",
  "profile": "routes.profile",
  "examples": "routes.examples",
  "forms": "routes.forms",
  "customer": "routes.customerForm",
};

export default function PageHeader({ title }: { title?: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { t } = useTranslation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const key = MAP[seg] || `routes.${seg}`;
    const label = t(key);
    const isLast = idx === segments.length - 1;
    return { seg, href, label, isLast };
  });

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumbs" data-testid="appshell-breadcrumbs">
        <Link href="/" data-testid="breadcrumb-item" data-current={segments.length === 0 ? "true" : "false"} data-seg="home">
          {t(MAP[""])}
        </Link>
        {crumbs.map((c) =>
          c.isLast ? (
            <Typography key={c.href} data-testid="breadcrumb-item" data-current="true" data-seg={c.seg}>
              {c.label}
            </Typography>
          ) : (
            <Link key={c.href} href={c.href} data-testid="breadcrumb-item" data-current="false" data-seg={c.seg}>
              {c.label}
            </Link>
          )
        )}
      </Breadcrumbs>
      {title ? <Box sx={{ mt: 1 }}>{title}</Box> : null}
    </Box>
  );
}
