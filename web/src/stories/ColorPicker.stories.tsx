import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from '../shared/components/ui/atoms/ColorPicker';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Atoms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive color picker component with preset colors, custom input, and multiple color format support (Hex, RGB, HSL).'
      }
    }
  },
  argTypes: {
    value: {
      control: 'color',
      description: 'Selected color value'
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when color changes'
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the component'
    },
    showPresets: {
      control: 'boolean',
      description: 'Whether to show preset colors'
    },
    showCustomInput: {
      control: 'boolean',
      description: 'Whether to show custom color input'
    },
    showHexInput: {
      control: 'boolean',
      description: 'Whether to show hex input format'
    },
    showRgbInput: {
      control: 'boolean',
      description: 'Whether to show RGB input format'
    },
    showHslInput: {
      control: 'boolean',
      description: 'Whether to show HSL input format'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled'
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the component is read-only'
    },
    label: {
      control: 'text',
      description: 'Label for the color picker'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the component'
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// Interactive example component
const InteractiveExample = () => {
  const [color, setColor] = useState('#3F51B5');
  const [variant, setVariant] = useState<'standard' | 'outlined' | 'filled'>('standard');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <Box>
      <Stack spacing={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Interactive Color Picker</Typography>
          <ColorPicker
            value={color}
            onChange={setColor}
            variant={variant}
            size={size}
            label="Choose Color"
            showPresets
            showCustomInput
            showRgbInput
            showHslInput
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Selected color: {color}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Controls</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Typography variant="subtitle2">Variant:</Typography>
              {(['standard', 'outlined', 'filled'] as const).map((v) => (
                <label key={v} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name="variant"
                    value={v}
                    checked={variant === v}
                    onChange={(e) => setVariant(e.target.value as any)}
                    style={{ marginRight: '8px' }}
                  />
                  {v}
                </label>
              ))}
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Typography variant="subtitle2">Size:</Typography>
              {(['small', 'medium', 'large'] as const).map((s) => (
                <label key={s} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={(e) => setSize(e.target.value as any)}
                    style={{ marginRight: '8px' }}
                  />
                  {s}
                </label>
              ))}
          </Box>
        </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export const Default: Story = {
  args: {
    value: '#3F51B5',
    label: 'Choose Color'
  }
};

export const WithPresets: Story = {
  args: {
    value: '#FF5722',
    label: 'Choose Color',
    showPresets: true,
    showCustomInput: true
  }
};

export const WithCustomInput: Story = {
  args: {
    value: '#4CAF50',
    label: 'Custom Color',
    showPresets: false,
    showCustomInput: true,
    showHexInput: true,
    showRgbInput: true,
    showHslInput: true
  }
};

export const OutlinedVariant: Story = {
  args: {
    value: '#E91E63',
    variant: 'outlined',
    label: 'Outlined Color Picker'
  }
};

export const FilledVariant: Story = {
  args: {
    value: '#9C27B0',
    variant: 'filled',
    label: 'Filled Color Picker'
  }
};

export const SmallSize: Story = {
  args: {
    value: '#FF9800',
    size: 'small',
    label: 'Small Color Picker'
  }
};

export const LargeSize: Story = {
  args: {
    value: '#795548',
    size: 'large',
    label: 'Large Color Picker'
  }
};

export const Disabled: Story = {
  args: {
    value: '#607D8B',
    disabled: true,
    label: 'Disabled Color Picker'
  }
};

export const ReadOnly: Story = {
  args: {
    value: '#455A64',
    readOnly: true,
    label: 'Read Only Color Picker'
  }
};

export const WithError: Story = {
  args: {
    value: '#F44336',
    error: true,
    helperText: 'Please select a valid color',
    label: 'Color with Error'
  }
};

export const WithHelperText: Story = {
  args: {
    value: '#2196F3',
    helperText: 'Choose a color that matches your brand',
    label: 'Color with Helper Text'
  }
};

export const AllFormats: Story = {
  args: {
    value: '#FF5722',
    label: 'All Color Formats',
    showPresets: true,
    showCustomInput: true,
    showHexInput: true,
    showRgbInput: true,
    showHslInput: true
  }
};

export const Minimal: Story = {
  args: {
    value: '#673AB7',
    showPresets: false,
    showCustomInput: false,
    label: 'Minimal Color Picker'
  }
};

export const CustomPresets: Story = {
  args: {
    value: '#FF1744',
    label: 'Custom Presets',
    presets: [
      '#FF1744', '#F50057', '#E91E63', '#9C27B0', '#673AB7',
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
      '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107'
    ]
  }
};

export const Interactive: Story = {
  render: () => <InteractiveExample />
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>Standard</Typography>
        <ColorPicker value="#3F51B5" variant="standard" label="Standard" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Outlined</Typography>
        <ColorPicker value="#E91E63" variant="outlined" label="Outlined" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Filled</Typography>
        <ColorPicker value="#4CAF50" variant="filled" label="Filled" />
      </Box>
    </Stack>
  )
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Small</Typography>
        <ColorPicker value="#FF5722" size="small" label="Small" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Medium</Typography>
        <ColorPicker value="#FF5722" size="medium" label="Medium" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Large</Typography>
        <ColorPicker value="#FF5722" size="large" label="Large" />
      </Box>
    </Stack>
  )
};

export const ColorFormats: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Hex Format</Typography>
        <ColorPicker 
          value="#FF5722" 
          showCustomInput 
          showHexInput 
          label="Hex Color" 
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>RGB Format</Typography>
        <ColorPicker 
          value="#FF5722" 
          showCustomInput 
          showRgbInput 
          label="RGB Color" 
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>HSL Format</Typography>
        <ColorPicker 
          value="#FF5722" 
          showCustomInput 
          showHslInput 
          label="HSL Color" 
        />
      </Paper>
    </Stack>
  )
};
