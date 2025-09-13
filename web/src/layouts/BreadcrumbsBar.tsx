"use client";
import { Breadcrumbs, Link as MLink, Typography, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadcrumbsBar() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return null;

  const crumbs = parts.map((p, i) => {
    const href = "/" + parts.slice(0, i + 1).join("/");
    const label = p.charAt(0).toUpperCase() + p.slice(1);
    const isLast = i === parts.length - 1;
    return isLast ? (
      <Typography key={href} color="text.primary">{label}</Typography>
    ) : (
      <MLink key={href} component={Link} href={href} underline="hover">
        {label}
      </MLink>
    );
  });

  return (
    <Box sx={{ mt: 0.5 }}>
      <Breadcrumbs aria-label="breadcrumb">{crumbs}</Breadcrumbs>
    </Box>
  );
}
