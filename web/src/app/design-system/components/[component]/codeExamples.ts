export const getCodeExample = (componentName: string, example: string): string => {
  switch (componentName.toLowerCase()) {
    case 'button':
      switch (example) {
        case 'Basic Usage':
          return `<Button variant="contained" color="primary">
  Click me
</Button>`;
        case 'Variants':
          return `<Button variant="contained" color="primary">
  Contained
</Button>
<Button variant="outlined" color="primary">
  Outlined
</Button>
<Button variant="text" color="primary">
  Text
</Button>`;
        case 'Colors':
          return `<Button variant="contained" color="primary">
  Primary
</Button>
<Button variant="contained" color="secondary">
  Secondary
</Button>
<Button variant="contained" color="success">
  Success
</Button>
<Button variant="contained" color="error">
  Error
</Button>`;
        case 'Sizes':
          return `<Button size="small" variant="contained">
  Small
</Button>
<Button size="medium" variant="contained">
  Medium
</Button>
<Button size="large" variant="contained">
  Large
</Button>`;
        default:
          return `<Button variant="contained" color="primary">Button</Button>`;
      }
    
    case 'textfield':
      switch (example) {
        case 'Basic Input':
          return `<TextField 
  label="Label" 
  placeholder="Enter text" 
/>`;
        case 'Validation':
          return `<TextField 
  label="Valid input" 
  value="Valid text" 
/>
<TextField 
  label="Error input" 
  error 
  helperText="This field has an error" 
/>
<TextField 
  label="Disabled input" 
  disabled 
  value="Disabled" 
/>`;
        case 'Types':
          return `<TextField 
  label="Text" 
  type="text" 
  placeholder="Enter text" 
/>
<TextField 
  label="Email" 
  type="email" 
  placeholder="Enter email" 
/>
<TextField 
  label="Password" 
  type="password" 
  placeholder="Enter password" 
/>
<TextField 
  label="Number" 
  type="number" 
  placeholder="Enter number" 
/>`;
        default:
          return `<TextField label="Label" placeholder="Enter text" />`;
      }
    
    case 'avatar':
      switch (example) {
        case 'With Image':
          return `<Avatar 
  src="https://mui.com/static/images/avatar/1.jpg" 
  alt="User" 
/>`;
        case 'With Initials':
          return `<Avatar>
  JD
</Avatar>
<Avatar>
  AB
</Avatar>
<Avatar>
  CD
</Avatar>`;
        case 'Sizes':
          return `<Avatar sx={{ width: 24, height: 24 }}>
  S
</Avatar>
<Avatar sx={{ width: 32, height: 32 }}>
  M
</Avatar>
<Avatar sx={{ width: 40, height: 40 }}>
  L
</Avatar>`;
        default:
          return `<Avatar>U</Avatar>`;
      }
    
    case 'badge':
      switch (example) {
        case 'Notification Badge':
          return `<Badge badgeContent={4} color="primary">
  <Button>
    Messages
  </Button>
</Badge>
<Badge badgeContent={99} color="error">
  <Button>
    Notifications
  </Button>
</Badge>`;
        case 'Status Indicator':
          return `<Badge variant="dot" color="success">
  <Button>
    Online
  </Button>
</Badge>
<Badge variant="dot" color="error">
  <Button>
    Offline
  </Button>
</Badge>`;
        case 'Custom Content':
          return `<Badge badgeContent="NEW" color="primary">
  <Button>
    Feature
  </Button>
</Badge>`;
        default:
          return `<Badge badgeContent={4} color="primary">
  <Button>
    Badge
  </Button>
</Badge>`;
      }
    
    case 'chip':
      switch (example) {
        case 'Basic Chip':
          return `<Chip label="Basic" />
<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />`;
        case 'Deletable':
          return `<Chip 
  label="Deletable" 
  onDelete={() => {}} 
/>
<Chip 
  label="Clickable" 
  clickable 
  onDelete={() => {}} 
/>`;
        case 'Clickable':
          return `<Chip label="Clickable" clickable />
<Chip label="Outlined" variant="outlined" clickable />`;
        default:
          return `<Chip label="Chip" />`;
      }
    
    case 'checkboxfield':
      switch (example) {
        case 'Basic Checkbox':
          return `<CheckboxField 
  label="Accept terms" 
  checked={false} 
/>`;
        case 'States':
          return `<CheckboxField 
  label="Unchecked" 
  checked={false} 
/>
<CheckboxField 
  label="Checked" 
  checked={true} 
/>
<CheckboxField 
  label="Disabled" 
  disabled 
/>`;
        case 'Indeterminate':
          return `<CheckboxField 
  label="Select all" 
  indeterminate={true} 
/>`;
        default:
          return `<CheckboxField label="Checkbox" />`;
      }
    
    case 'selectfield':
      switch (example) {
        case 'Basic Select':
          return `<SelectField 
  label="Choose option" 
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]} 
/>`;
        case 'Multiple Select':
          return `<SelectField 
  label="Choose multiple" 
  multiple 
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]} 
/>`;
        case 'With Options':
          return `<SelectField 
  label="Country" 
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]} 
/>`;
        default:
          return `<SelectField label="Select" options={[]} />`;
      }
    
    case 'currencyfield':
      switch (example) {
        case 'Basic Currency':
          return `<CurrencyField 
  label="Amount" 
  value={0} 
  currency="USD" 
/>`;
        case 'Different Currencies':
          return `<CurrencyField 
  label="USD" 
  currency="USD" 
/>
<CurrencyField 
  label="EUR" 
  currency="EUR" 
/>
<CurrencyField 
  label="GBP" 
  currency="GBP" 
/>`;
        case 'Formatted Display':
          return `<CurrencyField 
  label="Price" 
  value={99.99} 
  currency="USD" 
  locale="en-US" 
/>`;
        default:
          return `<CurrencyField label="Amount" currency="USD" />`;
      }
    
    case 'togglefield':
      switch (example) {
        case 'Basic Toggle':
          return `<ToggleField 
  label="Enable notifications" 
  checked={false} 
/>`;
        case 'With Labels':
          return `<ToggleField 
  label="Dark mode" 
  checked={true} 
/>
<ToggleField 
  label="Email notifications" 
  checked={false} 
/>`;
        case 'Different States':
          return `<ToggleField 
  label="Primary" 
  color="primary" 
  checked={true} 
/>
<ToggleField 
  label="Success" 
  color="success" 
  checked={true} 
/>
<ToggleField 
  label="Disabled" 
  disabled 
/>`;
        default:
          return `<ToggleField label="Toggle" />`;
      }
    
    case 'datepickerfield':
      switch (example) {
        case 'Basic Date Picker':
          return `<DatePickerField 
  name="date" 
  label="Select date" 
/>`;
        case 'With Constraints':
          return `<DatePickerField 
  name="birthDate" 
  label="Birth date" 
  helperText="Select your birth date" 
/>`;
        case 'Different Formats':
          return `<DatePickerField 
  name="startDate" 
  label="Start date" 
  helperText="Choose start date" 
/>`;
        default:
          return `<DatePicker label="Date" />`;
      }
    
    case 'fileuploader':
      switch (example) {
        case 'Basic Upload':
          return `<FileUploader 
  onUpload={(files) => console.log(files)} 
/>`;
        case 'Drag & Drop':
          return `<FileUploader 
  onUpload={(files) => console.log(files)} 
  accept="image/*" 
/>`;
        case 'Multiple Files':
          return `<FileUploader 
  onUpload={(files) => console.log(files)} 
  multiple 
  maxSize={5 * 1024 * 1024} 
/>`;
        default:
          return `<FileUploader onUpload={() => {}} />`;
      }
    
    case 'confirmdialog':
      switch (example) {
        case 'Basic Confirmation':
          return `<ConfirmDialog 
  open={open}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>`;
        case 'Delete Confirmation':
          return `<ConfirmDialog 
  open={open}
  title="Delete Item"
  message="This action cannot be undone. Are you sure?"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>`;
        case 'Custom Buttons':
          return `<ConfirmDialog 
  open={open}
  title="Save Changes"
  message="Do you want to save your changes?"
  confirmText="Save"
  cancelText="Discard"
  onConfirm={handleSave}
  onCancel={handleDiscard}
/>`;
        default:
          return `<ConfirmDialog open={open} title="Confirm" message="Are you sure?" onConfirm={onConfirm} onCancel={onCancel} />`;
      }
    
    case 'autocompletefield':
      switch (example) {
        case 'Basic Autocomplete':
          return `<AutocompleteField 
  label="Select country" 
  options={[
    'United States',
    'Canada', 
    'Mexico',
    'Brazil'
  ]} 
/>`;
        case 'Free Solo':
          return `<AutocompleteField 
  label="Add tags" 
  freeSolo 
  options={['React', 'Vue', 'Angular']} 
/>`;
        case 'Multiple Selection':
          return `<AutocompleteField 
  label="Select skills" 
  multiple 
  options={[
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js'
  ]} 
/>`;
        default:
          return `<AutocompleteField label="Autocomplete" options={[]} />`;
      }
    
    case 'numberfield':
      switch (example) {
        case 'Basic Number':
          return `<NumberField 
  label="Enter amount" 
  value={0} 
/>`;
        case 'With Constraints':
          return `<NumberField 
  label="Age" 
  min={0} 
  max={120} 
  value={25} 
/>`;
        case 'Decimal Input':
          return `<NumberField 
  label="Price" 
  step={0.01} 
  value={0.00} 
/>`;
        default:
          return `<NumberField label="Number" />`;
      }
    
    case 'passwordfield':
      switch (example) {
        case 'Basic Password':
          return `<PasswordField 
  label="Password" 
  showPassword={false} 
  onToggleVisibility={() => {}} 
/>`;
        case 'With Validation':
          return `<PasswordField 
  label="New Password" 
  showPassword={false} 
  onToggleVisibility={() => {}} 
  helperText="Must be at least 8 characters" 
/>`;
        case 'Confirm Password':
          return `<PasswordField 
  label="Confirm Password" 
  showPassword={false} 
  onToggleVisibility={() => {}} 
/>`;
        default:
          return `<PasswordField label="Password" />`;
      }
    
    case 'percentfield':
      switch (example) {
        case 'Basic Percentage':
          return `<PercentField 
  label="Success Rate" 
  value={0} 
/>`;
        case 'With Range':
          return `<PercentField 
  label="Completion" 
  min={0} 
  max={100} 
  value={75} 
/>`;
        case 'Formatted Display':
          return `<PercentField 
  label="Discount" 
  value={15.5} 
  helperText="Enter percentage (0-100)" 
/>`;
        default:
          return `<PercentField label="Percentage" />`;
      }
    
    case 'radiogroupfield':
      switch (example) {
        case 'Basic Radio Group':
          return `<RadioGroupField 
  label="Choose option" 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]} 
/>`;
        case 'With Labels':
          return `<RadioGroupField 
  label="Payment Method" 
  options={[
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' }
  ]} 
/>`;
        case 'Vertical Layout':
          return `<RadioGroupField 
  label="Size" 
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]} 
/>`;
        default:
          return `<RadioGroupField label="Radio Group" options={[]} />`;
      }
    
    case 'tooltip':
      switch (example) {
        case 'Basic Tooltip':
          return `<Tooltip title="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`;
        case 'With Arrow':
          return `<Tooltip title="Tooltip with arrow" arrow>
  <Button>Hover me</Button>
</Tooltip>`;
        case 'Different Placements':
          return `<Tooltip title="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip title="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>`;
        default:
          return `<Tooltip title="Tooltip">
  <Button>Hover me</Button>
</Tooltip>`;
      }
    
    case 'link':
      switch (example) {
        case 'Basic Link':
          return `<Link href="/dashboard">
  Go to Dashboard
</Link>`;
        case 'External Link':
          return `<Link 
  href="https://example.com" 
  target="_blank"
>
  External Link
</Link>`;
        case 'Styled Link':
          return `<Link 
  href="/settings" 
  color="secondary" 
  underline="always"
>
  Settings
</Link>`;
        default:
          return `<Link href="/">Link</Link>`;
      }
    
    case 'loadingspinner':
      switch (example) {
        case 'Basic Spinner':
          return `<LoadingSpinner />`;
        case 'With Message':
          return `<LoadingSpinner 
  message="Loading data..." 
  size="large" 
/>`;
        case 'Different Sizes':
          return `<LoadingSpinner size="small" />
<LoadingSpinner size="medium" />
<LoadingSpinner size="large" />`;
        default:
          return `<LoadingSpinner />`;
      }
    
    case 'pageskeleton':
      switch (example) {
        case 'Text Skeleton':
          return `<PageSkeleton 
  variant="text" 
  width="100%" 
  height={20} 
/>`;
        case 'Card Skeleton':
          return `<PageSkeleton 
  variant="rectangular" 
  width={300} 
  height={200} 
/>`;
        case 'List Skeleton':
          return `<Box>
  <PageSkeleton variant="text" width="80%" />
  <PageSkeleton variant="text" width="60%" />
  <PageSkeleton variant="text" width="90%" />
</Box>`;
        default:
          return `<PageSkeleton variant="text" />`;
      }

    case 'drawer':
      switch (example) {
        case 'Basic Drawer':
          return `import { Drawer } from '@/shared/components/ui/atoms/Drawer';
import { List, ListItem, ListItemText } from '@mui/material';

const [open, setOpen] = useState(false);

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
    <ListItem button>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Settings" />
    </ListItem>
  </List>
</Drawer>`;
        case 'With Title':
          return `import { Drawer } from '@/shared/components/ui/atoms/Drawer';

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
  {/* Your content here */}
</Drawer>`;
        case 'Different Anchors':
          return `// Left Drawer
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  anchor="left"
  width={280}
>
  {/* Content */}
</Drawer>

// Right Drawer
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  anchor="right"
  width={320}
>
  {/* Content */}
</Drawer>

// Top Drawer
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  anchor="top"
  height={200}
>
  {/* Content */}
</Drawer>

// Bottom Drawer
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  anchor="bottom"
  height={300}
>
  {/* Content */}
</Drawer>`;
        case 'Persistent Drawer':
          return `import { Drawer } from '@/shared/components/ui/atoms/Drawer';

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Persistent Sidebar"
  showCloseButton={true}
  variant="persistent"
  anchor="left"
  width={280}
>
  {/* Content that stays open */}
</Drawer>`;
        case 'Custom Styling':
          return `import { Drawer } from '@/shared/components/ui/atoms/Drawer';

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
  {/* Styled content */}
</Drawer>`;
        default:
          return `import { Drawer } from '@/shared/components/ui/atoms/Drawer';

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Navigation"
  showCloseButton={true}
  variant="temporary"
  anchor="left"
  width={280}
>
  {/* Your content here */}
</Drawer>`;
      }

    case 'chart':
      switch (example) {
        case 'Line Chart':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 800 },
  { name: 'Jun', value: 600 },
];

<Chart
  type="line"
  data={data}
  title="Sales Over Time"
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  height={300}
/>`;
        case 'Bar Chart':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Q1', value: 400 },
  { name: 'Q2', value: 300 },
  { name: 'Q3', value: 200 },
  { name: 'Q4', value: 500 },
];

<Chart
  type="bar"
  data={data}
  title="Quarterly Sales"
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  height={300}
/>`;
        case 'Pie Chart':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
];

