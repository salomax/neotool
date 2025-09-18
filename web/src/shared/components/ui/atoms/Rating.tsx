import React, { useState, useCallback } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '../../../ui/mui-imports';
import {
  StarIcon,
  StarBorderIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  ThumbUpOutlinedIcon,
  ThumbDownOutlinedIcon,
  FavoriteIcon,
  FavoriteBorderIcon,
  EmojiEmotionsIcon,
  EmojiEmotionsOutlinedIcon
} from '../../../ui/mui-imports';

export interface RatingProps {
  value?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'star' | 'thumbs' | 'heart' | 'emoji';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  readOnly?: boolean;
  disabled?: boolean;
  showLabels?: boolean;
  showValue?: boolean;
  precision?: number;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  onLeave?: () => void;
  className?: string;
  'data-testid'?: string;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  size = 'medium',
  variant = 'star',
  color = 'primary',
  readOnly = false,
  disabled = false,
  showLabels = false,
  showValue = false,
  precision = 1,
  onChange,
  onHover,
  onLeave,
  className,
  'data-testid': testId
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  // Update internal value when prop value changes
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;
  const isInteractive = !readOnly && !disabled;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '1.2rem', padding: '4px' };
      case 'large':
        return { fontSize: '2.5rem', padding: '8px' };
      default:
        return { fontSize: '1.8rem', padding: '6px' };
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'secondary':
        return { color: 'secondary.main' };
      case 'error':
        return { color: 'error.main' };
      case 'warning':
        return { color: 'warning.main' };
      case 'info':
        return { color: 'info.main' };
      case 'success':
        return { color: 'success.main' };
      default:
        return { color: 'primary.main' };
    }
  };

  const getIcon = (index: number) => {
    const isFilled = index < displayValue;
    const isHalfFilled = precision === 0.5 && index === Math.floor(displayValue) && displayValue % 1 !== 0;

    switch (variant) {
      case 'thumbs':
        // For thumbs: index 0 = like, index 1 = dislike
        if (index === 0) {
          // Like button - show filled when value is 1 (like selected) or when hovering over it
          const shouldShowFilled = displayValue === 1 || (hoverValue !== null && hoverValue === 1);
          return shouldShowFilled ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />;
        } else {
          // Dislike button - show filled when value is 0 (dislike selected) or when hovering over it
          const shouldShowFilled = displayValue === 0 || (hoverValue !== null && hoverValue === 0);
          return shouldShowFilled ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />;
        }
      case 'heart':
        return isFilled ? <FavoriteIcon /> : <FavoriteBorderIcon />;
      case 'emoji':
        return isFilled ? <EmojiEmotionsIcon /> : <EmojiEmotionsOutlinedIcon />;
      default:
        return isFilled ? <StarIcon /> : <StarBorderIcon />;
    }
  };

  const getLabel = (index: number) => {
    if (!showLabels) return '';
    
    const labels = {
      star: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      thumbs: ['Like', 'Dislike'],
      heart: ['No Love', 'Little Love', 'Some Love', 'Much Love', 'True Love'],
      emoji: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']
    };

    const labelArray = labels[variant] || labels.star;
    return labelArray[index] || '';
  };

  const handleClick = useCallback((clickedValue: number) => {
    if (!isInteractive) return;
    
    let newValue;
    
    if (variant === 'thumbs') {
      // Special logic for thumbs rating
      if (clickedValue === 1) {
        // Clicking like (index 0) - set to 1 if not already 1, otherwise 0
        newValue = currentValue === 1 ? 0 : 1;
      } else if (clickedValue === 2) {
        // Clicking dislike (index 1) - set to 0 if not already 0, otherwise 0
        newValue = 0;
      } else {
        newValue = 0;
      }
    } else {
      // Standard logic for other rating types
      newValue = clickedValue === currentValue ? 0 : clickedValue;
    }
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  }, [isInteractive, currentValue, isControlled, onChange, variant]);

  const handleMouseEnter = useCallback((hoveredValue: number) => {
    if (!isInteractive) return;
    
    let mappedHoverValue = hoveredValue;
    
    if (variant === 'thumbs') {
      // For thumbs: map index to correct values
      // index 0 (like) -> hoverValue 1
      // index 1 (dislike) -> hoverValue 0
      mappedHoverValue = hoveredValue === 1 ? 1 : 0;
    }
    
    setHoverValue(mappedHoverValue);
    setIsHovering(true);
    onHover?.(mappedHoverValue);
  }, [isInteractive, onHover, variant]);

  const handleMouseLeave = useCallback(() => {
    if (!isInteractive) return;
    
    setHoverValue(null);
    setIsHovering(false);
    onLeave?.();
  }, [isInteractive, onLeave]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, clickedValue: number) => {
    if (!isInteractive) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(clickedValue);
    }
  }, [isInteractive, handleClick]);

  const renderRatingItem = (index: number) => {
    const isFilled = index < displayValue;
    const isHalfFilled = precision === 0.5 && index === Math.floor(displayValue) && displayValue % 1 !== 0;
    
    return (
      <Tooltip 
        key={index} 
        title={showLabels ? getLabel(index) : ''} 
        placement="top"
        disableHoverListener={!showLabels}
        PopperProps={{
          sx: {
            zIndex: 1300, // Ensure tooltip appears above other elements
          }
        }}
      >
        <IconButton
          size={size}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, index + 1)}
          disabled={disabled}
          tabIndex={isInteractive ? 0 : -1}
          data-testid={`rating-item-${index}`}
          sx={{
            ...getSizeStyles(),
            ...getColorStyles(),
            opacity: disabled ? 0.5 : 1,
            cursor: isInteractive ? 'pointer' : 'default',
            transition: 'color 0.2s ease-in-out, transform 0.1s ease-in-out',
            '&:hover': isInteractive ? {
              transform: 'scale(1.05)',
              opacity: 0.8
            } : {},
            '&:focus': isInteractive ? {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px'
            } : {}
          }}
        >
          {getIcon(index)}
        </IconButton>
      </Tooltip>
    );
  };

  const renderHalfRating = (index: number) => {
    const isFilled = index < Math.floor(displayValue);
    const isHalfFilled = precision === 0.5 && index === Math.floor(displayValue) && displayValue % 1 !== 0;
    
    return (
      <Tooltip 
        key={index} 
        title={showLabels ? getLabel(index) : ''} 
        placement="top"
        disableHoverListener={!showLabels}
        PopperProps={{
          sx: {
            zIndex: 1300, // Ensure tooltip appears above other elements
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            ...getSizeStyles()
          }}
        >
          {/* Background (empty) */}
          <IconButton
            size={size}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, index + 1)}
            disabled={disabled}
            tabIndex={isInteractive ? 0 : -1}
            data-testid={`rating-item-${index}`}
            sx={{
              ...getSizeStyles(),
              color: 'grey.300',
              opacity: disabled ? 0.5 : 1,
              cursor: isInteractive ? 'pointer' : 'default',
              transition: 'color 0.2s ease-in-out, transform 0.1s ease-in-out',
              '&:hover': isInteractive ? {
                transform: 'scale(1.05)',
                opacity: 0.8
              } : {},
              '&:focus': isInteractive ? {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px'
              } : {}
            }}
          >
            {getIcon(index)}
          </IconButton>
          
          {/* Half filled overlay */}
          {isHalfFilled && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none'
              }}
            >
              <IconButton
                size={size}
                disabled
                sx={{
                  ...getSizeStyles(),
                  ...getColorStyles(),
                  pointerEvents: 'none'
                }}
              >
                {getIcon(index)}
              </IconButton>
            </Box>
          )}
          
          {/* Fully filled overlay */}
          {isFilled && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none'
              }}
            >
              <IconButton
                size={size}
                disabled
                sx={{
                  ...getSizeStyles(),
                  ...getColorStyles(),
                  pointerEvents: 'none'
                }}
              >
                {getIcon(index)}
              </IconButton>
            </Box>
          )}
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box
      className={className}
      data-testid={testId}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        minHeight: '48px', // Prevent layout shifts
        position: 'relative'
      }}
    >
      <Stack 
        direction="row" 
        spacing={0.5} 
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 1
        }}
      >
        {Array.from({ length: max }, (_, index) => 
          precision === 0.5 ? renderHalfRating(index) : renderRatingItem(index)
        )}
      </Stack>
      
      {showValue && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            ml: 1,
            minWidth: '60px', // Prevent layout shifts
            textAlign: 'left'
          }}
        >
          {displayValue.toFixed(precision === 0.5 ? 1 : 0)}/{max}
        </Typography>
      )}
      
      {showLabels && (
        <Typography 
          variant="body2" 
          color={isHovering && hoverValue !== null ? "primary.main" : "transparent"}
          sx={{ 
            ml: 1, 
            fontWeight: 'medium',
            minWidth: '120px', // Always reserve space
            textAlign: 'left',
            transition: 'color 0.2s ease-in-out',
            visibility: isHovering && hoverValue !== null ? 'visible' : 'hidden'
          }}
        >
          {isHovering && hoverValue !== null ? getLabel(hoverValue - 1) : 'Placeholder'}
        </Typography>
      )}
    </Box>
  );
};

export default Rating;
