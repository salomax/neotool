import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Slider as MuiSlider,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Chip
} from '../../../ui/mui-imports';

export interface SliderProps {
  /** Current value(s) of the slider */
  value?: number | number[];
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
  /** Step size for the slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the slider is read-only */
  readOnly?: boolean;
  /** Whether to show value labels */
  showValue?: boolean;
  /** Whether to show value chips */
  showChips?: boolean;
  /** Whether to show min/max labels */
  showMinMax?: boolean;
  /** Whether to show step marks */
  showMarks?: boolean;
  /** Custom marks for the slider */
  marks?: Array<{ value: number; label: string }>;
  /** Orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** Size of the slider */
  size?: 'small' | 'medium';
  /** Color theme of the slider */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /** Whether to use range mode (dual thumbs) */
  range?: boolean;
  /** Label for the slider */
  label?: string;
  /** Helper text below the slider */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Custom value formatter */
  valueFormatter?: (value: number) => string;
  /** Callback fired when the value changes */
  onChange?: (value: number | number[]) => void;
  /** Callback fired when the value change is committed */
  onChangeCommitted?: (value: number | number[]) => void;
  /** Custom CSS class name */
  className?: string;
  /** Test identifier */
  'data-testid'?: string;
}

const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  readOnly = false,
  showValue = true,
  showChips = false,
  showMinMax = false,
  showMarks = false,
  marks = [],
  orientation = 'horizontal',
  size = 'medium',
  color = 'primary',
  range = false,
  label,
  helperText,
  error = false,
  valueFormatter = (val) => val.toString(),
  onChange,
  onChangeCommitted,
  className,
  'data-testid': dataTestId
}) => {
  const [internalValue, setInternalValue] = useState<number | number[]>(
    controlledValue !== undefined ? controlledValue : (range ? [min, max] : min)
  );

  const handleChange = useCallback((event: Event, newValue: number | number[]) => {
    if (readOnly) return;
    
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [readOnly, onChange]);

  const handleChangeCommitted = useCallback((event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    if (readOnly) return;
    
    onChangeCommitted?.(newValue);
  }, [readOnly, onChangeCommitted]);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const isRange = range || Array.isArray(currentValue);

  // Generate marks if showMarks is true and no custom marks provided
  const sliderMarks = showMarks && marks.length === 0 
    ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
        value: min + i * step,
        label: valueFormatter(min + i * step)
      }))
    : marks;

  const renderValue = () => {
    if (!showValue) return null;

    if (isRange && Array.isArray(currentValue)) {
      const [minVal, maxVal] = currentValue;
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {valueFormatter(minVal || 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {valueFormatter(maxVal || 0)}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {valueFormatter(currentValue as number)}
        </Typography>
      </Box>
    );
  };

  const renderChips = () => {
    if (!showChips) return null;

    if (isRange && Array.isArray(currentValue)) {
      const [minVal, maxVal] = currentValue;
      return (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
          <Chip 
            label={valueFormatter(minVal || 0)} 
            size="small" 
            color={color}
            variant="outlined"
          />
          <Chip 
            label={valueFormatter(maxVal || 0)} 
            size="small" 
            color={color}
            variant="filled"
          />
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Chip 
          label={valueFormatter(currentValue as number)} 
          size="small" 
          color={color}
          variant="filled"
        />
      </Box>
    );
  };

  const renderMinMaxLabels = () => {
    if (!showMinMax) return null;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {valueFormatter(min)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {valueFormatter(max)}
        </Typography>
      </Box>
    );
  };

  return (
    <FormControl 
      fullWidth={orientation !== 'vertical'}
      disabled={disabled}
      error={error}
      {...(className && { className })}
      data-testid={dataTestId}
      sx={{
        ...(orientation === 'vertical' && {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'auto',
          height: '100%'
        })
      }}
    >
      {label && (
        <FormLabel sx={{ 
          mb: orientation === 'vertical' ? 0 : 1,
          ...(orientation === 'vertical' && {
            marginBottom: 1,
            textAlign: 'center'
          })
        }}>
          {label}
        </FormLabel>
      )}
      
      <Box sx={{ 
        px: orientation === 'vertical' ? 0 : 1,
        ...(orientation === 'vertical' && {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%'
        })
      }}>
        {renderValue()}
        {renderChips()}
        
        <MuiSlider
          value={currentValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          marks={sliderMarks}
          orientation={orientation}
          size={size}
          color={color}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="off"
          sx={{
            ...(orientation === 'vertical' && {
              height: 200,
              '& .MuiSlider-track': {
                width: 4,
              },
              '& .MuiSlider-rail': {
                width: 4,
              },
            }),
            ...(readOnly && {
              '& .MuiSlider-thumb': {
                cursor: 'default',
              },
              '& .MuiSlider-track': {
                cursor: 'default',
              },
            }),
          }}
        />
        
        {renderMinMaxLabels()}
      </Box>
      
      {helperText && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Slider;
