"use client";

import React from "react";
import { 
  Box, 
  Typography, 
  Button,
  TextField,
  Avatar,
  Badge,
  Chip,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  DialogActions,
  Paper,
  UploadIcon,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  IconButton,
  VisibilityIcon as VisibilityIconMUI,
  VisibilityOffIcon,
  SearchIcon,
  Tooltip,
  Link as MuiLink,
  CircularProgress,
  Skeleton,
  DatePicker,
  LocalizationProvider,
  AdapterDayjs,
  FilterListIcon
} from "../../../../shared/ui/mui-imports";
import dayjs from 'dayjs';
import { maskCEP, maskCNPJ, maskCPF, maskPhoneBR } from '../../../../features/forms/components/masks/br';
import { DatePickerField } from '../../../../shared/components/ui/atoms/form/DatePickers';
import { Drawer } from '../../../../shared/components/ui/atoms/Drawer';
import { Chart } from '../../../../shared/components/ui/molecules/Chart';
import RichTextEditor from '../../../../shared/components/ui/molecules/RichTextEditor';
import Rating from '../../../../shared/components/ui/atoms/Rating';
import ColorPicker from '../../../../shared/components/ui/atoms/ColorPicker';
import Slider from '../../../../shared/components/ui/atoms/Slider';
import Switch from '../../../../shared/components/ui/atoms/Switch';
import DateTimePicker from '../../../../shared/components/ui/atoms/DateTimePicker';
import ImageUpload from '../../../../shared/components/ui/atoms/ImageUpload';
import ProgressBar from '../../../../shared/components/ui/atoms/ProgressBar';
import { FormProvider, useForm } from 'react-hook-form';

// Controlled Rating component for interactive examples
const ControlledRating: React.FC<{
  value: number;
  max: number;
  variant?: 'star' | 'thumbs' | 'heart' | 'emoji';
  showValue?: boolean;
  showLabels?: boolean;
  precision?: number;
}> = ({ value: initialValue, max, variant = 'star', showValue = false, showLabels = false, precision = 1 }) => {
  const [ratingValue, setRatingValue] = React.useState(initialValue);
  
  return (
    <Rating
      value={ratingValue}
      max={max}
      variant={variant}
      showValue={showValue}
      showLabels={showLabels}
      precision={precision}
      onChange={(value: number) => {
        console.log('Rating changed:', value);
        setRatingValue(value);
      }}
    />
  );
};

// Controlled ColorPicker component for interactive examples
const ControlledColorPicker: React.FC<{
  value: string;
  label?: string;
  showPresets?: boolean;
  showCustomInput?: boolean;
  showHexInput?: boolean;
  showRgbInput?: boolean;
  showHslInput?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}> = ({ 
  value: initialValue, 
  label = 'Choose Color',
  showPresets = true,
  showCustomInput = true,
  showHexInput = true,
  showRgbInput = false,
  showHslInput = false,
  variant = 'standard',
  size = 'medium'
}) => {
  const [colorValue, setColorValue] = React.useState(initialValue);
  
  return (
    <ColorPicker
      value={colorValue}
      onChange={(color: string) => {
        console.log('Color changed:', color);
        setColorValue(color);
      }}
      label={label}
      showPresets={showPresets}
      showCustomInput={showCustomInput}
      showHexInput={showHexInput}
      showRgbInput={showRgbInput}
      showHslInput={showHslInput}
      variant={variant}
      size={size}
    />
  );
};

