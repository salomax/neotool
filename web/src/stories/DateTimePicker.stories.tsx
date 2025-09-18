import type { Meta, StoryObj } from '@storybook/react';
import DateTimePicker from '../shared/components/ui/atoms/DateTimePicker';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';
import dayjs from 'dayjs';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/Atoms/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive date and time picker component with various customization options.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'date' },
      description: 'Current value of the date time picker'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the picker is disabled'
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the picker is read-only'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the picker is required'
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the picker'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the picker'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Size of the picker'
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'],
      description: 'Variant of the input'
    },
    showTime: {
      control: { type: 'boolean' },
      description: 'Whether to show time picker'
    },
    showDate: {
      control: { type: 'boolean' },
      description: 'Whether to show date picker'
    },
    showSeconds: {
      control: { type: 'boolean' },
      description: 'Whether to show seconds in time picker'
    },
    use24HourFormat: {
      control: { type: 'boolean' },
      description: 'Whether to use 24-hour format'
    },
    showCalendarIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show calendar icon'
    },
    showClockIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show clock icon'
    },
    disablePast: {
      control: { type: 'boolean' },
      description: 'Whether to disable past dates'
    },
    disableFuture: {
      control: { type: 'boolean' },
      description: 'Whether to disable future dates'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// Interactive wrapper for stories
const DateTimePickerWrapper = (props: any) => {
  const [value, setValue] = useState(props.value ? dayjs(props.value) : null);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <DateTimePicker
        {...props}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    label: 'Select Date & Time',
    helperText: 'Choose your preferred date and time'
  }
};

export const WithValue: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    value: dayjs('2024-01-15T10:30:00'),
    label: 'Appointment Time',
    helperText: 'Scheduled for January 15, 2024 at 10:30 AM'
  }
};

export const DateOnly: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    showDate: true,
    showTime: false,
    label: 'Birth Date',
    placeholder: 'Select your birth date',
    helperText: 'Date of birth'
  }
};

export const TimeOnly: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    showDate: false,
    showTime: true,
    label: 'Meeting Time',
    placeholder: 'Select meeting time',
    helperText: 'When should the meeting start?'
  }
};

export const WithSeconds: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    showSeconds: true,
    label: 'Precise Time',
    helperText: 'Include seconds for precise timing'
  }
};

export const TwelveHourFormat: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    use24HourFormat: false,
    label: 'Event Time',
    helperText: '12-hour format with AM/PM'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small Size
        </Typography>
        <DateTimePickerWrapper
          label="Small picker"
          size="small"
          showTime
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Medium Size
        </Typography>
        <DateTimePickerWrapper
          label="Medium picker"
          size="medium"
          showTime
        />
      </Box>
    </Stack>
  )
};

export const DifferentVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      {(['standard', 'outlined', 'filled'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="subtitle2" gutterBottom>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
          </Typography>
          <DateTimePickerWrapper
            label={`${variant} picker`}
            variant={variant}
            showTime
          />
        </Box>
      ))}
    </Stack>
  )
};

export const WithConstraints: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Disable Past Dates
        </Typography>
        <DateTimePickerWrapper
          label="Future Date Only"
          disablePast
          helperText="Cannot select past dates"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Disable Future Dates
        </Typography>
        <DateTimePickerWrapper
          label="Past Date Only"
          disableFuture
          helperText="Cannot select future dates"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Date Range
        </Typography>
        <DateTimePickerWrapper
          label="Within Range"
          minDateTime={dayjs().subtract(1, 'month')}
          maxDateTime={dayjs().add(1, 'month')}
          helperText="Select date within the last month to next month"
        />
      </Box>
    </Stack>
  )
};

export const WithoutIcons: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    label: 'No Icons',
    showCalendarIcon: false,
    showClockIcon: false,
    helperText: 'Date time picker without icons'
  }
};

export const CustomIcons: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    label: 'Custom Icons',
    calendarIcon: <span>📅</span>,
    clockIcon: <span>🕐</span>,
    helperText: 'Date time picker with custom icons'
  }
};

export const Disabled: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    value: dayjs('2024-01-15T10:30:00'),
    label: 'Disabled Picker',
    disabled: true,
    helperText: 'This picker is disabled'
  }
};

export const ReadOnly: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    value: dayjs('2024-01-15T10:30:00'),
    label: 'Read Only Picker',
    readOnly: true,
    helperText: 'This picker is read-only'
  }
};

export const Error: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    label: 'Required Field',
    required: true,
    error: true,
    errorMessage: 'This field is required',
    helperText: 'Please select a date and time'
  }
};

export const Required: Story = {
  render: (args) => <DateTimePickerWrapper {...args} />,
  args: {
    label: 'Required Field',
    required: true,
    helperText: 'This field is required'
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const [appointmentTime, setAppointmentTime] = useState(dayjs().add(1, 'day').hour(10).minute(30));
    const [meetingTime, setMeetingTime] = useState(dayjs().hour(14).minute(0));
    const [birthDate, setBirthDate] = useState(dayjs('1990-05-15'));

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Appointment Booking System
        </Typography>
        
        <Stack spacing={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Book Appointment
            </Typography>
            <DateTimePicker
              value={appointmentTime}
              onChange={(value) => setAppointmentTime(value)}
              label="Appointment Date & Time"
              showTime
              disablePast
              helperText="Select your preferred appointment time"
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Meeting Schedule
            </Typography>
            <DateTimePicker
              value={meetingTime}
              onChange={(value) => setMeetingTime(value)}
              label="Meeting Time"
              showDate={false}
              showTime
              use24HourFormat={false}
              helperText="When should the meeting start?"
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <DateTimePicker
              value={birthDate}
              onChange={(value) => setBirthDate(value)}
              label="Date of Birth"
              showDate
              showTime={false}
              disableFuture
              helperText="Your date of birth"
            />
          </Paper>
        </Stack>

        <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Selected Values:
          </Typography>
          <pre style={{ margin: 0, fontSize: '12px' }}>
            {JSON.stringify({
              appointmentTime: appointmentTime?.format('YYYY-MM-DD HH:mm'),
              meetingTime: meetingTime?.format('hh:mm A'),
              birthDate: birthDate?.format('YYYY-MM-DD')
            }, null, 2)}
          </pre>
        </Paper>
      </Box>
    );
  }
};
