"use client";

import React from "react";
import {
  Drawer as MUIDrawer,
  DrawerProps as MUIDrawerProps,
  Box,
  IconButton,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CloseIcon, MenuIcon } from "../../../ui/mui-imports";

export interface DrawerProps extends Omit<MUIDrawerProps, 'open'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  variant?: 'temporary' | 'persistent' | 'permanent';
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  showCloseButton = true,
  showMenuButton = false,
  onMenuClick,
  variant = 'temporary',
  anchor = 'left',
  width = 280,
  height = '100%',
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-adjust variant for mobile
  const drawerVariant = isMobile ? 'temporary' : variant;

  const drawerSx = {
    '& .MuiDrawer-paper': {
      width: anchor === 'left' || anchor === 'right' ? width : '100%',
      height: anchor === 'top' || anchor === 'bottom' ? height : '100%',
      ...sx,
    },
  };

  return (
    <MUIDrawer
      open={open}
      onClose={onClose}
      variant={drawerVariant}
      anchor={anchor}
      sx={drawerSx}
      {...props}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        {(title || showCloseButton || showMenuButton) && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                minHeight: 64,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {showMenuButton && (
                  <IconButton
                    onClick={onMenuClick}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                {title && (
                  <Typography variant="h6" component="h2">
                    {title}
                  </Typography>
                )}
              </Box>
              
              {showCloseButton && (
                <IconButton
                  onClick={onClose}
                  size="small"
                  sx={{ ml: 'auto' }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
            <Divider />
          </>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </MUIDrawer>
  );
};

export default Drawer;