// Controlled Slider component for interactive examples
const ControlledSlider: React.FC<{
  value: number | number[];
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  label?: string;
  helperText?: string;
  showValue?: boolean;
  showChips?: boolean;
  showMarks?: boolean;
  showMinMax?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  readOnly?: boolean;
}> = ({ 
  value: initialValue, 
  min = 0,
  max = 100,
  step = 1,
  range = false,
  label = 'Slider',
  helperText = '',
  showValue = true,
  showChips = false,
  showMarks = false,
  showMinMax = false,
  orientation = 'horizontal',
  size = 'medium',
  color = 'primary',
  disabled = false,
  readOnly = false
}) => {
  const [sliderValue, setSliderValue] = React.useState(initialValue);
  
  return (
    <Slider
      value={sliderValue}
      onChange={(value: number | number[]) => {
        console.log('Slider changed:', value);
        setSliderValue(value);
      }}
      min={min}
      max={max}
      step={step}
      range={range}
      label={label}
      helperText={helperText}
      showValue={showValue}
      showChips={showChips}
      showMarks={showMarks}
      showMinMax={showMinMax}
      orientation={orientation}
      size={size}
      color={color}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

// Interactive Drawer Example Component
const DrawerExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click the button to open the drawer
      </Typography>
      <Button 
        variant="outlined" 
        size="small"
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </Button>
      
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Navigation"
        showCloseButton={true}
        variant="temporary"
        anchor="left"
        width={280}
      >
        <List>
          <ListItem>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Drawer with Title Example
const DrawerWithTitleExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Drawer with custom title and close button
      </Typography>
      <Button 
        variant="outlined" 
        size="small"
        onClick={() => setOpen(true)}
      >
        Open Drawer with Title
      </Button>
      
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="My Application"
        showCloseButton={true}
        showMenuButton={false}
        variant="temporary"
        anchor="left"
        width={300}
      >
        <List>
          <ListItem>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Different Anchors Example
const DrawerAnchorsExample = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [topOpen, setTopOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  return (
    <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Try different drawer positions
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button variant="outlined" size="small" onClick={() => setLeftOpen(true)}>
          Left Drawer
        </Button>
        <Button variant="outlined" size="small" onClick={() => setRightOpen(true)}>
          Right Drawer
        </Button>
        <Button variant="outlined" size="small" onClick={() => setTopOpen(true)}>
          Top Drawer
        </Button>
        <Button variant="outlined" size="small" onClick={() => setBottomOpen(true)}>
          Bottom Drawer
        </Button>
      </Box>
      
      {/* Left Drawer */}
      <Drawer
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        title="Left Panel"
        showCloseButton={true}
        variant="temporary"
        anchor="left"
        width={280}
      >
        <List>
          <ListItem><ListItemText primary="Left Menu Item 1" /></ListItem>
          <ListItem><ListItemText primary="Left Menu Item 2" /></ListItem>
        </List>
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        open={rightOpen}
        onClose={() => setRightOpen(false)}
        title="Right Panel"
        showCloseButton={true}
        variant="temporary"
        anchor="right"
        width={320}
      >
        <List>
          <ListItem><ListItemText primary="Right Menu Item 1" /></ListItem>
          <ListItem><ListItemText primary="Right Menu Item 2" /></ListItem>
        </List>
      </Drawer>

      {/* Top Drawer */}
      <Drawer
        open={topOpen}
        onClose={() => setTopOpen(false)}
        title="Top Panel"
        showCloseButton={true}
        variant="temporary"
        anchor="top"
        height={200}
      >
        <List>
          <ListItem><ListItemText primary="Top Menu Item 1" /></ListItem>
          <ListItem><ListItemText primary="Top Menu Item 2" /></ListItem>
        </List>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        open={bottomOpen}
        onClose={() => setBottomOpen(false)}
        title="Bottom Panel"
        showCloseButton={true}
        variant="temporary"
        anchor="bottom"
        height={300}
      >
        <List>
          <ListItem><ListItemText primary="Bottom Menu Item 1" /></ListItem>
          <ListItem><ListItemText primary="Bottom Menu Item 2" /></ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Persistent Drawer Example
const DrawerPersistentExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Persistent drawer stays open and pushes content
      </Typography>
      <Button 
        variant="outlined" 
        size="small"
        onClick={() => setOpen(true)}
      >
        Open Persistent Drawer
      </Button>
      
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Persistent Sidebar"
        showCloseButton={true}
        variant="persistent"
        anchor="left"
        width={280}
      >
        <List>
          <ListItem>
            <ListItemText primary="Persistent Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Persistent Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Persistent Item 3" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Custom Styling Drawer Example
const DrawerStyledExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2, bgcolor: 'grey.50' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Drawer with custom colors and styling
      </Typography>
      <Button 
        variant="outlined" 
        size="small" 
        sx={{ bgcolor: 'primary.light', color: 'white' }}
        onClick={() => setOpen(true)}
      >
        Open Styled Drawer
      </Button>
      
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Styled Drawer"
        showCloseButton={true}
        variant="temporary"
        anchor="left"
        width={280}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#f5f5f5',
            borderRight: '2px solid #e0e0e0',
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemText primary="Styled Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Styled Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Styled Item 3" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

interface ComponentRendererProps {
  componentName: string;
  example: string;
  // State props
  autocompleteValue: string;
  setAutocompleteValue: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  selectValue: string;
  setSelectValue: (value: string) => void;
  radioValue: string;
  setRadioValue: (value: string) => void;
  cepValue: string;
  setCepValue: (value: string) => void;
  cnpjValue: string;
  setCnpjValue: (value: string) => void;
  cpfValue: string;
  setCpfValue: (value: string) => void;
  phoneValue: string;
  setPhoneValue: (value: string) => void;
  dateMaskValue: string;
  setDateMaskValue: (value: string) => void;
  customMaskValue: string;
  setCustomMaskValue: (value: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
}

export const renderComponentExample = (props: ComponentRendererProps) => {
  const {
    componentName,
    example,
    autocompleteValue,
    setAutocompleteValue,
    showPassword,
    setShowPassword,
    selectValue,
    setSelectValue,
    radioValue,
    setRadioValue,
    cepValue,
    setCepValue,
    cnpjValue,
    setCnpjValue,
    cpfValue,
    setCpfValue,
    phoneValue,
    setPhoneValue,
    dateMaskValue,
    setDateMaskValue,
    customMaskValue,
    setCustomMaskValue,
    dialogOpen,
    setDialogOpen
  } = props;

  switch (componentName.toLowerCase()) {
    case 'button':
      switch (example) {
        case 'Basic Usage':
          return <Button variant="contained" color="primary">Click me</Button>;
        case 'Variants':
          return (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary">Contained</Button>
              <Button variant="outlined" color="primary">Outlined</Button>
              <Button variant="text" color="primary">Text</Button>
            </Box>
          );
        case 'Colors':
          return (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="error">Error</Button>
            </Box>
          );
        case 'Sizes':
          return (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button size="small" variant="contained">Small</Button>
              <Button size="medium" variant="contained">Medium</Button>
              <Button size="large" variant="contained">Large</Button>
            </Box>
          );
        default:
          return <Button variant="contained" color="primary">Button</Button>;
      }
    
    case 'textfield':
      switch (example) {
        case 'Basic Input':
          return <TextField label="Label" placeholder="Enter text" />;
        case 'Validation':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Valid input" value="Valid text" />
              <TextField label="Error input" error helperText="This field has an error" />
              <TextField label="Disabled input" disabled value="Disabled" />
            </Box>
          );
        case 'Types':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Text" type="text" placeholder="Enter text" />
              <TextField label="Email" type="email" placeholder="Enter email" />
              <TextField label="Password" type="password" placeholder="Enter password" />
              <TextField label="Number" type="number" placeholder="Enter number" />
            </Box>
          );
        default:
          return <TextField label="Label" placeholder="Enter text" />;
      }
    
    case 'avatar':
      switch (example) {
        case 'With Image':
          return <Avatar src="https://mui.com/static/images/avatar/1.jpg" alt="User" />;
        case 'With Initials':
          return (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar>JD</Avatar>
              <Avatar>AB</Avatar>
              <Avatar>CD</Avatar>
            </Box>
          );
        case 'Sizes':
          return (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              <Avatar sx={{ width: 40, height: 40 }}>L</Avatar>
            </Box>
          );
        default:
          return <Avatar>U</Avatar>;
      }
    
    case 'badge':
      switch (example) {
        case 'Notification Badge':
          return (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Badge badgeContent={4} color="primary">
                <Button>Messages</Button>
              </Badge>
              <Badge badgeContent={99} color="error">
                <Button>Notifications</Button>
              </Badge>
            </Box>
          );
        case 'Status Indicator':
          return (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Badge variant="dot" color="success">
                <Button>Online</Button>
              </Badge>
              <Badge variant="dot" color="error">
                <Button>Offline</Button>
              </Badge>
            </Box>
          );
        case 'Custom Content':
          return (
            <Badge badgeContent="NEW" color="primary">
              <Button>Feature</Button>
            </Badge>
          );
        default:
          return (
            <Badge badgeContent={4} color="primary">
              <Button>Badge</Button>
            </Badge>
          );
      }
    
    case 'chip':
      switch (example) {
        case 'Basic Chip':
          return (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Basic" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
            </Box>
          );
        case 'Deletable':
          return (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Deletable" onDelete={() => {}} />
              <Chip label="Clickable" clickable onDelete={() => {}} />
            </Box>
          );
        case 'Clickable':
          return (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Clickable" clickable />
              <Chip label="Outlined" variant="outlined" clickable />
            </Box>
          );
        default:
          return <Chip label="Chip" />;
      }
    
    case 'checkboxfield':
      switch (example) {
        case 'Basic Checkbox':
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox />
              <Typography variant="body2" sx={{ ml: 1 }}>Accept terms</Typography>
            </Box>
          );
        case 'States':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2" sx={{ ml: 1 }}>Unchecked</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked />
                <Typography variant="body2" sx={{ ml: 1 }}>Checked</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox disabled />
                <Typography variant="body2" sx={{ ml: 1 }}>Disabled</Typography>
              </Box>
            </Box>
          );
        case 'Indeterminate':
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox indeterminate />
              <Typography variant="body2" sx={{ ml: 1 }}>Select all</Typography>
            </Box>
          );
        default:
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox />
              <Typography variant="body2" sx={{ ml: 1 }}>Checkbox</Typography>
            </Box>
          );
      }
    
    case 'selectfield':
      switch (example) {
        case 'Basic Select':
          return (
            <FormControl fullWidth>
              <InputLabel>Choose option</InputLabel>
              <Select 
                value={selectValue} 
                label="Choose option"
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
              </Select>
            </FormControl>
          );
        case 'Multiple Select':
          return (
            <FormControl fullWidth>
              <InputLabel>Choose multiple</InputLabel>
              <Select 
                multiple 
                value={[]} 
                label="Choose multiple"
                onChange={(e) => {
                  console.log('Multiple selection:', e.target.value);
                }}
              >
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
              </Select>
            </FormControl>
          );
        case 'With Options':
          return (
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select 
                value={selectValue} 
                label="Country"
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="mx">Mexico</MenuItem>
              </Select>
            </FormControl>
          );
        default:
          return (
            <FormControl fullWidth>
              <InputLabel>Select</InputLabel>
              <Select 
                value={selectValue} 
                label="Select"
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
              </Select>
            </FormControl>
          );
      }
    
    case 'currencyfield':
      switch (example) {
        case 'Basic Currency':
          return (
            <TextField 
              label="Amount" 
              type="text" 
              placeholder="R$ 0,00"
              value="R$ 1.234,56"
              InputProps={{
                readOnly: true
              }}
              helperText="Brazilian Real format (R$ 1.234,56)"
            />
          );
        case 'Different Currencies':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField 
                label="USD" 
                type="text" 
                placeholder="$0.00"
                value="$1,234.56"
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField 
                label="EUR" 
                type="text" 
                placeholder="€0,00"
                value="€1.234,56"
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField 
                label="BRL" 
                type="text" 
                placeholder="R$ 0,00"
                value="R$ 1.234,56"
                InputProps={{
                  readOnly: true
                }}
              />
            </Box>
          );
        case 'Formatted Display':
          return (
            <TextField 
              label="Price" 
              type="text" 
              value="R$ 99,99" 
              placeholder="R$ 0,00"
              InputProps={{
                readOnly: true
              }}
              helperText="Brazilian Real format with proper formatting"
            />
          );
        default:
          return (
            <TextField 
              label="Amount" 
              type="text" 
              placeholder="R$ 0,00"
              value="R$ 1.234,56"
              InputProps={{
                readOnly: true
              }}
            />
          );
      }
    
    case 'togglefield':
      switch (example) {
        case 'Basic Toggle':
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch />
              <Typography variant="body2" sx={{ ml: 1 }}>Enable notifications</Typography>
            </Box>
          );
        case 'With Labels':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch checked />
                <Typography variant="body2" sx={{ ml: 1 }}>Dark mode</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch />
                <Typography variant="body2" sx={{ ml: 1 }}>Email notifications</Typography>
              </Box>
            </Box>
          );
        case 'Different States':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch checked color="primary" />
                <Typography variant="body2" sx={{ ml: 1 }}>Primary</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch checked color="success" />
                <Typography variant="body2" sx={{ ml: 1 }}>Success</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch disabled />
                <Typography variant="body2" sx={{ ml: 1 }}>Disabled</Typography>
              </Box>
            </Box>
          );
        default:
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch />
              <Typography variant="body2" sx={{ ml: 1 }}>Toggle</Typography>
            </Box>
          );
      }
    
    case 'datepickerfield':
      const MockDatePickerForm = ({ children }: { children: React.ReactNode }) => {
        const methods = useForm();
        return (
          <FormProvider {...methods}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </FormProvider>
        );
      };

      switch (example) {
        case 'Basic Date Picker':
          return (
            <Box sx={{ minWidth: 200 }}>
              <MockDatePickerForm>
                <DatePickerField 
                  name="date" 
                  label="Select date" 
                />
              </MockDatePickerForm>
            </Box>
          );
        case 'With Constraints':
          return (
            <Box sx={{ minWidth: 200 }}>
              <MockDatePickerForm>
                <DatePickerField 
                  name="birthDate" 
                  label="Birth date" 
                  helperText="Select your birth date" 
                />
              </MockDatePickerForm>
            </Box>
          );
        case 'Different Formats':
          return (
            <Box sx={{ minWidth: 200 }}>
              <MockDatePickerForm>
                <DatePickerField 
                  name="startDate" 
                  label="Start date" 
                  helperText="Choose start date" 
                />
              </MockDatePickerForm>
            </Box>
          );
        default:
          return (
            <Box sx={{ minWidth: 200 }}>
              <MockDatePickerForm>
                <DatePickerField 
                  name="date" 
                  label="Date" 
                />
              </MockDatePickerForm>
            </Box>
          );
      }
    
    case 'cepfield':
      switch (example) {
        case 'Basic CEP':
          return (
            <TextField
              label="CEP"
              placeholder="00000-000"
              value={cepValue}
              onChange={(e) => setCepValue(maskCEP(e.target.value))}
              helperText="Format: 00000-000"
            />
          );
        case 'With Validation':
          return (
            <TextField
              label="Postal Code"
              placeholder="00000-000"
              value={cepValue}
              onChange={(e) => setCepValue(maskCEP(e.target.value))}
              helperText="Valid CEP format"
            />
          );
        case 'Auto Complete':
          return (
            <TextField
              label="CEP"
              placeholder="00000-000"
              value={cepValue}
              onChange={(e) => setCepValue(maskCEP(e.target.value))}
              helperText="Address: Rua Example, São Paulo - SP"
            />
          );
        default:
          return (
            <TextField
              label="CEP"
              placeholder="00000-000"
              value={cepValue}
              onChange={(e) => setCepValue(maskCEP(e.target.value))}
            />
          );
      }
    
    case 'cnpjfield':
      switch (example) {
        case 'Basic CNPJ':
          return (
            <TextField
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpjValue}
              onChange={(e) => setCnpjValue(maskCNPJ(e.target.value))}
              helperText="Format: 00.000.000/0000-00"
            />
          );
        case 'With Formatting':
          return (
            <TextField
              label="Company CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpjValue}
              onChange={(e) => setCnpjValue(maskCNPJ(e.target.value))}
              helperText="Format: 00.000.000/0000-00"
            />
          );
        case 'With Validation':
          return (
            <TextField
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpjValue}
              onChange={(e) => setCnpjValue(maskCNPJ(e.target.value))}
              helperText="Valid CNPJ format"
            />
          );
        default:
          return (
            <TextField
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={cnpjValue}
              onChange={(e) => setCnpjValue(maskCNPJ(e.target.value))}
            />
          );
      }
    
    case 'cpffield':
      switch (example) {
        case 'Basic CPF':
          return (
            <TextField
              label="CPF"
              placeholder="000.000.000-00"
              value={cpfValue}
              onChange={(e) => setCpfValue(maskCPF(e.target.value))}
              helperText="Format: 000.000.000-00"
            />
          );
        case 'With Formatting':
          return (
            <TextField
              label="Individual CPF"
              placeholder="000.000.000-00"
              value={cpfValue}
              onChange={(e) => setCpfValue(maskCPF(e.target.value))}
              helperText="Format: 000.000.000-00"
            />
          );
        case 'With Validation':
          return (
            <TextField
              label="CPF"
              placeholder="000.000.000-00"
              value={cpfValue}
              onChange={(e) => setCpfValue(maskCPF(e.target.value))}
              helperText="Valid CPF format"
            />
          );
        default:
          return (
            <TextField
              label="CPF"
              placeholder="000.000.000-00"
              value={cpfValue}
              onChange={(e) => setCpfValue(maskCPF(e.target.value))}
            />
          );
      }
    
    case 'maskedfield':
      switch (example) {
        case 'Phone Mask':
          return (
            <TextField
              label="Phone Number"
              placeholder="(555) 123-4567"
              value={phoneValue}
              onChange={(e) => setPhoneValue(maskPhoneBR(e.target.value))}
              helperText="Format: (555) 123-4567"
            />
          );
        case 'Date Mask':
          return (
            <TextField
              label="Date"
              placeholder="MM/DD/YYYY"
              value={dateMaskValue}
              onChange={(e) => setDateMaskValue(e.target.value)}
              helperText="Format: MM/DD/YYYY"
            />
          );
        case 'Custom Mask':
          return (
            <TextField
              label="Custom Format"
              placeholder="123-ABC-456"
              value={customMaskValue}
              onChange={(e) => setCustomMaskValue(e.target.value)}
              helperText="Format: 123-ABC-456"
            />
          );
        default:
          return (
            <TextField
              label="Masked Input"
              placeholder="999-999-9999"
              value={phoneValue}
              onChange={(e) => setPhoneValue(maskPhoneBR(e.target.value))}
              helperText="Format: 999-999-9999"
            />
          );
      }

    case 'drawer':
      switch (example) {
        case 'Basic Drawer':
          return <DrawerExample />;
        case 'With Title':
          return <DrawerWithTitleExample />;
        case 'Different Anchors':
          return <DrawerAnchorsExample />;
        case 'Persistent Drawer':
          return <DrawerPersistentExample />;
        case 'Custom Styling':
          return <DrawerStyledExample />;
        default:
          return (
            <Box sx={{ position: 'relative', height: 200, border: '1px dashed #ccc', borderRadius: 1, p: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drawer component preview
              </Typography>
              <Button variant="outlined" size="small">
                Open Drawer
              </Button>
            </Box>
          );
      }

    case 'chart':
      switch (example) {
        case 'Line Chart':
          return (
            <Chart
              type="line"
              data={[
                { name: 'Jan', value: 400 },
                { name: 'Feb', value: 300 },
                { name: 'Mar', value: 200 },
                { name: 'Apr', value: 500 },
                { name: 'May', value: 800 },
                { name: 'Jun', value: 600 },
              ]}
              title="Sales Over Time"
              showLegend={true}
              showTooltip={true}
              showGrid={true}
              height={250}
            />
          );
        case 'Bar Chart':
          return (
            <Chart
              type="bar"
              data={[
                { name: 'Q1', value: 400 },
                { name: 'Q2', value: 300 },
                { name: 'Q3', value: 200 },
                { name: 'Q4', value: 500 },
              ]}
              title="Quarterly Sales"
              showLegend={true}
              showTooltip={true}
              showGrid={true}
              height={250}
            />
          );
        case 'Pie Chart':
          return (
            <Chart
              type="pie"
              data={[
                { name: 'Desktop', value: 400 },
                { name: 'Mobile', value: 300 },
                { name: 'Tablet', value: 200 },
                { name: 'Other', value: 100 },
              ]}
              title="Device Usage"
              showLegend={true}
              showTooltip={true}
              height={250}
            />
          );
        case 'Area Chart':
          return (
            <Chart
              type="area"
              data={[
                { name: 'Jan', value: 400 },
                { name: 'Feb', value: 300 },
                { name: 'Mar', value: 200 },
                { name: 'Apr', value: 500 },
                { name: 'May', value: 800 },
                { name: 'Jun', value: 600 },
              ]}
              title="User Growth"
              showLegend={true}
              showTooltip={true}
              showGrid={true}
              height={250}
            />
          );
        case 'Custom Colors':
          return (
            <Chart
              type="line"
              data={[
                { name: 'Jan', value: 400 },
                { name: 'Feb', value: 300 },
                { name: 'Mar', value: 200 },
                { name: 'Apr', value: 500 },
                { name: 'May', value: 800 },
                { name: 'Jun', value: 600 },
              ]}
              title="Custom Styled Chart"
              colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
              showLegend={true}
              showTooltip={true}
              showGrid={true}
              height={250}
            />
          );
        case 'Responsive Charts':
          return (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
              <Chart
                type="line"
                data={[
                  { name: 'Jan', value: 400 },
                  { name: 'Feb', value: 300 },
                  { name: 'Mar', value: 200 },
                ]}
                title="Sales"
                showLegend={false}
                showTooltip={true}
                showGrid={true}
                height={200}
              />
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', value: 400 },
                  { name: 'Q2', value: 300 },
                  { name: 'Q3', value: 200 },
                ]}
                title="Revenue"
                showLegend={false}
                showTooltip={true}
                showGrid={true}
                height={200}
              />
              <Chart
                type="pie"
                data={[
                  { name: 'Desktop', value: 400 },
                  { name: 'Mobile', value: 300 },
                  { name: 'Tablet', value: 200 },
                ]}
                title="Devices"
                showLegend={false}
                showTooltip={true}
                height={200}
              />
            </Box>
          );
        default:
          return (
            <Chart
              type="line"
              data={[
                { name: 'Jan', value: 400 },
                { name: 'Feb', value: 300 },
                { name: 'Mar', value: 200 },
                { name: 'Apr', value: 500 },
              ]}
              title="Sample Chart"
              showLegend={true}
              showTooltip={true}
              showGrid={true}
              height={250}
            />
          );
      }

    case 'rating':
      switch (example) {
        case 'Star Rating':
          return <ControlledRating value={4} max={5} variant="star" showValue showLabels />;
        case 'Thumbs Rating':
          return <ControlledRating value={1} max={2} variant="thumbs" showValue showLabels />;
        case 'Heart Rating':
          return <ControlledRating value={3} max={5} variant="heart" showValue showLabels />;
        case 'Emoji Rating':
          return <ControlledRating value={4} max={5} variant="emoji" showValue showLabels />;
        case 'Half Precision':
          return <ControlledRating value={3.5} max={5} variant="star" precision={0.5} showValue />;
        case 'Read Only':
          return (
            <Rating
              value={4}
              max={5}
              readOnly
              showValue
            />
          );
        default:
          return <ControlledRating value={3} max={5} variant="star" showValue />;
      }

    case 'colorpicker':
      switch (example) {
        case 'Basic Color Picker':
          return <ControlledColorPicker value="#3F51B5" label="Choose Color" />;
        case 'With Custom Input':
          return (
            <ControlledColorPicker 
              value="#E91E63" 
              label="Custom Color" 
              showPresets={false}
              showHexInput
              showRgbInput
              showHslInput
            />
          );
        case 'All Formats':
          return (
            <ControlledColorPicker 
              value="#4CAF50" 
              label="All Color Formats"
              showHexInput
              showRgbInput
              showHslInput
            />
          );
        case 'Different Variants':
          return (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <ControlledColorPicker value="#FF5722" variant="standard" label="Standard" />
              <ControlledColorPicker value="#FF5722" variant="outlined" label="Outlined" />
              <ControlledColorPicker value="#FF5722" variant="filled" label="Filled" />
            </Box>
          );
        default:
          return <ControlledColorPicker value="#9C27B0" label="Choose Color" />;
      }

    case 'slider':
      switch (example) {
        case 'Basic Slider':
          return <ControlledSlider value={50} label="Volume" helperText="Adjust the volume level" />;
        case 'With Value Display':
          return <ControlledSlider value={75} label="Progress" showValue showChips helperText="Current progress: 75%" />;
        case 'Range Slider':
          return (
            <ControlledSlider 
              value={[20, 80]} 
              range 
              label="Price Range" 
              showValue 
              showChips 
              min={0} 
              max={1000} 
              step={10} 
              helperText="Select your price range" 
            />
          );
        case 'With Marks':
          return <ControlledSlider value={60} label="Difficulty Level" showMarks showValue step={10} helperText="Choose difficulty level" />;
        case 'Vertical Slider':
          return (
            <Box sx={{ 
              height: 200, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: '100%',
              '& .MuiFormControl-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'auto'
              }
            }}>
              <ControlledSlider 
                value={40} 
                label="Volume" 
                orientation="vertical" 
                showValue 
                helperText="Vertical slider" 
              />
            </Box>
          );
        case 'Custom Formatter':
          return (
            <ControlledSlider 
              value={2500} 
              label="Price" 
              min={0} 
              max={10000} 
              step={100} 
              showValue 
              showMinMax 
              helperText="Select price range" 
            />
          );
        default:
          return <ControlledSlider value={30} label="Default Slider" showValue />;
      }

    case 'switch':
      switch (example) {
        case 'Basic Switch':
          return (
            <Switch
              label="Enable notifications"
              helperText="Turn on to receive notifications"
              onChange={(checked) => console.log('Switch changed:', checked)}
            />
          );
        case 'With Status':
          return (
            <Switch
              checked={true}
              label="Dark mode"
              showStatus
              helperText="Switch to dark theme"
              onChange={(checked) => console.log('Switch changed:', checked)}
            />
          );
        case 'Custom Labels':
          return (
            <Switch
              checked={true}
              label="WiFi"
              checkedLabel="Connected"
              uncheckedLabel="Disconnected"
              helperText="Network connection status"
              onChange={(checked) => console.log('Switch changed:', checked)}
            />
          );
        case 'Different Placements':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Switch
                checked={true}
                label="Label Start"
                labelPlacement="start"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={false}
                label="Label Top"
                labelPlacement="top"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={true}
                label="Label Bottom"
                labelPlacement="bottom"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
            </Box>
          );
        case 'Different Sizes':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Switch
                checked={true}
                label="Small Switch"
                size="small"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={true}
                label="Medium Switch"
                size="medium"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
            </Box>
          );
        case 'Different Colors':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Switch
                checked={true}
                label="Primary"
                color="primary"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={true}
                label="Success"
                color="success"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={true}
                label="Warning"
                color="warning"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
              <Switch
                checked={true}
                label="Error"
                color="error"
                showStatus
                onChange={(checked) => console.log('Switch changed:', checked)}
              />
            </Box>
          );
        default:
          return (
            <Switch
              checked={false}
              label="Default Switch"
              showStatus
              onChange={(checked) => console.log('Switch changed:', checked)}
            />
          );
      }

    case 'datetimepicker':
      switch (example) {
        case 'Basic DateTimePicker':
          return (
            <DateTimePicker
              label="Select Date & Time"
              helperText="Choose your preferred date and time"
              onChange={(value) => console.log('DateTime changed:', value)}
            />
          );
        case 'Date Only':
          return (
            <DateTimePicker
              showDate
              showTime={false}
              label="Birth Date"
              placeholder="Select your birth date"
              helperText="Date of birth"
              onChange={(value) => console.log('Date changed:', value)}
            />
          );
        case 'Time Only':
          return (
            <DateTimePicker
              showDate={false}
              showTime
              label="Meeting Time"
              placeholder="Select meeting time"
              helperText="When should the meeting start?"
              onChange={(value) => console.log('Time changed:', value)}
            />
          );
        case 'With Seconds':
          return (
            <DateTimePicker
              showSeconds
              label="Precise Time"
              helperText="Include seconds for precise timing"
              onChange={(value) => console.log('DateTime changed:', value)}
            />
          );
        case '12-Hour Format':
          return (
            <DateTimePicker
              use24HourFormat={false}
              label="Event Time"
              helperText="12-hour format with AM/PM"
              onChange={(value) => console.log('DateTime changed:', value)}
            />
          );
        case 'With Constraints':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DateTimePicker
                label="Future Date Only"
                disablePast
                helperText="Cannot select past dates"
                onChange={(value) => console.log('DateTime changed:', value)}
              />
              <DateTimePicker
                label="Past Date Only"
                disableFuture
                helperText="Cannot select future dates"
                onChange={(value) => console.log('DateTime changed:', value)}
              />
              <DateTimePicker
                label="Within Range"
                minDateTime={dayjs().subtract(1, 'month')}
                maxDateTime={dayjs().add(1, 'month')}
                helperText="Select date within the last month to next month"
                onChange={(value) => console.log('DateTime changed:', value)}
              />
            </Box>
          );
        default:
          return (
            <DateTimePicker
              label="Default DateTimePicker"
              onChange={(value) => console.log('DateTime changed:', value)}
            />
          );
      }

    case 'imageupload':
      switch (example) {
        case 'Basic ImageUpload':
          return (
            <ImageUpload
              label="Upload Images"
              helperText="Select images to upload"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        case 'With Preview':
          return (
            <ImageUpload
              label="Upload with Preview"
              showPreview
              showFileList
              helperText="Images will be previewed after selection"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        case 'Single File':
          return (
            <ImageUpload
              label="Single Image Upload"
              multiple={false}
              maxFiles={1}
              helperText="Upload only one image"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        case 'With Constraints':
          return (
            <ImageUpload
              label="Constrained Upload"
              maxFiles={3}
              maxFileSize={2 * 1024 * 1024} // 2MB
              accept="image/jpeg,image/png"
              helperText="Maximum 3 files, 2MB each, JPEG/PNG only"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        case 'With Compression':
          return (
            <ImageUpload
              label="Compressed Upload"
              compressImages
              imageQuality={0.8}
              maxImageWidth={1920}
              maxImageHeight={1080}
              helperText="Images will be automatically compressed"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        case 'Custom Text':
          return (
            <ImageUpload
              label="Custom Upload"
              uploadText="Choose Photos"
              dragText="Drag photos here"
              dropText="Drop photos to upload"
              helperText="Custom text for all upload actions"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
        default:
          return (
            <ImageUpload
              label="Default ImageUpload"
              onChange={(files) => console.log('Files changed:', files)}
            />
          );
      }

    case 'progressbar':
      switch (example) {
        case 'Basic ProgressBar':
          return (
            <ProgressBar
              value={50}
              label="Progress"
              helperText="Current progress status"
            />
          );
        case 'Linear Progress':
          return (
            <ProgressBar
              variant="linear"
              value={75}
              label="Linear Progress"
              helperText="Linear progress bar example"
            />
          );
        case 'Circular Progress':
          return (
            <ProgressBar
              variant="circular"
              value={60}
              label="Circular Progress"
              helperText="Circular progress bar example"
            />
          );
        case 'Step Progress':
          return (
            <ProgressBar
              variant="step"
              currentStep={2}
              totalSteps={5}
              steps={['Start', 'Process', 'Review', 'Approve', 'Complete']}
              label="Step Progress"
              helperText="Step-by-step progress example"
            />
          );
        case 'Indeterminate':
          return (
            <ProgressBar
              indeterminate
              label="Loading..."
              helperText="Indeterminate progress for loading states"
            />
          );
        case 'With Status':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ProgressBar
                variant="linear"
                value={100}
                color="success"
                label="Completed"
                helperText="Task completed successfully"
              />
              <ProgressBar
                variant="linear"
                value={30}
                color="error"
                label="Failed"
                error
                errorMessage="Process failed"
                helperText="Task failed with error"
              />
              <ProgressBar
                variant="step"
                currentStep={1}
                totalSteps={4}
                steps={['Start', 'Process', 'Review', 'Complete']}
                stepStatus={['completed', 'active', 'pending', 'pending']}
                label="Step with Status"
                helperText="Steps with different status indicators"
              />
            </Box>
          );
        default:
          return (
            <ProgressBar
              value={25}
              label="Default ProgressBar"
              helperText="Default progress bar example"
            />
          );
      }

    case 'richtexteditor':
      switch (example) {
        case 'Basic Editor':
          return (
            <RichTextEditor
              placeholder="Start typing your content here..."
              minHeight={200}
            />
          );
        case 'Read Only':
          return (
            <RichTextEditor
              value="<h2>Read Only Content</h2><p>This content cannot be edited. The toolbar is disabled and the editor is not interactive.</p><blockquote>This is a quote that cannot be modified.</blockquote>"
              readOnly
              minHeight={200}
            />
          );
        case 'Custom Toolbar':
          return (
            <RichTextEditor
              value="<p>This editor only allows <strong>bold</strong> and <em>italic</em> formatting.</p>"
              allowedFormats={['bold', 'italic']}
              minHeight={200}
            />
          );
        case 'Bottom Toolbar':
          return (
            <RichTextEditor
              value="<p>This editor has the toolbar at the bottom instead of the top.</p>"
              toolbarPosition="bottom"
              minHeight={200}
            />
          );
        default:
          return (
            <RichTextEditor
              placeholder="Start typing your content here..."
              minHeight={200}
            />
          );
      }
    
    default:
      return <Typography variant="body2" color="text.secondary">Component preview not available</Typography>;
  }
};
