"use client";

import React, { use } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  Button,
  Chip,
  IconButton,
  ArrowBackIcon,
  VisibilityIcon,
  CodeIcon,
  ContentCopyIcon
} from "../../../../shared/ui/mui-imports";
import Link from "next/link";
import { useResponsive } from "../../../../shared/hooks/useResponsive";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getComponentData } from './componentData';
import { getCodeExample } from './codeExamples';
import { renderComponentExample } from './componentRenderers';

interface ComponentPageProps {
  params: Promise<{
    component: string;
  }>;
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const { isMobile } = useResponsive();
  const resolvedParams = use(params);
  const componentName = resolvedParams.component;

  // State for interactive components
  const [autocompleteValue, setAutocompleteValue] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');
  const [radioValue, setRadioValue] = React.useState('');
  const [cepValue, setCepValue] = React.useState('01234-567');
  const [cnpjValue, setCnpjValue] = React.useState('12.345.678/0001-90');
  const [cpfValue, setCpfValue] = React.useState('123.456.789-00');
  const [phoneValue, setPhoneValue] = React.useState('(555) 123-4567');
  const [dateMaskValue, setDateMaskValue] = React.useState('12/25/2023');
  const [customMaskValue, setCustomMaskValue] = React.useState('123-ABC-456');
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const componentData = getComponentData(componentName);

  // Copy import functionality
  const handleCopyImport = async () => {
    // Convert GitHub URL to import path
    const getImportPath = (githubUrl: string) => {
      // Convert /web/src/shared/components/ui/... to @/shared/components/ui/...
      return githubUrl.replace('/web/src', '@');
    };

    const importPath = getImportPath(componentData.githubUrl);
    const importStatement = `import { ${componentData.name} } from '${importPath}';`;
    
    try {
      await navigator.clipboard.writeText(importStatement);
      alert('Import statement copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Copy code functionality
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Storybook functionality
  const handleViewStorybook = () => {
    const storybookUrl = `http://localhost:6006/?path=/story/components-${componentName.toLowerCase()}`;
    window.open(storybookUrl, '_blank');
  };

  // Generate GitHub URL using component's githubUrl attribute
  const getGitHubUrl = (componentData: any) => {
    const baseUrl = 'https://github.com/salomax/neotool/blob/main';
    return `${baseUrl}${componentData.githubUrl}`;
  };

  // Get the appropriate URL for View Source Code button
  const getSourceCodeUrl = (componentData: any) => {
    const type = componentData.type || 'custom';
    switch (type) {
      case 'mui-simple':
      case 'mui-wrapper':
        return componentData.muiDocsUrl || 'https://mui.com/material-ui/';
      case 'custom':
      default:
        return getGitHubUrl(componentData);
    }
  };

  // Get the appropriate button text for View Source Code button
  const getSourceCodeButtonText = (componentData: any) => {
    const type = componentData.type || 'custom';
    switch (type) {
      case 'mui-simple':
      case 'mui-wrapper':
        return 'View MUI Docs';
      case 'custom':
      default:
        return 'View Source Code';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/design-system/components"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Components
        </Button>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {componentData.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {componentData.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {componentData.tags.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gap: 4 
      }}>
        {/* Main Content */}
        <Box>
          {/* Examples */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Examples
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Interactive examples and code snippets
              </Typography>
              
              {componentData.examples.map((example: any, index: number) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {example.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {example.description}
                  </Typography>
                  
                  {/* Example Preview */}
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: "grey.50", 
                    borderRadius: 1, 
                    border: "1px solid",
                    borderColor: "grey.200",
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 80
                  }}>
                    {renderComponentExample({
                      componentName: componentData.name,
                      example: example.title,
                      autocompleteValue,
                      setAutocompleteValue,
                      showPassword,
                      setShowPassword,
                      selectValue,
                      setSelectValue,
                      radioValue,
                      setRadioValue,
                      cepValue,
                      setCepValue,
                      cnpjValue,
                      setCnpjValue,
                      cpfValue,
                      setCpfValue,
                      phoneValue,
                      setPhoneValue,
                      dateMaskValue,
                      setDateMaskValue,
                      customMaskValue,
                      setCustomMaskValue,
                      dialogOpen,
                      setDialogOpen
                    })}
                  </Box>
                  
                  {/* Code Example */}
                  <Box sx={{ 
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "grey.300",
                    position: "relative"
                  }}>
                    <Box sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1
                    }}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopyCode(getCodeExample(componentData.name, example.title))}
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)"
                          }
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <SyntaxHighlighter
                      language="tsx"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        fontSize: "0.875rem",
                        lineHeight: "1.5"
                      }}
                      showLineNumbers={false}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {getCodeExample(componentData.name, example.title)}
                    </SyntaxHighlighter>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Props Documentation */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Props
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Available properties and their descriptions
              </Typography>
              
              <Box sx={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <th style={{ textAlign: "left", padding: "8px", fontWeight: 600 }}>Name</th>
                      <th style={{ textAlign: "left", padding: "8px", fontWeight: 600 }}>Type</th>
                      <th style={{ textAlign: "left", padding: "8px", fontWeight: 600 }}>Required</th>
                      <th style={{ textAlign: "left", padding: "8px", fontWeight: 600 }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentData.props.map((prop: any, index: number) => (
                      <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "8px", fontFamily: "monospace" }}>{prop.name}</td>
                        <td style={{ padding: "8px", fontFamily: "monospace" }}>{prop.type}</td>
                        <td style={{ padding: "8px" }}>
                          <Chip 
                            label={prop.required ? "Yes" : "No"} 
                            size="small" 
                            color={prop.required ? "error" : "default"}
                          />
                        </td>
                        <td style={{ padding: "8px" }}>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  sx={{ justifyContent: "flex-start" }}
                  onClick={handleViewStorybook}
                >
                  View in Storybook
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CodeIcon />}
                  fullWidth
                  sx={{ justifyContent: "flex-start" }}
                  onClick={() => window.open(getSourceCodeUrl(componentData), '_blank')}
                >
                  {getSourceCodeButtonText(componentData)}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: "flex-start" }}
                  onClick={handleCopyImport}
                >
                  Copy Import
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Component Info
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Chip label={componentData.category} size="small" />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Stories
                  </Typography>
                  <Chip 
                    label={componentData.stories ? "Available" : "Not Available"} 
                    size="small" 
                    color={componentData.stories ? "success" : "default"}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tests
                  </Typography>
                  <Chip 
                    label={componentData.tests ? "Available" : "Not Available"} 
                    size="small" 
                    color={componentData.tests ? "success" : "default"}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
