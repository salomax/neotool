import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Switch as MuiSwitch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Stack
} from '../../../ui/mui-imports';

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is read-only */
  readOnly?: boolean;
  /** Size of the switch */
  size?: 'small' | 'medium';
  /** Color theme of the switch */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  /** Label for the switch */
  label?: string;
  /** Helper text below the switch */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Label placement */
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  /** Custom label component */
  labelComponent?: React.ReactNode;
  /** Custom checked label */
  checkedLabel?: string;
  /** Custom unchecked label */
  uncheckedLabel?: string;
  /** Whether to show status text */
  showStatus?: boolean;
  /** Custom status formatter */
  statusFormatter?: (checked: boolean) => string;
  /** Callback fired when the state changes */
  onChange?: (checked: boolean) => void;
  /** Custom CSS class name */
  className?: string;
  /** Test identifier */
  'data-testid'?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  readOnly = false,
  size = 'medium',
  color = 'primary',
  label,
  helperText,
  error = false,
  showLabel = true,
  labelPlacement = 'end',
  labelComponent,
  checkedLabel,
  uncheckedLabel,
  showStatus = false,
  statusFormatter = (checked) => checked ? 'On' : 'Off',
  onChange,
  className,
  'data-testid': dataTestId
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled) return;
    
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  }, [readOnly, disabled, isControlled, onChange]);

  const renderLabel = () => {
    if (!showLabel || !label) return null;

    if (labelComponent) {
      return labelComponent;
    }

    return (
      <Typography 
        variant="body2" 
        color={error ? 'error' : 'text.primary'}
        sx={{ 
          fontWeight: 500,
          ...(disabled && { color: 'text.disabled' })
        }}
      >
        {label}
      </Typography>
    );
  };

  const renderStatus = () => {
    if (!showStatus) return null;

    return (
      <Typography 
        variant="caption" 
        color={currentChecked ? 'primary.main' : 'text.secondary'}
        sx={{ 
          fontWeight: 500,
          ...(disabled && { color: 'text.disabled' })
        }}
      >
        {statusFormatter(currentChecked)}
      </Typography>
    );
  };

  const renderCustomLabels = () => {
    if (!checkedLabel && !uncheckedLabel) return null;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography 
          variant="caption" 
          color={!currentChecked ? 'primary.main' : 'text.secondary'}
          sx={{ 
            fontWeight: 500,
            ...(disabled && { color: 'text.disabled' })
          }}
        >
          {uncheckedLabel}
        </Typography>
        <Typography 
          variant="caption" 
          color={currentChecked ? 'primary.main' : 'text.secondary'}
          sx={{ 
            fontWeight: 500,
            ...(disabled && { color: 'text.disabled' })
          }}
        >
          {checkedLabel}
        </Typography>
      </Box>
    );
  };

  const switchElement = (
    <MuiSwitch
      checked={currentChecked}
      disabled={disabled}
      size={size}
      color={color}
      onChange={handleChange}
      inputProps={{ 'aria-label': label || 'switch' }}
      sx={{
        ...(readOnly && {
          '& .MuiSwitch-thumb': {
            cursor: 'default',
          },
          '& .MuiSwitch-track': {
            cursor: 'default',
          },
        }),
      }}
    />
  );

  if (labelPlacement === 'start') {
    return (
      <FormControl 
        fullWidth 
        disabled={disabled}
        error={error}
        {...(className && { className })}
        data-testid={dataTestId}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {renderLabel()}
          <Box>
            {switchElement}
            {renderCustomLabels()}
            {renderStatus()}
          </Box>
        </Stack>
        {helperText && (
          <FormHelperText sx={{ mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  if (labelPlacement === 'top') {
    return (
      <FormControl 
        fullWidth 
        disabled={disabled}
        error={error}
        {...(className && { className })}
        data-testid={dataTestId}
      >
        <Stack spacing={1} alignItems="flex-start">
          {renderLabel()}
          <Box>
            {switchElement}
            {renderCustomLabels()}
            {renderStatus()}
          </Box>
        </Stack>
        {helperText && (
          <FormHelperText sx={{ mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  if (labelPlacement === 'bottom') {
    return (
      <FormControl 
        fullWidth 
        disabled={disabled}
        error={error}
        {...(className && { className })}
        data-testid={dataTestId}
      >
        <Stack spacing={1} alignItems="flex-start">
          <Box>
            {switchElement}
            {renderCustomLabels()}
            {renderStatus()}
          </Box>
          {renderLabel()}
        </Stack>
        {helperText && (
          <FormHelperText sx={{ mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  // Default: labelPlacement === 'end'
  return (
    <FormControl 
      fullWidth 
      disabled={disabled}
      error={error}
      {...(className && { className })}
      data-testid={dataTestId}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box>
          {switchElement}
          {renderCustomLabels()}
          {renderStatus()}
        </Box>
        {renderLabel()}
      </Stack>
      {helperText && (
        <FormHelperText sx={{ mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Switch;
