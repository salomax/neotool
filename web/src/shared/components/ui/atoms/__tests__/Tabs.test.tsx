import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Tabs, { TabItem } from '../Tabs';

const theme = createTheme();

const mockTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div data-testid="tab1-content">Content 1</div>,
    closable: true
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div data-testid="tab2-content">Content 2</div>,
    closable: true
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: <div data-testid="tab3-content">Content 3</div>,
    closable: false
  }
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Tabs', () => {
  it('renders tabs correctly', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        data-testid="tabs-component"
      />
    );

    expect(screen.getByTestId('tabs-component')).toBeInTheDocument();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows content of active tab', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        value="tab1"
      />
    );

    expect(screen.getByTestId('tab1-content')).toBeInTheDocument();
    expect(screen.queryByTestId('tab2-content')).not.toBeInTheDocument();
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('Tab 2'));
    
    expect(onChange).toHaveBeenCalledWith('tab2');
    expect(screen.getByTestId('tab2-content')).toBeInTheDocument();
  });

  it('closes closable tabs', async () => {
    const user = userEvent.setup();
    const onTabClose = jest.fn();

    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        onTabClose={onTabClose}
      />
    );

    const closeButton = screen.getByTestId('tab-close-tab1');
    await user.click(closeButton);

    expect(onTabClose).toHaveBeenCalledWith('tab1');
  });

  it('does not show close button for non-closable tabs', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
      />
    );

    expect(screen.queryByTestId('tab-close-tab3')).not.toBeInTheDocument();
  });

  it('shows add button when enabled', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        showAddButton={true}
      />
    );

    expect(screen.getByTestId('add-tab-button')).toBeInTheDocument();
  });

  it('calls onTabAdd when add button is clicked', async () => {
    const user = userEvent.setup();
    const onTabAdd = jest.fn();

    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        onTabAdd={onTabAdd}
        showAddButton={true}
      />
    );

    await user.click(screen.getByTestId('add-tab-button'));
    expect(onTabAdd).toHaveBeenCalled();
  });

  it('respects maxTabs limit', () => {
    const manyTabs = Array.from({ length: 10 }, (_, i) => ({
      id: `tab${i}`,
      label: `Tab ${i}`,
      content: <div>Content {i}</div>
    }));

    renderWithTheme(
      <Tabs
        tabs={manyTabs}
        maxTabs={10}
        showAddButton={true}
      />
    );

    expect(screen.queryByTestId('add-tab-button')).not.toBeInTheDocument();
  });

  it('shows badges when provided', () => {
    const tabsWithBadges: TabItem[] = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
        badge: '5'
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <div>Content 2</div>,
        badge: 10
      }
    ];

    renderWithTheme(
      <Tabs
        tabs={tabsWithBadges}
        showBadges={true}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows icons when provided', () => {
    const tabsWithIcons: TabItem[] = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
        icon: <span data-testid="tab1-icon">📁</span>
      }
    ];

    renderWithTheme(
      <Tabs
        tabs={tabsWithIcons}
      />
    );

    expect(screen.getByTestId('tab1-icon')).toBeInTheDocument();
  });

  it('handles disabled tabs', () => {
    const tabsWithDisabled: TabItem[] = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <div>Content 2</div>,
        disabled: true
      }
    ];

    renderWithTheme(
      <Tabs
        tabs={tabsWithDisabled}
      />
    );

    const disabledTab = screen.getByText('Tab 2').closest('[role="tab"]');
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
  });

  it('switches to next tab when active tab is closed', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        value="tab1"
        onChange={onChange}
        onTabClose={() => {
          // Simulate removing tab1
        }}
      />
    );

    const closeButton = screen.getByTestId('tab-close-tab1');
    await user.click(closeButton);

    // Should switch to tab2 (next available tab)
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('renders in vertical orientation', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        orientation="vertical"
        data-testid="vertical-tabs"
      />
    );

    const tabsContainer = screen.getByTestId('vertical-tabs');
    expect(tabsContainer).toHaveStyle({ flexDirection: 'row' });
  });

  it('applies custom className', () => {
    renderWithTheme(
      <Tabs
        tabs={mockTabs}
        className="custom-tabs"
      />
    );

    expect(screen.getByTestId('tabs-component')).toHaveClass('custom-tabs');
  });

  it('shows tooltips when provided', async () => {
    const user = userEvent.setup();
    const tabsWithTooltips: TabItem[] = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
        tooltip: 'This is tab 1'
      }
    ];

    renderWithTheme(
      <Tabs
        tabs={tabsWithTooltips}
      />
    );

    const tab = screen.getByText('Tab 1');
    await user.hover(tab);

    await waitFor(() => {
      expect(screen.getByText('This is tab 1')).toBeInTheDocument();
    });
  });
});
