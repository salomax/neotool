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
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
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
    
    case 'datepicker':
      switch (example) {
        case 'Basic Date Picker':
          return (
            <Box sx={{ minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Select date" 
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Click to select date',
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              📅
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          );
        case 'With Constraints':
          return (
            <Box sx={{ minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Birth date" 
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Click to select birth date'
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          );
        case 'Different Formats':
          return (
            <Box sx={{ minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Start date" 
                  minDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Click to select start date'
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          );
        default:
          return (
            <Box sx={{ minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Date" 
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      placeholder: 'Click to select date'
                    }
                  }}
                />
              </LocalizationProvider>
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
    
    default:
      return <Typography variant="body2" color="text.secondary">Component preview not available</Typography>;
  }
};
