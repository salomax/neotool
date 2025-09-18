import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { 
  HomeIcon, 
  PersonIcon, 
  SettingsIcon, 
  MailIcon, 
  NotificationsIcon,
  MenuIcon 
} from '@mui/icons-material';
import { Drawer } from '../shared/components/ui/atoms/Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Atoms/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A versatile drawer component for navigation, sidebars, and overlays. Supports multiple variants, anchors, and customization options.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls drawer visibility',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when drawer is closed',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in drawer header',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    showMenuButton: {
      control: 'boolean',
      description: 'Show menu button in header',
    },
    onMenuClick: {
      action: 'menu clicked',
      description: 'Callback when menu button is clicked',
    },
    variant: {
      control: 'select',
      options: ['temporary', 'persistent', 'permanent'],
      description: 'Drawer variant type',
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer anchor position',
    },
    width: {
      control: 'number',
      description: 'Drawer width (for left/right anchors)',
    },
    height: {
      control: 'number',
      description: 'Drawer height (for top/bottom anchors)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Basic drawer with navigation
const NavigationContent = () => (
  <List>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItem>
  </List>
);

// Interactive wrapper for stories
const DrawerWrapper = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Button 
        variant="contained" 
        onClick={() => setOpen(true)}
        startIcon={<MenuIcon />}
        style={{ margin: 16 }}
      >
        Open Drawer
      </Button>
      
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onMenuClick={() => console.log('Menu clicked')}
      >
        <NavigationContent />
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Navigation',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 280,
  },
};

export const WithTitle: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'My Application',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 300,
  },
};

export const WithMenuButton: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Navigation',
    showCloseButton: true,
    showMenuButton: true,
    variant: 'temporary',
    anchor: 'left',
    width: 280,
  },
};

export const RightAnchor: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Settings',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'right',
    width: 320,
  },
};

export const TopAnchor: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Top Menu',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'top',
    height: 200,
  },
};

export const BottomAnchor: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Bottom Panel',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'bottom',
    height: 300,
  },
};

export const PersistentVariant: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Persistent Sidebar',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'persistent',
    anchor: 'left',
    width: 280,
  },
};

export const NoHeader: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    showCloseButton: false,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 280,
  },
};

export const CustomWidth: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Wide Drawer',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 400,
  },
};

export const LongContent: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Long Content',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 280,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>
        <Button 
          variant="contained" 
          onClick={() => {
            const drawer = document.querySelector('[role="presentation"]');
            if (drawer) {
              (drawer as HTMLElement).style.display = 'block';
            }
          }}
          startIcon={<MenuIcon />}
          style={{ margin: 16 }}
        >
          Open Drawer
        </Button>
        
        <Drawer
          {...args}
          open={true}
          onClose={() => {}}
        >
          <List>
            {Array.from({ length: 50 }, (_, i) => (
              <ListItem key={i} button>
                <ListItemText primary={`Item ${i + 1}`} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    ),
  ],
};

export const WithCustomStyling: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: 'Styled Drawer',
    showCloseButton: true,
    showMenuButton: false,
    variant: 'temporary',
    anchor: 'left',
    width: 280,
    sx: {
      '& .MuiDrawer-paper': {
        backgroundColor: '#f5f5f5',
        borderRight: '2px solid #e0e0e0',
      },
    },
  },
};
