import type { Meta, StoryObj } from '@storybook/react';
import Rating from '../shared/components/ui/atoms/Rating';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof Rating> = {
  title: 'Components/Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible rating component with multiple variants, sizes, and customization options. Supports stars, thumbs, hearts, and emojis with half-precision ratings.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Current rating value'
    },
    max: {
      control: 'number',
      description: 'Maximum rating value'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the rating icons'
    },
    variant: {
      control: 'select',
      options: ['star', 'thumbs', 'heart', 'emoji'],
      description: 'Visual variant of the rating'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Color theme of the rating'
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating is read-only'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the rating is disabled'
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels on hover'
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the current value'
    },
    precision: {
      control: 'select',
      options: [1, 0.5],
      description: 'Precision of the rating (1 for whole numbers, 0.5 for half ratings)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Rating>;

// Interactive example component
const InteractiveExample = () => {
  const [rating, setRating] = useState(0);
  const [variant, setVariant] = useState<'star' | 'thumbs' | 'heart' | 'emoji'>('star');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [color, setColor] = useState<'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>('primary');

  return (
    <Box>
      <Stack spacing={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Interactive Rating</Typography>
          <Rating
            value={rating}
            onChange={setRating}
            variant={variant}
            size={size}
            color={color}
            showLabels
            showValue
            precision={0.5}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Current rating: {rating}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Controls</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Box>
              <Typography variant="subtitle2">Variant:</Typography>
              {(['star', 'thumbs', 'heart', 'emoji'] as const).map((v) => (
                <label key={v} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name="variant"
                    value={v}
                    checked={variant === v}
                    onChange={(e) => setVariant(e.target.value as any)}
                    style={{ marginRight: '8px' }}
                  />
                  {v}
                </label>
              ))}
            </Box>
            <Box>
              <Typography variant="subtitle2">Size:</Typography>
              {(['small', 'medium', 'large'] as const).map((s) => (
                <label key={s} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={(e) => setSize(e.target.value as any)}
                    style={{ marginRight: '8px' }}
                  />
                  {s}
                </label>
              ))}
            </Box>
            <Box>
              <Typography variant="subtitle2">Color:</Typography>
              {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
                <label key={c} style={{ display: 'block', margin: '4px 0' }}>
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={(e) => setColor(e.target.value as any)}
                    style={{ marginRight: '8px' }}
                  />
                  {c}
                </label>
              ))}
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export const Default: Story = {
  args: {
    value: 3,
    max: 5
  }
};

export const WithValue: Story = {
  args: {
    value: 4,
    max: 5,
    showValue: true
  }
};

export const WithLabels: Story = {
  args: {
    value: 2,
    max: 5,
    showLabels: true
  }
};

export const HalfPrecision: Story = {
  args: {
    value: 3.5,
    max: 5,
    precision: 0.5,
    showValue: true
  }
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    max: 5,
    readOnly: true,
    showValue: true
  }
};

export const Disabled: Story = {
  args: {
    value: 2,
    max: 5,
    disabled: true,
    showValue: true
  }
};

export const StarVariant: Story = {
  args: {
    value: 4,
    max: 5,
    variant: 'star',
    showValue: true,
    showLabels: true
  }
};

export const ThumbsVariant: Story = {
  args: {
    value: 1,
    max: 2,
    variant: 'thumbs',
    showValue: true,
    showLabels: true
  }
};

export const HeartVariant: Story = {
  args: {
    value: 3,
    max: 5,
    variant: 'heart',
    showValue: true,
    showLabels: true
  }
};

export const EmojiVariant: Story = {
  args: {
    value: 4,
    max: 5,
    variant: 'emoji',
    showValue: true,
    showLabels: true
  }
};

export const SmallSize: Story = {
  args: {
    value: 3,
    max: 5,
    size: 'small',
    showValue: true
  }
};

export const LargeSize: Story = {
  args: {
    value: 3,
    max: 5,
    size: 'large',
    showValue: true
  }
};

export const DifferentColors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Primary</Typography>
        <Rating value={3} max={5} color="primary" showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Secondary</Typography>
        <Rating value={3} max={5} color="secondary" showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Error</Typography>
        <Rating value={3} max={5} color="error" showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Warning</Typography>
        <Rating value={3} max={5} color="warning" showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Info</Typography>
        <Rating value={3} max={5} color="info" showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Success</Typography>
        <Rating value={3} max={5} color="success" showValue />
      </Box>
    </Stack>
  )
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>Star Rating</Typography>
        <Rating value={4} max={5} variant="star" showValue showLabels />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Thumbs Rating</Typography>
        <Rating value={1} max={2} variant="thumbs" showValue showLabels />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Heart Rating</Typography>
        <Rating value={3} max={5} variant="heart" showValue showLabels />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Emoji Rating</Typography>
        <Rating value={4} max={5} variant="emoji" showValue showLabels />
      </Box>
    </Stack>
  )
};

export const Interactive: Story = {
  render: () => <InteractiveExample />
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 10,
    showValue: true,
    showLabels: true
  }
};

export const HalfRatings: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>2.5 Stars</Typography>
        <Rating value={2.5} max={5} precision={0.5} showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>3.5 Stars</Typography>
        <Rating value={3.5} max={5} precision={0.5} showValue />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>4.5 Stars</Typography>
        <Rating value={4.5} max={5} precision={0.5} showValue />
      </Box>
    </Stack>
  )
};