<Chart
  type="pie"
  data={data}
  title="Device Usage"
  showLegend={true}
  showTooltip={true}
  height={300}
/>`;
        case 'Area Chart':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 800 },
  { name: 'Jun', value: 600 },
];

<Chart
  type="area"
  data={data}
  title="User Growth"
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  height={300}
/>`;
        case 'Custom Colors':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 500 },
];

<Chart
  type="line"
  data={data}
  title="Custom Styled Chart"
  colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  height={300}
/>`;
        case 'Responsive Charts':
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';
import { Box } from '@mui/material';

const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
];

const revenueData = [
  { name: 'Q1', value: 400 },
  { name: 'Q2', value: 300 },
  { name: 'Q3', value: 200 },
];

const deviceData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

<Box sx={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: 2 
}}>
  <Chart
    type="line"
    data={salesData}
    title="Sales"
    showLegend={false}
    showTooltip={true}
    showGrid={true}
    height={200}
  />
  <Chart
    type="bar"
    data={revenueData}
    title="Revenue"
    showLegend={false}
    showTooltip={true}
    showGrid={true}
    height={200}
  />
  <Chart
    type="pie"
    data={deviceData}
    title="Devices"
    showLegend={false}
    showTooltip={true}
    height={200}
  />
</Box>`;
        default:
          return `import { Chart } from '@/shared/components/ui/atoms/Chart';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 500 },
];

<Chart
  type="line"
  data={data}
  title="Sample Chart"
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  height={300}
/>`;
      }

    case 'asyncautocomplete':
      switch (example) {
        case 'Basic Async':
          return `<AsyncAutocomplete 
  label="Search users" 
  loadOptions={async (query) => {
    const response = await fetch(\`/api/users?q=\${query}\`);
    return response.json();
  }} 
/>`;
        case 'With Loading':
          return `<AsyncAutocomplete 
  label="Search products" 
  loading={isLoading}
  loadOptions={loadProducts} 
/>`;
        case 'API Integration':
          return `<AsyncAutocomplete 
  label="Search cities" 
  loadOptions={async (query) => {
    if (query.length < 2) return [];
    const response = await fetch(\`/api/cities?q=\${query}\`);
    const data = await response.json();
    return data.map(city => ({ value: city.id, label: city.name }));
  }} 
/>`;
        default:
          return `<AsyncAutocomplete label="Async Search" loadOptions={loadOptions} />`;
      }
    
    case 'emptyerrorstate':
      switch (example) {
        case 'Empty State':
          return `<EmptyErrorState 
  type="empty"
  title="No data available"
  message="There are no items to display at the moment."
  actionText="Refresh"
  onAction={handleRefresh}
/>`;
        case 'Error State':
          return `<EmptyErrorState 
  type="error"
  title="Something went wrong"
  message="We encountered an error while loading the data."
  actionText="Try Again"
  onAction={handleRetry}
/>`;
        case 'With Action':
          return `<EmptyErrorState 
  type="empty"
  title="No results found"
  message="Try adjusting your search criteria."
  actionText="Clear Filters"
  onAction={handleClearFilters}
/>`;
        default:
          return `<EmptyErrorState type="empty" title="No data" message="No items available" />`;
      }
    
    case 'maskedfield':
      switch (example) {
        case 'Phone Mask':
          return `<MaskedField 
  label="Phone Number" 
  mask="(999) 999-9999"
  placeholder="(555) 123-4567"
/>`;
        case 'Date Mask':
          return `<MaskedField 
  label="Date" 
  mask="99/99/9999"
  placeholder="MM/DD/YYYY"
/>`;
        case 'Custom Mask':
          return `<MaskedField 
  label="Custom Format" 
  mask="999-AAA-999"
  placeholder="123-ABC-456"
/>`;
        default:
          return `<MaskedField label="Masked Input" mask="999-999-9999" />`;
      }
    
    case 'searchfield':
      switch (example) {
        case 'Basic Search':
          return `<SearchField 
  placeholder="Search products..."
  onChange={handleSearchChange}
  onSearch={handleSearch}
/>`;
        case 'With Loading':
          return `<SearchField 
  placeholder="Search users..."
  loading={isSearching}
  onChange={handleSearchChange}
  onSearch={handleSearch}
/>`;
        case 'Advanced Search':
          return `<SearchField 
  placeholder="Search with filters..."
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={handleAdvancedSearch}
/>`;
        default:
          return `<SearchField placeholder="Search..." onChange={onChange} onSearch={onSearch} />`;
      }
    
    case 'toastprovider':
      switch (example) {
        case 'Basic Provider':
          return `<ToastProvider>
  <App />
</ToastProvider>`;
        case 'With Position':
          return `<ToastProvider position="bottom-right">
  <App />
</ToastProvider>`;
        case 'Multiple Toasts':
          return `<ToastProvider maxToasts={10}>
  <App />
</ToastProvider>`;
        default:
          return `<ToastProvider><App /></ToastProvider>`;
      }
    
    case 'cepfield':
      switch (example) {
        case 'Basic CEP':
          return `<CEPField 
  label="CEP" 
  placeholder="00000-000"
  onChange={handleCEPChange}
/>`;
        case 'With Validation':
          return `<CEPField 
  label="Postal Code" 
  placeholder="00000-000"
  onChange={handleCEPChange}
  onBlur={validateCEP}
/>`;
        case 'Auto Complete':
          return `<CEPField 
  label="CEP" 
  placeholder="00000-000"
  onChange={handleCEPChange}
  onBlur={lookupAddress}
/>`;
        default:
          return `<CEPField label="CEP" placeholder="00000-000" />`;
      }
    
    case 'cnpjfield':
      switch (example) {
        case 'Basic CNPJ':
          return `<CNPJField 
  label="CNPJ" 
  placeholder="00.000.000/0000-00"
  onChange={handleCNPJChange}
/>`;
        case 'With Formatting':
          return `<CNPJField 
  label="Company CNPJ" 
  placeholder="00.000.000/0000-00"
  onChange={handleCNPJChange}
/>`;
        case 'With Validation':
          return `<CNPJField 
  label="CNPJ" 
  placeholder="00.000.000/0000-00"
  onChange={handleCNPJChange}
/>`;
        default:
          return `<CNPJField label="CNPJ" placeholder="00.000.000/0000-00" />`;
      }
    
    case 'cpffield':
      switch (example) {
        case 'Basic CPF':
          return `<CPFField 
  label="CPF" 
  placeholder="000.000.000-00"
  onChange={handleCPFChange}
/>`;
        case 'With Formatting':
          return `<CPFField 
  label="Individual CPF" 
  placeholder="000.000.000-00"
  onChange={handleCPFChange}
/>`;
        case 'With Validation':
          return `<CPFField 
  label="CPF" 
  placeholder="000.000.000-00"
  onChange={handleCPFChange}
/>`;
        default:
          return `<CPFField label="CPF" placeholder="000.000.000-00" />`;
      }
    
    case 'rating':
      switch (example) {
        case 'Star Rating':
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="star"
  showValue
  showLabels
  max={5}
/>`;
        case 'Thumbs Rating':
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="thumbs"
  showValue
  showLabels
  max={2}
/>
// Note: Like comes first, then Dislike`;
        case 'Heart Rating':
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="heart"
  showValue
  showLabels
  max={5}
/>`;
        case 'Emoji Rating':
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="emoji"
  showValue
  showLabels
  max={5}
/>`;
        case 'Half Precision':
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="star"
  precision={0.5}
  showValue
  max={5}
/>`;
        case 'Read Only':
          return `<Rating
  value={4}
  readOnly
  showValue
  variant="star"
  max={5}
/>`;
        default:
          return `<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  variant="star"
  showValue
  max={5}
/>`;
      }
    
    case 'colorpicker':
      switch (example) {
        case 'Basic Color Picker':
          return `<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  label="Choose a color"
  showPresets
  showCustomInput
/>`;
        case 'With Custom Input':
          return `<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  label="Custom Color"
  showPresets={false}
  showCustomInput
  showHexInput
  showRgbInput
  showHslInput
/>`;
        case 'All Formats':
          return `<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  label="Color with All Formats"
  showPresets
  showCustomInput
  showHexInput
  showRgbInput
  showHslInput
/>`;
        case 'Different Variants':
          return `<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  variant="outlined"
  size="large"
  label="Outlined Large"
  showPresets
/>
<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  variant="filled"
  size="small"
  label="Filled Small"
  showPresets
/>`;
        default:
          return `<ColorPicker
  value={color}
  onChange={(value) => setColor(value)}
  label="Choose a color"
  showPresets
/>`;
      }
    
    case 'slider':
      switch (example) {
        case 'Basic Slider':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Volume"
  helperText="Adjust the volume level"
  min={0}
  max={100}
/>`;
        case 'With Value Display':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Progress"
  showValue
  showChips
  helperText="Current progress: 75%"
  min={0}
  max={100}
/>`;
        case 'Range Slider':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  range
  label="Price Range"
  showValue
  showChips
  min={0}
  max={1000}
  step={10}
  helperText="Select your price range"
/>`;
        case 'With Marks':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Difficulty Level"
  showMarks
  showValue
  step={10}
  helperText="Choose difficulty level"
  min={0}
  max={100}
/>`;
        case 'Vertical Slider':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Volume"
  orientation="vertical"
  showValue
  helperText="Vertical slider"
  min={0}
  max={100}
/>`;
        case 'Custom Formatter':
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Price"
  min={0}
  max={10000}
  step={100}
  showValue
  showMinMax
  helperText="Select price range"
/>`;
        default:
          return `<Slider
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  label="Default Slider"
  showValue
  min={0}
  max={100}
/>`;
      }
    
    case 'imageupload':
      switch (example) {
        case 'Basic ImageUpload':
          return `<ImageUpload
  label="Upload Images"
  helperText="Select images to upload"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        case 'With Preview':
          return `<ImageUpload
  label="Upload with Preview"
  showPreview
  showFileList
  helperText="Images will be previewed after selection"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        case 'Single File':
          return `<ImageUpload
  label="Single Image Upload"
  multiple={false}
  maxFiles={1}
  helperText="Upload only one image"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        case 'With Constraints':
          return `<ImageUpload
  label="Constrained Upload"
  maxFiles={3}
  maxFileSize={2 * 1024 * 1024}
  accept="image/jpeg,image/png"
  helperText="Maximum 3 files, 2MB each, JPEG/PNG only"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        case 'With Compression':
          return `<ImageUpload
  label="Compressed Upload"
  compressImages
  imageQuality={0.8}
  maxImageWidth={1920}
  maxImageHeight={1080}
  helperText="Images will be automatically compressed"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        case 'Custom Text':
          return `<ImageUpload
  label="Custom Upload"
  uploadText="Choose Photos"
  dragText="Drag photos here"
  dropText="Drop photos to upload"
  helperText="Custom text for all upload actions"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
        default:
          return `<ImageUpload
  label="Default ImageUpload"
  onChange={(files) => console.log('Files changed:', files)}
/>`;
      }
    
    case 'progressbar':
      switch (example) {
        case 'Basic ProgressBar':
          return `<ProgressBar
  value={50}
  label="Progress"
  helperText="Current progress status"
/>`;
        case 'Linear Progress':
          return `<ProgressBar
  variant="linear"
  value={75}
  label="Linear Progress"
  helperText="Linear progress bar example"
/>`;
        case 'Circular Progress':
          return `<ProgressBar
  variant="circular"
  value={60}
  label="Circular Progress"
  helperText="Circular progress bar example"
/>`;
        case 'Step Progress':
          return `<ProgressBar
  variant="step"
  currentStep={2}
  totalSteps={5}
  steps={['Start', 'Process', 'Review', 'Approve', 'Complete']}
  label="Step Progress"
  helperText="Step-by-step progress example"
/>`;
        case 'Indeterminate':
          return `<ProgressBar
  indeterminate
  label="Loading..."
  helperText="Indeterminate progress for loading states"
/>`;
        case 'With Status':
          return `<ProgressBar
  variant="linear"
  value={100}
  color="success"
  label="Completed"
  helperText="Task completed successfully"
/>`;
        default:
          return `<ProgressBar
  value={25}
  label="Default ProgressBar"
  helperText="Default progress bar example"
/>`;
      }
    
    case 'datetimepicker':
      switch (example) {
        case 'Basic DateTimePicker':
          return `<DateTimePicker
  label="Select Date & Time"
  helperText="Choose your preferred date and time"
  onChange={(value) => console.log('DateTime changed:', value)}
/>`;
        case 'Date Only':
          return `<DateTimePicker
  showDate
  showTime={false}
  label="Birth Date"
  placeholder="Select your birth date"
  helperText="Date of birth"
  onChange={(value) => console.log('Date changed:', value)}
/>`;
        case 'Time Only':
          return `<DateTimePicker
  showDate={false}
  showTime
  label="Meeting Time"
  placeholder="Select meeting time"
  helperText="When should the meeting start?"
  onChange={(value) => console.log('Time changed:', value)}
/>`;
        case 'With Seconds':
          return `<DateTimePicker
  showSeconds
  label="Precise Time"
  helperText="Include seconds for precise timing"
  onChange={(value) => console.log('DateTime changed:', value)}
/>`;
        case '12-Hour Format':
          return `<DateTimePicker
  use24HourFormat={false}
  label="Event Time"
  helperText="12-hour format with AM/PM"
  onChange={(value) => console.log('DateTime changed:', value)}
/>`;
        case 'With Constraints':
          return `<DateTimePicker
  label="Future Date Only"
  disablePast
  helperText="Cannot select past dates"
  onChange={(value) => console.log('DateTime changed:', value)}
/>`;
        default:
          return `<DateTimePicker
  label="Default DateTimePicker"
  onChange={(value) => console.log('DateTime changed:', value)}
/>`;
      }
    
    case 'richtexteditor':
      switch (example) {
        case 'Basic Editor':
          return `<RichTextEditor
  placeholder="Start typing your content here..."
  minHeight={200}
/>`;
        case 'Read Only':
          return `<RichTextEditor
  value="<h2>Read Only Content</h2>
    <p>This content cannot be edited. The toolbar is disabled and the editor is not interactive.</p>
    <blockquote>This is a quote that cannot be modified.</blockquote>"
  readOnly
  minHeight={200}
/>`;
        case 'Custom Toolbar':
          return `<RichTextEditor
  value="<p>This editor only allows <strong>bold</strong> and <em>italic</em> formatting.</p>"
  allowedFormats={['bold', 'italic']}
  minHeight={200}
/>`;
        case 'Bottom Toolbar':
          return `<RichTextEditor
  value="<p>This editor has the toolbar at the bottom instead of the top.</p>"
  toolbarPosition="bottom"
  minHeight={200}
/>`;
        default:
          return `<RichTextEditor
  placeholder="Start typing your content here..."
  minHeight={200}
/>`;
      }
    
    default:
      return `<${componentName} />`;
  }
};
