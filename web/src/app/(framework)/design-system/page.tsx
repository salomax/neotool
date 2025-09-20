"use client";

import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import ShapeLineRoundedIcon from '@mui/icons-material/ShapeLineRounded';
import AnimationRoundedIcon from '@mui/icons-material/AnimationRounded';
import { useResponsive } from "@/shared/hooks/useResponsive";
import Link from "next/link";

export default function DesignSystemPage() {
  const { isMobile } = useResponsive();
  
  const getGridColumns = () => {
    return isMobile ? "1fr" : "repeat(2, 1fr)";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Design System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800 }}>
          Our comprehensive design system provides the foundation for building consistent, 
          accessible, and beautiful user interfaces.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: getGridColumns(),
          gap: 4 
        }}
      >
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PaletteRoundedIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
              <Typography variant="h5" component="h2">
                Color Palette
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              A carefully crafted color system that ensures accessibility and visual harmony.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Success" color="success" />
              <Chip label="Warning" color="warning" />
              <Chip label="Error" color="error" />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextFieldsRoundedIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
              <Typography variant="h5" component="h2">
                Typography
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              A hierarchical typography system that creates clear information architecture.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">Body 1 - Regular text</Typography>
              <Typography variant="body2" color="text.secondary">Body 2 - Secondary text</Typography>
              <Typography variant="caption">Caption text</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card 
          component={Link} 
          href="/design-system/components" 
          sx={{ 
            height: "100%", 
            textDecoration: "none",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ShapeLineRoundedIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
              <Typography variant="h5" component="h2">
                Components
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Reusable UI components built with accessibility and consistency in mind.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              <Chip label="Atoms" />
              <Chip label="Molecules" />
              <Chip label="Organisms" />
              <Chip label="Forms" />
              <Chip label="Brazilian" />
            </Box>
            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
              Explore all components →
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AnimationRoundedIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
              <Typography variant="h5" component="h2">
                Motion & Spacing
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Consistent spacing and motion principles that bring life to our interfaces.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Spacing Scale" />
              <Chip label="Animations" />
              <Chip label="Transitions" />
              <Chip label="Layout Grid" />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
