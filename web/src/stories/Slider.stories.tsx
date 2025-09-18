import type { Meta, StoryObj } from '@storybook/react';
import Slider from '../shared/components/ui/atoms/Slider';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile slider component with single value, range, and various customization options.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current value of the slider'
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value of the slider'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value of the slider'
    },
    step: {
      control: { type: 'number' },
      description: 'Step size for the slider'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled'
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the slider is read-only'
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Whether to show value labels'
    },
    showChips: {
      control: { type: 'boolean' },
      description: 'Whether to show value chips'
    },
    showMinMax: {
      control: { type: 'boolean' },
      description: 'Whether to show min/max labels'
    },
    showMarks: {
      control: { type: 'boolean' },
      description: 'Whether to show step marks'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Size of the slider'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Color theme of the slider'
    },
    range: {
      control: { type: 'boolean' },
      description: 'Whether to use range mode (dual thumbs)'
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the slider'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the slider'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Interactive wrapper for stories
const SliderWrapper = (props: any) => {
  const [value, setValue] = useState(props.value || 0);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Slider
        {...props}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    label: 'Volume',
    helperText: 'Adjust the volume level'
  }
};

export const WithValue: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 50,
    label: 'Progress',
    showValue: true,
    helperText: 'Current progress: 50%'
  }
};

export const WithChips: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 75,
    label: 'Temperature',
    showChips: true,
    showValue: false,
    helperText: 'Set the temperature'
  }
};

export const Range: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: [20, 80],
    range: true,
    label: 'Price Range',
    showValue: true,
    helperText: 'Select your price range'
  }
};

export const RangeWithChips: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: [30, 70],
    range: true,
    label: 'Age Range',
    showChips: true,
    showValue: false,
    helperText: 'Select age range'
  }
};

export const WithMarks: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 60,
    label: 'Difficulty Level',
    showMarks: true,
    showValue: true,
    step: 10,
    helperText: 'Choose difficulty level'
  }
};

export const CustomMarks: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 2,
    label: 'Priority',
    marks: [
      { value: 0, label: 'Low' },
      { value: 1, label: 'Medium' },
      { value: 2, label: 'High' },
      { value: 3, label: 'Critical' }
    ],
    showMarks: true,
    showValue: true,
    min: 0,
    max: 3,
    step: 1,
    helperText: 'Set priority level'
  }
};

export const WithMinMaxLabels: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 40,
    label: 'Score',
    showMinMax: true,
    showValue: true,
    min: 0,
    max: 100,
    helperText: 'Rate from 0 to 100'
  }
};

export const Vertical: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 60,
    label: 'Volume',
    orientation: 'vertical',
    showValue: true,
    helperText: 'Vertical slider'
  }
};

export const Small: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 30,
    label: 'Size',
    size: 'small',
    showValue: true,
    helperText: 'Small size slider'
  }
};

export const DifferentColors: Story = {
  render: () => (
    <Stack spacing={3}>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <Box key={color}>
          <Typography variant="subtitle2" gutterBottom>
            {color.charAt(0).toUpperCase() + color.slice(1)} Color
          </Typography>
          <SliderWrapper
            value={50}
            color={color}
            label={`${color} slider`}
            showValue
          />
        </Box>
      ))}
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 40,
    label: 'Disabled Slider',
    disabled: true,
    showValue: true,
    helperText: 'This slider is disabled'
  }
};

export const ReadOnly: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 70,
    label: 'Read Only Slider',
    readOnly: true,
    showValue: true,
    helperText: 'This slider is read-only'
  }
};

export const Error: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 20,
    label: 'Error Slider',
    error: true,
    showValue: true,
    helperText: 'This slider has an error'
  }
};

export const CustomFormatter: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: 2500,
    label: 'Price',
    min: 0,
    max: 10000,
    step: 100,
    showValue: true,
    showMinMax: true,
    valueFormatter: (value) => `$${value.toLocaleString()}`,
    helperText: 'Select price range'
  }
};

export const AllFeatures: Story = {
  render: (args) => <SliderWrapper {...args} />,
  args: {
    value: [25, 75],
    range: true,
    label: 'Complete Slider',
    showValue: true,
    showChips: true,
    showMinMax: true,
    showMarks: true,
    step: 5,
    color: 'primary',
    helperText: 'Slider with all features enabled'
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState(50);
    const [rangeValue, setRangeValue] = useState([20, 80]);
    const [temperature, setTemperature] = useState(22);
    const [volume, setVolume] = useState(75);

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Interactive Slider Demo
        </Typography>
        
        <Stack spacing={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Single Value Slider
            </Typography>
            <Slider
              value={singleValue}
              onChange={(value) => setSingleValue(value as number)}
              label="Progress"
              showValue
              showChips
              helperText={`Current value: ${singleValue}`}
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Range Slider
            </Typography>
            <Slider
              value={rangeValue}
              onChange={(value) => setRangeValue(value as number[])}
              range
              label="Price Range"
              showValue
              showChips
              min={0}
              max={1000}
              step={10}
              valueFormatter={(value) => `$${value}`}
              helperText={`Range: $${rangeValue[0]} - $${rangeValue[1]}`}
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Temperature Control
            </Typography>
            <Slider
              value={temperature}
              onChange={(value) => setTemperature(value as number)}
              label="Temperature"
              min={-10}
              max={50}
              step={1}
              showValue
              showMinMax
              valueFormatter={(value) => `${value}°C`}
              color="warning"
              helperText={`Current temperature: ${temperature}°C`}
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Volume Control
            </Typography>
            <Slider
              value={volume}
              onChange={(value) => setVolume(value as number)}
              label="Volume"
              min={0}
              max={100}
              step={5}
              showValue
              showMarks
              marks={[
                { value: 0, label: 'Mute' },
                { value: 25, label: 'Low' },
                { value: 50, label: 'Medium' },
                { value: 75, label: 'High' },
                { value: 100, label: 'Max' }
              ]}
              color="success"
              helperText={`Volume: ${volume}%`}
            />
          </Paper>
        </Stack>
      </Box>
    );
  }
};
