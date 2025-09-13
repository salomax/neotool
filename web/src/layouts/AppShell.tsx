"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

import { AppBar, Toolbar, Drawer, List, ListItemButton, ListItemText, Box } from "@mui/material";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { NAV, type NavItem } from "@/config/nav";

type Props = {
  children: React.ReactNode;
  navItems?: NavItem[];
};

const drawerWidth = 240;

export default function AppShellClient({ children, navItems = NAV }: Props) {
  const pathname = usePathname() || "/";
  const { t } = useTranslation();

  const isActive = (href: string) =>
    pathname === href || (pathname.startsWith(href) && (href === "/" || href.endsWith("/") || pathname[href.length] === "/"));

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        data-testid="appshell-header"
        color="primary"
        enableColorOnDark
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: 600 }}>NeoTool</Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              // 🔧 Força os botões do switcher a herdarem a cor do header
              color: "inherit",
              "& .MuiButton-root": {
                color: "inherit",
                borderColor: "currentColor",
              },
              "& .MuiButton-root:hover": {
                borderColor: "currentColor",
                opacity: 0.9,
              },
            }}
          >
            <LanguageSwitcher />
            <span data-testid="theme-toggle-btn"><ThemeToggle /></span>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        data-testid="appshell-nav"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <ListItemButton
                  key={item.id}
                  LinkComponent={Link}
                  href={item.href}
                  selected={active}
                  data-testid={`appshell-nav-${item.id}`}
                  data-active={active ? "true" : "false"}
                >
                  <ListItemText primary={t(item.i18nKey)} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
