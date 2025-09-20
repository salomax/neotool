import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Typography, Button, TextField, Chip } from '@mui/material';
import { AddIcon, EditIcon, DeleteIcon, SettingsIcon } from '@mui/icons-material';
import Tabs, { TabItem } from '../shared/components/ui/atoms/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile tabs component with dynamic tab creation, closing, and various customization options.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth']
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit']
    },
    showAddButton: {
      control: 'boolean'
    },
    showCloseButtons: {
      control: 'boolean'
    },
    showBadges: {
      control: 'boolean'
    },
    draggable: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Helper component for dynamic tabs
const DynamicTabsExample = () => {
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: 'tab1',
      label: 'Home',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>Welcome Home</Typography>
          <Typography variant="body1">
            This is the home tab content. You can add, remove, and switch between tabs dynamically.
          </Typography>
        </Box>
      ),
      icon: <AddIcon />,
      closable: true
    },
    {
      id: 'tab2',
      label: 'Profile',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>User Profile</Typography>
          <TextField
            label="Name"
            defaultValue="John Doe"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            defaultValue="john@example.com"
            margin="normal"
            fullWidth
          />
        </Box>
      ),
      icon: <EditIcon />,
      badge: '2',
      closable: true
    },
    {
      id: 'tab3',
      label: 'Settings',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>Settings</Typography>
          <Typography variant="body1">
            Configure your application settings here.
          </Typography>
        </Box>
      ),
      icon: <SettingsIcon />,
      closable: false
    }
  ]);

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      const currentIndex = tabs.findIndex(tab => tab.id === tabId);
      const nextTab = currentIndex > 0 ? tabs[currentIndex - 1] : tabs[currentIndex + 1];
      setActiveTab(nextTab.id);
    }
  };

  const handleTabAdd = () => {
    const newTabId = `tab${Date.now()}`;
    const newTab: TabItem = {
      id: newTabId,
      label: `New Tab ${tabs.length - 2}`,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>New Tab Content</Typography>
          <Typography variant="body1">
            This is a dynamically created tab. You can close it using the X button.
          </Typography>
        </Box>
      ),
      closable: true
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTabId);
  };

  return (
    <Tabs
      tabs={tabs}
      value={activeTab}
      onChange={handleTabChange}
      onTabClose={handleTabClose}
      onTabAdd={handleTabAdd}
      showAddButton={true}
      showCloseButtons={true}
      showBadges={true}
    />
  );
};

export const Basic: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Tab 1 Content</Typography>
            <Typography variant="body1">
              This is the content of the first tab.
            </Typography>
          </Box>
        )
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Tab 2 Content</Typography>
            <Typography variant="body1">
              This is the content of the second tab.
            </Typography>
          </Box>
        )
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Tab 3 Content</Typography>
            <Typography variant="body1">
              This is the content of the third tab.
            </Typography>
          </Box>
        )
      }
    ]
  }
};

export const WithIconsAndBadges: Story = {
  args: {
    tabs: [
      {
        id: 'inbox',
        label: 'Inbox',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Inbox</Typography>
            <Typography variant="body1">You have 5 unread messages.</Typography>
          </Box>
        ),
        icon: <AddIcon />,
        badge: 5,
        closable: true
      },
      {
        id: 'sent',
        label: 'Sent',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Sent Messages</Typography>
            <Typography variant="body1">Your sent messages appear here.</Typography>
          </Box>
        ),
        icon: <EditIcon />,
        badge: 12,
        closable: true
      },
      {
        id: 'drafts',
        label: 'Drafts',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Drafts</Typography>
            <Typography variant="body1">You have 3 draft messages.</Typography>
          </Box>
        ),
        icon: <DeleteIcon />,
        badge: 3,
        closable: true
      }
    ],
    showBadges: true
  }
};

export const VerticalTabs: Story = {
  args: {
    tabs: [
      {
        id: 'general',
        label: 'General',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>General Settings</Typography>
            <Typography variant="body1">Configure general application settings.</Typography>
          </Box>
        )
      },
      {
        id: 'security',
        label: 'Security',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Security Settings</Typography>
            <Typography variant="body1">Manage your security preferences.</Typography>
          </Box>
        )
      },
      {
        id: 'privacy',
        label: 'Privacy',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Privacy Settings</Typography>
            <Typography variant="body1">Control your privacy settings.</Typography>
          </Box>
        )
      }
    ],
    orientation: 'vertical',
    variant: 'standard'
  }
};

export const WithNonClosableTabs: Story = {
  args: {
    tabs: [
      {
        id: 'home',
        label: 'Home',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Home</Typography>
            <Typography variant="body1">This tab cannot be closed.</Typography>
          </Box>
        ),
        closable: false
      },
      {
        id: 'about',
        label: 'About',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography variant="body1">This tab also cannot be closed.</Typography>
          </Box>
        ),
        closable: false
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Settings</Typography>
            <Typography variant="body1">This tab can be closed.</Typography>
          </Box>
        ),
        closable: true
      }
    ],
    showCloseButtons: true
  }
};

export const WithTooltips: Story = {
  args: {
    tabs: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Dashboard</Typography>
            <Typography variant="body1">Overview of your data and metrics.</Typography>
          </Box>
        ),
        tooltip: 'View your dashboard with key metrics and charts'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Analytics</Typography>
            <Typography variant="body1">Detailed analytics and reports.</Typography>
          </Box>
        ),
        tooltip: 'Access detailed analytics and generate reports'
      },
      {
        id: 'reports',
        label: 'Reports',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Reports</Typography>
            <Typography variant="body1">Generate and download reports.</Typography>
          </Box>
        ),
        tooltip: 'Create and download various reports'
      }
    ]
  }
};

export const DynamicTabs: Story = {
  render: () => <DynamicTabsExample />
};

export const ScrollableTabs: Story = {
  args: {
    tabs: Array.from({ length: 10 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>Tab {i + 1} Content</Typography>
          <Typography variant="body1">
            This is the content for tab {i + 1}. There are many tabs to demonstrate scrolling.
          </Typography>
        </Box>
      ),
      closable: true
    })),
    variant: 'scrollable',
    showAddButton: true,
    showCloseButtons: true
  }
};

export const DisabledTabs: Story = {
  args: {
    tabs: [
      {
        id: 'active',
        label: 'Active Tab',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Active Tab</Typography>
            <Typography variant="body1">This tab is active and clickable.</Typography>
          </Box>
        )
      },
      {
        id: 'disabled',
        label: 'Disabled Tab',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Disabled Tab</Typography>
            <Typography variant="body1">This tab is disabled.</Typography>
          </Box>
        ),
        disabled: true
      },
      {
        id: 'another',
        label: 'Another Tab',
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Another Tab</Typography>
            <Typography variant="body1">This is another active tab.</Typography>
          </Box>
        )
      }
    ]
  }
};
