"use client";

import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  CardActions,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Badge,
  Avatar,
  Tooltip,
  IconButton,
  SearchIcon,
  FilterListIcon,
  CodeIcon,
  VisibilityIcon,
  CategoryIcon,
  WidgetsIcon,
  ExtensionIcon,
  ViewModuleIcon,
  ViewListIcon,
  ViewComfyIcon,
  ViewListIconAlt,
  OpenInNewIcon,
  ContentCopyIcon,
  CloseIcon
} from "@/shared/ui/mui-imports";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { useRouter } from "next/navigation";

// Component categories following atomic design principles
const componentCategories = {
  atoms: {
    title: "Atoms",
    description: "Basic building blocks of our design system",
    icon: <CategoryIcon />,
    color: "primary" as const,
    components: [
      {
        name: "Button",
        description: "Interactive elements for user actions",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["interaction", "action"]
      },
      {
        name: "Avatar",
        description: "User profile images and initials",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["profile", "user"]
      },
      {
        name: "Badge",
        description: "Small status indicators and notifications",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["status", "notification"]
      },
      {
        name: "Chip",
        description: "Compact elements for tags and filters",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["tag", "filter"]
      },
      {
        name: "Tooltip",
        description: "Contextual information on hover",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["help", "context"]
      },
      {
        name: "Link",
        description: "Navigation and external links",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["navigation", "link"]
      },
      {
        name: "LoadingSpinner",
        description: "Loading states and progress indicators",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["loading", "progress"]
      },
      {
        name: "PageSkeleton",
        description: "Skeleton loading for page content",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["loading", "skeleton"]
      },
      {
        name: "Drawer",
        description: "Sliding panel for navigation and overlays",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["navigation", "sidebar", "overlay"]
      },
      {
        name: "Rating",
        description: "Interactive rating component with multiple variants",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["rating", "stars", "feedback", "interaction"]
      },
      {
        name: "ColorPicker",
        description: "Color picker with presets and multiple format support",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["color", "picker", "palette", "input"]
      },
      {
        name: "Slider",
        description: "Range and value selection with multiple variants",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["slider", "range", "input", "control"]
      },
      {
        name: "Switch",
        description: "Toggle switch for binary on/off states",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["switch", "toggle", "input", "control"]
      },
      {
        name: "DateTimePicker",
        description: "Date and time picker with various customization options",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["datetime", "picker", "input", "calendar", "time"]
      },
      {
        name: "ImageUpload",
        description: "Image upload component with drag & drop and preview",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["upload", "image", "drag", "drop", "preview"]
      },
      {
        name: "ProgressBar",
        description: "Progress indicator with linear, circular, and step variants",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["progress", "indicator", "loading", "status", "bar"]
      },
    ]
  },
  formFields: {
    title: "Form Fields",
    description: "Specialized input components for forms",
    icon: <WidgetsIcon />,
    color: "secondary" as const,
    components: [
      {
        name: "TextField",
        description: "Input fields for text data",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "form"]
      },
      {
        name: "AutocompleteField",
        description: "Searchable dropdown with suggestions",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "search", "dropdown"]
      },
      {
        name: "CheckboxField",
        description: "Boolean input with checkbox styling",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "boolean", "checkbox"]
      },
      {
        name: "CurrencyField",
        description: "Formatted input for monetary values",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "currency", "money"]
      },
      {
        name: "DatePickerField",
        description: "Date and time selection components",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "date", "time"]
      },
      {
        name: "NumberField",
        description: "Numeric input with validation",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["input", "number", "numeric"]
      },
      {
        name: "PasswordField",
        description: "Secure input for passwords",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "password", "security"]
      },
      {
        name: "PercentField",
        description: "Formatted input for percentage values",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "percent", "percentage"]
      },
      {
        name: "RadioGroupField",
        description: "Single selection from multiple options",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "radio", "selection"]
      },
      {
        name: "SelectField",
        description: "Dropdown selection component",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "select", "dropdown"]
      },
      {
        name: "ToggleField",
        description: "Switch input for boolean values",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["input", "toggle", "switch"]
      },
      {
        name: "AsyncAutocomplete",
        description: "Autocomplete with asynchronous data loading",
        status: "beta",
        stories: true,
        tests: false,
        tags: ["input", "async"]
      },
      {
        name: "FileUploader",
        description: "Component for uploading files",
        status: "beta",
        stories: false,
        tests: false,
        tags: ["input", "upload"]
      },
      {
        name: "MaskedField",
        description: "Input field with predefined masks",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["input", "mask"]
      },
      {
        name: "CEPField",
        description: "Brazilian postal code input with validation",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["input", "brazil", "cep", "postal"]
      },
      {
        name: "CNPJField",
        description: "Brazilian company registration number (CNPJ)",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["input", "brazil", "cnpj", "company"]
      },
      {
        name: "CPFField",
        description: "Brazilian individual registration number (CPF)",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["input", "brazil", "cpf", "individual"]
      }
    ]
  },
  molecules: {
    title: "Molecules",
    description: "Combinations of atoms that work together",
    icon: <ExtensionIcon />,
    color: "success" as const,
    components: [
      {
        name: "ConfirmDialog",
        description: "Modal dialog for confirmations",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["dialog", "confirmation", "modal"]
      },
      {
        name: "EmptyErrorState",
        description: "Empty state and error messaging",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["empty", "error", "state"]
      },
      {
        name: "SearchField",
        description: "Search input with advanced features",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["search", "input", "filter"]
      },
      {
        name: "ToastProvider",
        description: "Global notification system",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["notification", "toast", "global"]
      },
      {
        name: "Chart",
        description: "Data visualization with multiple chart types",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["data", "visualization", "charts"]
      },
      {
        name: "RichTextEditor",
        description: "Rich text editor with toolbar and formatting options",
        status: "stable",
        stories: true,
        tests: true,
        tags: ["editor", "text", "formatting", "wysiwyg"]
      }
    ]
  },
  organisms: {
    title: "Organisms",
    description: "Complex UI components made of molecules and atoms",
    icon: <ViewModuleIcon />,
    color: "warning" as const,
    components: [
      {
        name: "DataTable",
        description: "Advanced data table with sorting, filtering, and pagination",
        status: "stable",
        stories: true,
        tests: false,
        tags: ["table", "data", "grid", "pagination"]
      },
      {
        name: "Actions",
        description: "Action buttons and bulk operations",
        status: "stable",
        stories: false,
        tests: false,
        tags: ["actions", "buttons", "bulk"]
      }
    ]
  }
};

