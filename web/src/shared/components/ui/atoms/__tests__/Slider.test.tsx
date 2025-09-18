import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Slider from '../Slider';

describe('Slider', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'slider'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Slider {...defaultProps} />);
    
    const slider = screen.getByTestId('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Slider {...defaultProps} label="Volume" />);
    
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Slider {...defaultProps} helperText="Adjust the volume" />);
    
    expect(screen.getByText('Adjust the volume')).toBeInTheDocument();
  });

  it('shows current value when showValue is true', () => {
    render(<Slider {...defaultProps} value={50} showValue />);
    
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('shows value chips when showChips is true', () => {
    render(<Slider {...defaultProps} value={75} showChips />);
    
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('shows min/max labels when showMinMax is true', () => {
    render(<Slider {...defaultProps} min={0} max={100} showMinMax />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles range mode', () => {
    render(<Slider {...defaultProps} value={[20, 80]} range showValue />);
    
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('handles range mode with chips', () => {
    render(<Slider {...defaultProps} value={[30, 70]} range showChips />);
    
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Slider {...defaultProps} onChange={onChange} />);
    
    const slider = screen.getByRole('slider');
    await user.click(slider);
    
    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when readOnly is true', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Slider {...defaultProps} onChange={onChange} readOnly />);
    
    const slider = screen.getByRole('slider');
    await user.click(slider);
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(<Slider {...defaultProps} disabled />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });

  it('applies error state correctly', () => {
    render(<Slider {...defaultProps} error />);
    
    const formControl = screen.getByTestId('slider');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('uses custom value formatter', () => {
    const formatter = (value: number) => `$${value}`;
    render(<Slider {...defaultProps} value={50} showValue valueFormatter={formatter} />);
    
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('renders with custom marks', () => {
    const marks = [
      { value: 0, label: 'Low' },
      { value: 50, label: 'Medium' },
      { value: 100, label: 'High' }
    ];
    
    render(<Slider {...defaultProps} marks={marks} showMarks />);
    
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders with different orientations', () => {
    const { rerender } = render(<Slider {...defaultProps} orientation="horizontal" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
    
    rerender(<Slider {...defaultProps} orientation="vertical" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Slider {...defaultProps} size="small" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
    
    rerender(<Slider {...defaultProps} size="medium" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
    
    colors.forEach(color => {
      const { unmount } = render(<Slider {...defaultProps} color={color} />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
      unmount();
    });
  });

  it('handles step changes', () => {
    render(<Slider {...defaultProps} step={5} min={0} max={100} showMarks />);
    
    // Should show marks at 0, 5, 10, 15, etc.
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onChangeCommitted when value change is committed', () => {
    const onChangeCommitted = jest.fn();
    
    render(<Slider {...defaultProps} onChangeCommitted={onChangeCommitted} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.mouseUp(slider);
    
    expect(onChangeCommitted).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Slider {...defaultProps} className="custom-slider" />);
    
    const slider = screen.getByTestId('slider');
    expect(slider).toHaveClass('custom-slider');
  });

  it('handles controlled value updates', () => {
    const { rerender } = render(<Slider {...defaultProps} value={20} />);
    
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '20');
    
    rerender(<Slider {...defaultProps} value={40} />);
    
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  });

  it('handles uncontrolled value updates', () => {
    render(<Slider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });
});
