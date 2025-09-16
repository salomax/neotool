"use client";

import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import { useResponsive } from "@/hooks/useResponsive";

export default function DocumentationPage() {
  const { isMobile } = useResponsive();
  
  const getGridColumns = () => {
    return isMobile ? "1fr" : "repeat(2, 1fr)";
  };

  const sections = [
    {
      title: "Getting Started",
      description: "Quick start guide and installation instructions",
      icon: CodeRoundedIcon,
      items: [
        "Installation",
        "Basic Setup",
        "First Component",
        "Configuration"
      ]
    },
    {
      title: "Design Tokens",
      description: "Colors, typography, spacing, and other design tokens",
      icon: PaletteRoundedIcon,
      items: [
        "Color System",
        "Typography Scale",
        "Spacing System",
        "Border Radius",
        "Shadows"
      ]
    },
    {
      title: "Components",
      description: "Complete component library with examples and props",
      icon: BuildRoundedIcon,
      items: [
        "Button Components",
        "Form Components",
        "Layout Components",
        "Navigation Components",
        "Data Display"
      ]
    },
    {
      title: "Accessibility",
      description: "Guidelines and best practices for accessible design",
      icon: AccessibilityRoundedIcon,
      items: [
        "WCAG Guidelines",
        "Keyboard Navigation",
        "Screen Reader Support",
        "Color Contrast",
        "Focus Management"
      ]
    },
    {
      title: "Performance",
      description: "Optimization tips and performance best practices",
      icon: SpeedRoundedIcon,
      items: [
        "Bundle Size",
        "Lazy Loading",
        "Code Splitting",
        "Tree Shaking",
        "Caching Strategies"
      ]
    },
    {
      title: "Security",
      description: "Security considerations and best practices",
      icon: SecurityRoundedIcon,
      items: [
        "XSS Prevention",
        "CSRF Protection",
        "Content Security Policy",
        "Dependency Security",
        "Data Validation"
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Documentation
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800 }}>
          Comprehensive guides, API references, and best practices to help you 
          build amazing applications with our design system.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: getGridColumns(),
          gap: 4 
        }}
      >
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Box key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <IconComponent sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
                    <Typography variant="h5" component="h2">
                      {section.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {section.description}
                  </Typography>
                  <List dense>
                    {section.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: "primary.main"
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
