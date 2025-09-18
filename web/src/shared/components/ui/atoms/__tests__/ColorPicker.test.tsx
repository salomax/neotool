import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorPicker from '../ColorPicker';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

describe('ColorPicker', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'color-picker'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<ColorPicker {...defaultProps} />);
    
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });

  it('renders with custom value', () => {
    render(<ColorPicker {...defaultProps} value="#FF0000" />);
    
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<ColorPicker {...defaultProps} label="Choose Color" />);
    
    expect(screen.getByText('Choose Color')).toBeInTheDocument();
  });

  it('opens popover when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Preset Colors')).toBeInTheDocument();
  });

  it('does not open popover when disabled', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} disabled />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.queryByText('Preset Colors')).not.toBeInTheDocument();
  });

  it('does not open popover when readOnly', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} readOnly />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.queryByText('Preset Colors')).not.toBeInTheDocument();
  });

  it('calls onChange when preset color is selected', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const redPreset = screen.getByTestId('preset-color-#FF0000');
    await user.click(redPreset);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('validates hex color input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const input = screen.getByPlaceholderText('#000000');
    await user.type(input, 'invalid-color');
    
    expect(screen.getByText('Invalid color format')).toBeInTheDocument();
  });

  it('accepts valid hex color input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const input = screen.getByPlaceholderText('#000000');
    await user.type(input, '#FF0000');
    
    expect(screen.queryByText('Invalid color format')).not.toBeInTheDocument();
  });

  it('handles Enter key press in input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const input = screen.getByPlaceholderText('#000000');
    await user.type(input, '#FF0000');
    await user.keyboard('{Enter}');
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('handles RGB color input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput showRgbInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Change format to RGB
    const formatSelect = screen.getByLabelText('Format');
    await user.click(formatSelect);
    await user.click(screen.getByText('RGB'));
    
    const input = screen.getByPlaceholderText('rgb(0, 0, 0)');
    await user.type(input, 'rgb(255, 0, 0)');
    await user.keyboard('{Enter}');
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('handles HSL color input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput showHslInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Change format to HSL
    const formatSelect = screen.getByLabelText('Format');
    await user.click(formatSelect);
    await user.click(screen.getByText('HSL'));
    
    const input = screen.getByPlaceholderText('hsl(0, 0%, 0%)');
    await user.type(input, 'hsl(0, 100%, 50%)');
    await user.keyboard('{Enter}');
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('copies color to clipboard', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} value="#FF0000" />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    await user.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#FF0000');
  });

  it('generates random color', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const randomButton = screen.getByRole('button', { name: /random/i });
    await user.click(randomButton);
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('closes popover when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Preset Colors')).toBeInTheDocument();
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);
    
    expect(screen.queryByText('Preset Colors')).not.toBeInTheDocument();
  });

  it('applies color when apply button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const redPreset = screen.getByTestId('preset-color-#FF0000');
    await user.click(redPreset);
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    await user.click(applyButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('renders different variants', () => {
    const { rerender } = render(<ColorPicker {...defaultProps} variant="standard" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    
    rerender(<ColorPicker {...defaultProps} variant="outlined" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    
    rerender(<ColorPicker {...defaultProps} variant="filled" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<ColorPicker {...defaultProps} size="small" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    
    rerender(<ColorPicker {...defaultProps} size="medium" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    
    rerender(<ColorPicker {...defaultProps} size="large" />);
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  });

  it('hides presets when showPresets is false', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showPresets={false} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.queryByText('Preset Colors')).not.toBeInTheDocument();
  });

  it('hides custom input when showCustomInput is false', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} showCustomInput={false} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.queryByPlaceholderText('#000000')).not.toBeInTheDocument();
  });

  it('shows current color information', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} value="#FF0000" showRgbInput showHslInput />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
    expect(screen.getByText('rgb(255, 0, 0)')).toBeInTheDocument();
    expect(screen.getByText('hsl(0, 100%, 50%)')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ColorPicker {...defaultProps} className="custom-color-picker" />);
    
    expect(screen.getByTestId('color-picker')).toHaveClass('custom-color-picker');
  });

  it('renders with custom test id', () => {
    render(<ColorPicker {...defaultProps} data-testid="custom-color-picker" />);
    
    expect(screen.getByTestId('custom-color-picker')).toBeInTheDocument();
  });

  it('shows helper text when provided', () => {
    render(<ColorPicker {...defaultProps} helperText="Choose a color for your theme" />);
    
    expect(screen.getByText('Choose a color for your theme')).toBeInTheDocument();
  });

  it('shows error state when error is true', () => {
    render(<ColorPicker {...defaultProps} error />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('Mui-error');
  });

  it('uses custom presets when provided', async () => {
    const customPresets = ['#FF0000', '#00FF00', '#0000FF'];
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} presets={customPresets} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    customPresets.forEach(color => {
      expect(screen.getByTestId(`preset-color-${color}`)).toBeInTheDocument();
    });
  });
});
