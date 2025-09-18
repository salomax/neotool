import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Drawer } from '../Drawer';

// Mock theme for testing
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Drawer', () => {
  const mockOnClose = jest.fn();
  const mockOnMenuClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with basic props', () => {
    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose}>
        <div>Drawer Content</div>
      </Drawer>
    );

    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose} title="My Drawer">
        <div>Drawer Content</div>
      </Drawer>
    );

    expect(screen.getByText('My Drawer')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose}>
        <div>Drawer Content</div>
      </Drawer>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose} showCloseButton={false}>
        <div>Drawer Content</div>
      </Drawer>
    );

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('shows menu button when showMenuButton is true', () => {
    renderWithTheme(
      <Drawer 
        open={true} 
        onClose={mockOnClose} 
        showMenuButton={true}
        onMenuClick={mockOnMenuClick}
      >
        <div>Drawer Content</div>
      </Drawer>
    );

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose}>
        <div>Drawer Content</div>
      </Drawer>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMenuClick when menu button is clicked', () => {
    renderWithTheme(
      <Drawer 
        open={true} 
        onClose={mockOnClose} 
        showMenuButton={true}
        onMenuClick={mockOnMenuClick}
      >
        <div>Drawer Content</div>
      </Drawer>
    );

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different anchors', () => {
    const { rerender } = renderWithTheme(
      <Drawer open={true} onClose={mockOnClose} anchor="left">
        <div>Left Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('Left Drawer')).toBeInTheDocument();

    rerender(
      <Drawer open={true} onClose={mockOnClose} anchor="right">
        <div>Right Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('Right Drawer')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = renderWithTheme(
      <Drawer open={true} onClose={mockOnClose} variant="temporary">
        <div>Temporary Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('Temporary Drawer')).toBeInTheDocument();

    rerender(
      <Drawer open={true} onClose={mockOnClose} variant="persistent">
        <div>Persistent Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('Persistent Drawer')).toBeInTheDocument();
  });

  it('applies custom width and height', () => {
    renderWithTheme(
      <Drawer 
        open={true} 
        onClose={mockOnClose} 
        width={400}
        height={600}
        anchor="left"
      >
        <div>Custom Size Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('Custom Size Drawer')).toBeInTheDocument();
  });

  it('renders without header when no title and no buttons', () => {
    renderWithTheme(
      <Drawer 
        open={true} 
        onClose={mockOnClose} 
        showCloseButton={false}
        showMenuButton={false}
      >
        <div>No Header Drawer</div>
      </Drawer>
    );

    expect(screen.getByText('No Header Drawer')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles long content with scroll', () => {
    const longContent = Array.from({ length: 50 }, (_, i) => (
      <div key={i}>Line {i + 1}</div>
    ));

    renderWithTheme(
      <Drawer open={true} onClose={mockOnClose} title="Long Content">
        {longContent}
      </Drawer>
    );

    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 50')).toBeInTheDocument();
  });

  it('forwards additional props to MUI Drawer', () => {
    renderWithTheme(
      <Drawer 
        open={true} 
        onClose={mockOnClose}
        data-testid="custom-drawer"
        className="custom-class"
      >
        <div>Custom Props Drawer</div>
      </Drawer>
    );

    const drawer = screen.getByTestId('custom-drawer');
    expect(drawer).toBeInTheDocument();
  });
});
