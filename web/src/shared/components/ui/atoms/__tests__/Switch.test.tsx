import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'switch'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Switch {...defaultProps} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('renders as checked when checked prop is true', () => {
    render(<Switch {...defaultProps} checked />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('renders with label', () => {
    render(<Switch {...defaultProps} label="Enable notifications" />);
    
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Switch {...defaultProps} helperText="Turn on to receive notifications" />);
    
    expect(screen.getByText('Turn on to receive notifications')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Switch {...defaultProps} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);
    
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Switch {...defaultProps} onChange={onChange} disabled />);
    
    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when readOnly', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Switch {...defaultProps} onChange={onChange} readOnly />);
    
    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(<Switch {...defaultProps} disabled />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('applies error state correctly', () => {
    render(<Switch {...defaultProps} error />);
    
    const formControl = screen.getByTestId('switch');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Switch {...defaultProps} size="small" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    
    rerender(<Switch {...defaultProps} size="medium" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'] as const;
    
    colors.forEach(color => {
      const { unmount } = render(<Switch {...defaultProps} color={color} />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different label placements', () => {
    const placements = ['start', 'end', 'top', 'bottom'] as const;
    
    placements.forEach(placement => {
      const { unmount } = render(
        <Switch {...defaultProps} label="Test Label" labelPlacement={placement} />
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('switch')).toBeInTheDocument();
      unmount();
    });
  });

  it('shows status text when showStatus is true', () => {
    render(<Switch {...defaultProps} checked showStatus />);
    
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('shows custom status text', () => {
    const statusFormatter = (checked: boolean) => checked ? 'Enabled' : 'Disabled';
    render(<Switch {...defaultProps} checked showStatus statusFormatter={statusFormatter} />);
    
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });

  it('shows custom labels', () => {
    render(
      <Switch 
        {...defaultProps} 
        checked 
        checkedLabel="Yes" 
        uncheckedLabel="No" 
      />
    );
    
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<Switch {...defaultProps} label="Hidden Label" showLabel={false} />);
    
    expect(screen.queryByText('Hidden Label')).not.toBeInTheDocument();
  });

  it('renders with custom label component', () => {
    const customLabel = <span data-testid="custom-label">Custom Label</span>;
    render(<Switch {...defaultProps} labelComponent={customLabel} />);
    
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });

  it('handles controlled value updates', () => {
    const { rerender } = render(<Switch {...defaultProps} checked={false} />);
    
    expect(screen.getByRole('switch')).not.toBeChecked();
    
    rerender(<Switch {...defaultProps} checked={true} />);
    
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('handles uncontrolled value updates', () => {
    render(<Switch {...defaultProps} defaultChecked={false} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('applies custom className', () => {
    render(<Switch {...defaultProps} className="custom-switch" />);
    
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('custom-switch');
  });

  it('has correct aria-label', () => {
    render(<Switch {...defaultProps} label="Test Switch" />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-label', 'Test Switch');
  });

  it('has default aria-label when no label provided', () => {
    render(<Switch {...defaultProps} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-label', 'switch');
  });

  it('toggles between checked and unchecked states', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Switch {...defaultProps} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    
    // First click - should become checked
    await user.click(switchElement);
    expect(onChange).toHaveBeenCalledWith(true);
    
    // Second click - should become unchecked
    await user.click(switchElement);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('maintains state when controlled', () => {
    const onChange = jest.fn();
    render(<Switch {...defaultProps} checked={true} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
    
    // Clicking should call onChange but not change the visual state
    fireEvent.click(switchElement);
    expect(onChange).toHaveBeenCalledWith(false);
    expect(switchElement).toBeChecked(); // Still checked because it's controlled
  });
});
