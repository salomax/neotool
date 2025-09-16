"use client";

import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";

export default function WelcomePage() {
  const { isMobile, isTablet } = useResponsive();
  
  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(3, 1fr)";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to NeoTool
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          A comprehensive design system and component library built with Next.js and Material-UI
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: getGridColumns(),
          gap: 4 
        }}
      >
        <Card 
          component={Link} 
          href="/design-system" 
          sx={{ 
            textDecoration: "none", 
            height: "100%",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <DesignServicesRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Design System
            </Typography>
            <Typography color="text.secondary">
              Explore our comprehensive design system with tokens, components, and guidelines
            </Typography>
          </CardContent>
        </Card>

        <Card 
          component={Link} 
          href="/examples" 
          sx={{ 
            textDecoration: "none", 
            height: "100%",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <CodeRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Examples
            </Typography>
            <Typography color="text.secondary">
              See real-world examples and implementations of our components
            </Typography>
          </CardContent>
        </Card>

        <Card 
          component={Link} 
          href="/documentation" 
          sx={{ 
            textDecoration: "none", 
            height: "100%",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <MenuBookRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Documentation
            </Typography>
            <Typography color="text.secondary">
              Comprehensive guides and API documentation for developers
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
