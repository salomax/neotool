"use client";

import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import { useResponsive } from "@/shared/hooks/useResponsive";
import Link from "next/link";

export default function ExamplesPage() {
  const { isMobile, isTablet } = useResponsive();
  
  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(3, 1fr)";
  };

  const examples = [
    {
      title: "Data Tables",
      description: "Advanced data tables with sorting, filtering, and pagination",
      icon: TableChartRoundedIcon,
      href: "/examples/tables"
    },
    {
      title: "Forms",
      description: "Complex forms with validation and dynamic fields",
      icon: DescriptionRoundedIcon,
      href: "/examples/forms"
    },
    {
      title: "Dashboards",
      description: "Complete dashboard layouts with widgets and charts",
      icon: DashboardRoundedIcon,
      href: "/examples/dashboards"
    },
    {
      title: "API Integration",
      description: "Real-world API integration examples and patterns",
      icon: DataObjectRoundedIcon,
      href: "/examples/api"
    },
    {
      title: "Component Trees",
      description: "Complex component hierarchies and composition patterns",
      icon: AccountTreeRoundedIcon,
      href: "/examples/components"
    },
    {
      title: "Workflows",
      description: "Multi-step processes and user journey examples",
      icon: TimelineRoundedIcon,
      href: "/examples/workflows"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Examples
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800 }}>
          Explore real-world implementations and usage patterns of our components 
          and design system in action.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: getGridColumns(),
          gap: 4 
        }}
      >
        {examples.map((example, index) => {
          const IconComponent = example.icon;
          return (
            <Box key={index}>
              <Card 
                sx={{ 
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <IconComponent sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
                    <Typography variant="h5" component="h2">
                      {example.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                    {example.description}
                  </Typography>
                  <Button 
                    component={Link} 
                    href={example.href}
                    variant="outlined" 
                    fullWidth
                  >
                    View Example
                  </Button>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
