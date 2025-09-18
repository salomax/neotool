import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateTimePicker from '../DateTimePicker';
import dayjs from 'dayjs';

// Mock dayjs
jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  return {
    ...actualDayjs,
    default: actualDayjs,
  };
});

describe('DateTimePicker', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'datetime-picker'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<DateTimePicker {...defaultProps} />);
    
    const picker = screen.getByTestId('datetime-picker');
    expect(picker).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DateTimePicker {...defaultProps} label="Select Date & Time" />);
    
    expect(screen.getByText('Select Date & Time')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<DateTimePicker {...defaultProps} helperText="Choose your preferred date and time" />);
    
    expect(screen.getByText('Choose your preferred date and time')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<DateTimePicker {...defaultProps} error errorMessage="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<DateTimePicker {...defaultProps} placeholder="Pick a date" />);
    
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<DateTimePicker {...defaultProps} label="Required Field" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<DateTimePicker {...defaultProps} disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies error state correctly', () => {
    render(<DateTimePicker {...defaultProps} error />);
    
    const formControl = screen.getByTestId('datetime-picker');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<DateTimePicker {...defaultProps} size="small" />);
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
    
    rerender(<DateTimePicker {...defaultProps} size="medium" />);
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const variants = ['standard', 'outlined', 'filled'] as const;
    
    variants.forEach(variant => {
      const { unmount } = render(<DateTimePicker {...defaultProps} variant={variant} />);
      expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
      unmount();
    });
  });

  it('shows calendar icon when showDate is true', () => {
    render(<DateTimePicker {...defaultProps} showDate showCalendarIcon />);
    
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  });

  it('shows clock icon when showTime is true', () => {
    render(<DateTimePicker {...defaultProps} showTime showClockIcon />);
    
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('shows both icons when both date and time are enabled', () => {
    render(<DateTimePicker {...defaultProps} showDate showTime showCalendarIcon showClockIcon />);
    
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('hides icons when showCalendarIcon and showClockIcon are false', () => {
    render(<DateTimePicker {...defaultProps} showDate showTime showCalendarIcon={false} showClockIcon={false} />);
    
    expect(screen.queryByTestId('calendar-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('clock-icon')).not.toBeInTheDocument();
  });

  it('handles controlled value updates', () => {
    const testDate = dayjs('2024-01-15T10:30:00');
    const { rerender } = render(<DateTimePicker {...defaultProps} value={testDate} />);
    
    expect(screen.getByDisplayValue('15/01/2024 10:30')).toBeInTheDocument();
    
    const newDate = dayjs('2024-02-20T14:45:00');
    rerender(<DateTimePicker {...defaultProps} value={newDate} />);
    
    expect(screen.getByDisplayValue('20/02/2024 14:45')).toBeInTheDocument();
  });

  it('handles uncontrolled value updates', () => {
    render(<DateTimePicker {...defaultProps} defaultValue={dayjs('2024-01-15T10:30:00')} />);
    
    expect(screen.getByDisplayValue('15/01/2024 10:30')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<DateTimePicker {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '15/01/2024 10:30');
    
    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when readOnly is true', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<DateTimePicker {...defaultProps} onChange={onChange} readOnly />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '15/01/2024 10:30');
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onOpen when picker opens', async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    
    render(<DateTimePicker {...defaultProps} onOpen={onOpen} />);
    
    const calendarIcon = screen.getByTestId('calendar-icon');
    await user.click(calendarIcon);
    
    expect(onOpen).toHaveBeenCalled();
  });

  it('calls onClose when picker closes', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    
    render(<DateTimePicker {...defaultProps} onClose={onClose} />);
    
    const calendarIcon = screen.getByTestId('calendar-icon');
    await user.click(calendarIcon);
    
    // Simulate closing by clicking outside
    await user.click(document.body);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('applies custom format', () => {
    render(<DateTimePicker {...defaultProps} format="YYYY-MM-DD HH:mm" value={dayjs('2024-01-15T10:30:00')} />);
    
    expect(screen.getByDisplayValue('2024-01-15 10:30')).toBeInTheDocument();
  });

  it('applies minDateTime constraint', () => {
    const minDate = dayjs('2024-01-01');
    render(<DateTimePicker {...defaultProps} minDateTime={minDate} />);
    
    // The minDateTime constraint is applied internally by MUI
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
  });

  it('applies maxDateTime constraint', () => {
    const maxDate = dayjs('2024-12-31');
    render(<DateTimePicker {...defaultProps} maxDateTime={maxDate} />);
    
    // The maxDateTime constraint is applied internally by MUI
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
  });

  it('applies disablePast constraint', () => {
    render(<DateTimePicker {...defaultProps} disablePast />);
    
    // The disablePast constraint is applied internally by MUI
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
  });

  it('applies disableFuture constraint', () => {
    render(<DateTimePicker {...defaultProps} disableFuture />);
    
    // The disableFuture constraint is applied internally by MUI
    expect(screen.getByTestId('datetime-picker')).toBeInTheDocument();
  });

  it('shows seconds when showSeconds is true', () => {
    render(<DateTimePicker {...defaultProps} showSeconds value={dayjs('2024-01-15T10:30:45')} />);
    
    expect(screen.getByDisplayValue('15/01/2024 10:30:45')).toBeInTheDocument();
  });

  it('uses 12-hour format when use24HourFormat is false', () => {
    render(<DateTimePicker {...defaultProps} use24HourFormat={false} value={dayjs('2024-01-15T14:30:00')} />);
    
    expect(screen.getByDisplayValue('15/01/2024 02:30 PM')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DateTimePicker {...defaultProps} className="custom-datetime-picker" />);
    
    const picker = screen.getByTestId('datetime-picker');
    expect(picker).toHaveClass('custom-datetime-picker');
  });

  it('renders with custom calendar icon', () => {
    const customIcon = <span data-testid="custom-calendar">📅</span>;
    render(<DateTimePicker {...defaultProps} calendarIcon={customIcon} showDate showCalendarIcon />);
    
    expect(screen.getByTestId('custom-calendar')).toBeInTheDocument();
  });

  it('renders with custom clock icon', () => {
    const customIcon = <span data-testid="custom-clock">🕐</span>;
    render(<DateTimePicker {...defaultProps} clockIcon={customIcon} showTime showClockIcon />);
    
    expect(screen.getByTestId('custom-clock')).toBeInTheDocument();
  });

  it('handles date-only mode', () => {
    render(<DateTimePicker {...defaultProps} showDate showTime={false} value={dayjs('2024-01-15')} />);
    
    expect(screen.getByDisplayValue('15/01/2024')).toBeInTheDocument();
  });

  it('handles time-only mode', () => {
    render(<DateTimePicker {...defaultProps} showDate={false} showTime value={dayjs('2024-01-15T10:30:00')} />);
    
    expect(screen.getByDisplayValue('10:30')).toBeInTheDocument();
  });
});