export default function ComponentsPage() {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = Object.entries(componentCategories)
    .filter(([key, category]) => {
      if (selectedCategory !== "all" && key !== selectedCategory) return false;
      
      if (!searchTerm.trim()) return true;
      
      const filteredComponents = category.components.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      return filteredComponents.length > 0;
    })
    .map(([key, category]) => {
      if (!searchTerm.trim()) return [key, category] as const;
      
      const filteredComponents = category.components.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      return [key, { ...category, components: filteredComponents }] as const;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "success";
      case "beta": return "warning";
      case "deprecated": return "error";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "stable": return "Stable";
      case "beta": return "Beta";
      case "deprecated": return "Deprecated";
      default: return status;
    }
  };

  const handleViewComponent = (componentName: string) => {
    // Navigate to component detail page using Next.js routing
    router.push(`/design-system/components/${componentName.toLowerCase()}`);
  };


  const handleViewStorybook = (componentName: string) => {
    // Open Storybook for the component
    window.open(`http://localhost:6006/?path=/story/components-${componentName.toLowerCase()}`, '_blank');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Components
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mb: 4 }}>
          Explore our comprehensive collection of reusable UI components, organized by atomic design principles.
        </Typography>
        
        {/* Search Results Counter */}
        {searchTerm && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Found {filteredCategories.reduce((total, [, category]) => total + (category?.components?.length || 0), 0)} components matching "{searchTerm}"
            </Typography>
          </Box>
        )}

        {/* Search and Filters */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", mb: 4 }}>
          <TextField
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm("")}
                    edge="end"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <Button
            variant="outlined"
            startIcon={viewMode === "grid" ? <ViewListIconAlt /> : <ViewComfyIcon />}
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>
        </Box>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onChange={(_, value) => setSelectedCategory(value)}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
        >
          <Tab label="All Components" value="all" />
          {Object.entries(componentCategories).map(([key, category]) => (
            <Tab
              key={key}
              label={category.title}
              value={key}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Components Grid */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filteredCategories.map(([categoryKey, category]) => (
          <Accordion key={categoryKey} defaultExpanded>
            <AccordionSummary expandIcon={<CodeIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: `${category.color}.main` }}>
                  {category.icon}
                </Box>
                <Box>
                  <Typography variant="h6" component="h2">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
                <Chip 
                  label={category.components.length} 
                  size="small" 
                  color={category.color}
                  sx={{ ml: "auto" }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ 
                display: viewMode === "grid" ? 'grid' : 'flex',
                flexDirection: viewMode === "list" ? 'column' : undefined,
                gridTemplateColumns: viewMode === "grid" ? { 
                  xs: '1fr', 
                  sm: 'repeat(2, 1fr)', 
                  md: 'repeat(3, 1fr)', 
                  lg: 'repeat(4, 1fr)' 
                } : undefined,
                gap: 3 
              }}>
                {category.components.map((component: any) => (
                  <Box key={component.name} sx={viewMode === "list" ? { width: "100%" } : {}}>
                    <Card 
                      sx={{ 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {component.name}
                          </Typography>
                          <Chip
                            label={getStatusLabel(component.status)}
                            size="small"
                            color={getStatusColor(component.status) as any}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {component.description}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
                          {component.tags.map((tag: string) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          {component.stories && (
                            <Tooltip title="Has Storybook stories">
                              <Chip
                                icon={<VisibilityIcon />}
                                label="Stories"
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            </Tooltip>
                          )}
                          {component.tests && (
                            <Tooltip title="Has unit tests">
                              <Chip
                                icon={<CodeIcon />}
                                label="Tests"
                                size="small"
                                variant="outlined"
                                color="success"
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ pt: 0 }}>
                        <Button 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewComponent(component.name)}
                        >
                          View
                        </Button>
                        {component.stories && (
                          <Button 
                            size="small" 
                            startIcon={<OpenInNewIcon />}
                            onClick={() => handleViewStorybook(component.name)}
                          >
                            Storybook
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

          {/* Summary Stats */}
          <Box sx={{ mt: 6, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Component Library Summary
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {Object.entries(componentCategories).map(([key, category]) => (
                <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" color={`${category.color}.main`}>
                    {category.components.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.title}
                  </Typography>
                  {key !== Object.keys(componentCategories)[Object.keys(componentCategories).length - 1] && (
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                      •
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
    </Container>
  );
}