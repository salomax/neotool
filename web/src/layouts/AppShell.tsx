// web/src/layouts/AppShell.tsx
'use client';

import * as React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText,
  IconButton, Divider, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeToggle } from '../theme/ThemeToggle';

export interface AppShellProps {
  title?: string;
  navItems?: Array<{ label: string; href?: string }>;
  children?: React.ReactNode;
}

const drawerWidth = 240;

export const AppShell: React.FC<AppShellProps> = ({ title = 'App', navItems = [], children }) => {
  const [open, setOpen] = React.useState(false);

  const drawer = (
    <Box role="navigation" sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, idx) => (
          <ListItemButton component="a" href={item.href ?? '#'} key={idx}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar>
          <IconButton size="small" edge="start" onClick={() => setOpen(true)} aria-label="open navigation">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            {title}
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar /> {/* spacer for fixed AppBar */}
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
