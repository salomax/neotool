import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '../shared/components/ui/atoms/ProgressBar';
import { Box, Typography, Stack, Paper, Divider, Button } from '../shared/ui/mui-imports';
import { useState, useEffect } from 'react';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile progress bar component with linear, circular, and step variants.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)'
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the progress is indeterminate'
    },
    variant: {
      control: { type: 'select' },
      options: ['linear', 'circular', 'step'],
      description: 'Progress bar variant'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Progress bar size'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Progress bar color'
    },
    thickness: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Progress bar thickness (for circular)'
    },
    width: {
      control: { type: 'text' },
      description: 'Progress bar width (for linear)'
    },
    height: {
      control: { type: 'number' },
      description: 'Progress bar height (for linear)'
    },
    showPercentage: {
      control: { type: 'boolean' },
      description: 'Whether to show percentage'
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show label'
    },
    label: {
      control: { type: 'text' },
      description: 'Custom label text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the progress bar'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the progress bar is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// Interactive wrapper for stories
const ProgressBarWrapper = (props: any) => {
  const [progress, setProgress] = useState(props.value || 0);
  
  useEffect(() => {
    setProgress(props.value || 0);
  }, [props.value]);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <ProgressBar
        {...props}
        value={progress}
        onChange={(newValue) => setProgress(newValue)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    value: 50,
    label: 'Progress',
    helperText: 'Current progress status'
  }
};

export const Linear: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'linear',
    value: 75,
    label: 'Linear Progress',
    helperText: 'Linear progress bar example'
  }
};

export const Circular: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'circular',
    value: 60,
    label: 'Circular Progress',
    helperText: 'Circular progress bar example'
  }
};

export const Step: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'step',
    currentStep: 2,
    totalSteps: 5,
    steps: ['Start', 'Process', 'Review', 'Approve', 'Complete'],
    label: 'Step Progress',
    helperText: 'Step-by-step progress example'
  }
};

export const Indeterminate: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    indeterminate: true,
    label: 'Loading...',
    helperText: 'Indeterminate progress for loading states'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small Size
        </Typography>
        <ProgressBarWrapper
          variant="linear"
          size="small"
          value={50}
          label="Small Progress"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Medium Size
        </Typography>
        <ProgressBarWrapper
          variant="linear"
          size="medium"
          value={50}
          label="Medium Progress"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Large Size
        </Typography>
        <ProgressBarWrapper
          variant="linear"
          size="large"
          value={50}
          label="Large Progress"
        />
      </Box>
    </Stack>
  )
};

export const DifferentColors: Story = {
  render: () => (
    <Stack spacing={3}>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <Box key={color}>
          <Typography variant="subtitle2" gutterBottom>
            {color.charAt(0).toUpperCase() + color.slice(1)} Color
          </Typography>
          <ProgressBarWrapper
            variant="linear"
            color={color}
            value={75}
            label={`${color} progress`}
          />
        </Box>
      ))}
    </Stack>
  )
};

export const WithoutPercentage: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'linear',
    value: 80,
    showPercentage: false,
    label: 'Progress without percentage',
    helperText: 'Progress bar without percentage display'
  }
};

export const WithoutLabel: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'linear',
    value: 65,
    showLabel: false,
    helperText: 'Progress bar without label'
  }
};

export const WithError: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'linear',
    value: 30,
    error: true,
    errorMessage: 'Progress failed',
    label: 'Failed Progress',
    helperText: 'Progress bar with error state'
  }
};

export const Disabled: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'linear',
    value: 40,
    disabled: true,
    label: 'Disabled Progress',
    helperText: 'Progress bar is disabled'
  }
};

export const StepWithContent: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'step',
    currentStep: 1,
    totalSteps: 3,
    steps: ['Setup', 'Configuration', 'Complete'],
    showStepContent: true,
    stepContent: [
      <Typography key="0" variant="body2">Configure your account settings</Typography>,
      <Typography key="1" variant="body2">Set up your preferences and notifications</Typography>,
      <Typography key="2" variant="body2">Review and complete the setup</Typography>
    ],
    label: 'Setup Wizard',
    helperText: 'Step progress with content'
  }
};

export const ClickableSteps: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'step',
    currentStep: 1,
    totalSteps: 4,
    steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    clickable: true,
    onStepClick: (stepIndex: number) => {
      console.log(`Clicked step ${stepIndex + 1}`);
    },
    label: 'Clickable Steps',
    helperText: 'Click on any step to navigate'
  }
};

export const StepWithStatus: Story = {
  render: (args) => <ProgressBarWrapper {...args} />,
  args: {
    variant: 'step',
    currentStep: 2,
    totalSteps: 4,
    steps: ['Start', 'Process', 'Review', 'Complete'],
    stepStatus: ['completed', 'completed', 'active', 'pending'],
    label: 'Step with Status',
    helperText: 'Steps with different status indicators'
  }
};

export const CustomDimensions: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Custom Width (50%)
        </Typography>
        <ProgressBarWrapper
          variant="linear"
          value={60}
          width="50%"
          label="Half Width"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Custom Height (16px)
        </Typography>
        <ProgressBarWrapper
          variant="linear"
          value={40}
          height={16}
          label="Thick Progress"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Custom Thickness (8px)
        </Typography>
        <ProgressBarWrapper
          variant="circular"
          value={70}
          thickness={8}
          label="Thick Circular"
        />
      </Box>
    </Stack>
  )
};

export const InteractiveDemo: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const simulateProgress = () => {
      setIsLoading(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };

    const nextStep = () => {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Progress Bar Demo
        </Typography>
        
        <Stack spacing={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Linear Progress
            </Typography>
            <ProgressBar
              variant="linear"
              value={progress}
              label="File Upload"
              helperText="Uploading files to server"
              showPercentage
            />
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                onClick={simulateProgress}
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Start Upload'}
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Circular Progress
            </Typography>
            <ProgressBar
              variant="circular"
              value={progress}
              label="Processing"
              helperText="Processing your request"
              showPercentage
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Step Progress
            </Typography>
            <ProgressBar
              variant="step"
              currentStep={currentStep}
              totalSteps={4}
              steps={['Account', 'Profile', 'Preferences', 'Complete']}
              label="Setup Wizard"
              helperText="Complete the setup process"
              showPercentage
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button 
                variant="contained" 
                onClick={nextStep}
                disabled={currentStep === 3}
              >
                Next
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Loading States
            </Typography>
            <Stack spacing={2}>
              <ProgressBar
                variant="linear"
                indeterminate
                label="Loading data..."
                helperText="Fetching data from server"
              />
              <ProgressBar
                variant="circular"
                indeterminate
                label="Processing..."
                helperText="Please wait while we process your request"
              />
            </Stack>
          </Paper>
        </Stack>

        <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Current State:
          </Typography>
          <pre style={{ margin: 0, fontSize: '12px' }}>
            {JSON.stringify({
              progress: `${progress}%`,
              currentStep: currentStep + 1,
              isLoading
            }, null, 2)}
          </pre>
        </Paper>
      </Box>
    );
  }
};
