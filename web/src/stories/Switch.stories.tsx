import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../shared/components/ui/atoms/Switch';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile switch component for toggle states with various customization options.'
      }
    }
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked'
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Default checked state (uncontrolled)'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled'
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the switch is read-only'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Size of the switch'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'],
      description: 'Color theme of the switch'
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the switch'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the switch'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state'
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show the label'
    },
    labelPlacement: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Label placement'
    },
    checkedLabel: {
      control: { type: 'text' },
      description: 'Custom checked label'
    },
    uncheckedLabel: {
      control: { type: 'text' },
      description: 'Custom unchecked label'
    },
    showStatus: {
      control: { type: 'boolean' },
      description: 'Whether to show status text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Interactive wrapper for stories
const SwitchWrapper = (props: any) => {
  const [checked, setChecked] = useState(props.checked || false);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Switch
        {...props}
        checked={checked}
        onChange={(newChecked) => setChecked(newChecked)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    label: 'Enable notifications',
    helperText: 'Turn on to receive notifications'
  }
};

export const Checked: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'Dark mode',
    helperText: 'Switch to dark theme'
  }
};

export const WithStatus: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'Auto-save',
    showStatus: true,
    helperText: 'Automatically save changes'
  }
};

export const CustomStatus: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'Feature flag',
    showStatus: true,
    statusFormatter: (checked) => checked ? 'Enabled' : 'Disabled',
    helperText: 'Toggle feature availability'
  }
};

export const CustomLabels: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'WiFi',
    checkedLabel: 'Connected',
    uncheckedLabel: 'Disconnected',
    helperText: 'Network connection status'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small Size
        </Typography>
        <SwitchWrapper
          label="Small switch"
          size="small"
          showStatus
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Medium Size
        </Typography>
        <SwitchWrapper
          label="Medium switch"
          size="medium"
          showStatus
        />
      </Box>
    </Stack>
  )
};

export const DifferentColors: Story = {
  render: () => (
    <Stack spacing={3}>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'] as const).map((color) => (
        <Box key={color}>
          <Typography variant="subtitle2" gutterBottom>
            {color.charAt(0).toUpperCase() + color.slice(1)} Color
          </Typography>
          <SwitchWrapper
            checked={true}
            color={color}
            label={`${color} switch`}
            showStatus
          />
        </Box>
      ))}
    </Stack>
  )
};

export const LabelPlacements: Story = {
  render: () => (
    <Stack spacing={4}>
      {(['start', 'end', 'top', 'bottom'] as const).map((placement) => (
        <Box key={placement}>
          <Typography variant="subtitle2" gutterBottom>
            Label {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Typography>
          <SwitchWrapper
            label={`Switch with label ${placement}`}
            labelPlacement={placement}
            showStatus
            helperText={`Label is placed ${placement} of the switch`}
          />
        </Box>
      ))}
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'Disabled switch',
    disabled: true,
    helperText: 'This switch is disabled'
  }
};

export const ReadOnly: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    label: 'Read-only switch',
    readOnly: true,
    helperText: 'This switch is read-only'
  }
};

export const Error: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: false,
    label: 'Required setting',
    error: true,
    helperText: 'This setting is required'
  }
};

export const WithoutLabel: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    showLabel: false,
    showStatus: true,
    helperText: 'Switch without visible label'
  }
};

export const CustomLabelComponent: Story = {
  render: (args) => <SwitchWrapper {...args} />,
  args: {
    checked: true,
    labelComponent: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="primary">
          🔔
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Push Notifications
        </Typography>
      </Box>
    ),
    showStatus: true,
    helperText: 'Custom label with icon'
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
      wifi: true
    });

    const handleSettingChange = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Settings Panel
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                App Settings
              </Typography>
              <Stack spacing={2}>
                <Switch
                  checked={settings.notifications}
                  onChange={handleSettingChange('notifications')}
                  label="Push Notifications"
                  showStatus
                  statusFormatter={(checked) => checked ? 'Enabled' : 'Disabled'}
                  helperText="Receive push notifications for important updates"
                />
                
                <Switch
                  checked={settings.darkMode}
                  onChange={handleSettingChange('darkMode')}
                  label="Dark Mode"
                  showStatus
                  statusFormatter={(checked) => checked ? 'On' : 'Off'}
                  helperText="Switch between light and dark themes"
                />
                
                <Switch
                  checked={settings.autoSave}
                  onChange={handleSettingChange('autoSave')}
                  label="Auto-save"
                  showStatus
                  statusFormatter={(checked) => checked ? 'Active' : 'Inactive'}
                  helperText="Automatically save your work"
                />
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
              <Stack spacing={2}>
                <Switch
                  checked={settings.analytics}
                  onChange={handleSettingChange('analytics')}
                  label="Analytics"
                  showStatus
                  statusFormatter={(checked) => checked ? 'Enabled' : 'Disabled'}
                  helperText="Help us improve by sharing anonymous usage data"
                />
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Network Settings
              </Typography>
              <Stack spacing={2}>
                <Switch
                  checked={settings.wifi}
                  onChange={handleSettingChange('wifi')}
                  label="WiFi"
                  checkedLabel="Connected"
                  uncheckedLabel="Disconnected"
                  helperText="Network connection status"
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Current Settings:
          </Typography>
          <pre style={{ margin: 0, fontSize: '12px' }}>
            {JSON.stringify(settings, null, 2)}
          </pre>
        </Paper>
      </Box>
    );
  }
};
