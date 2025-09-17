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
    
    case 'datepickers':
      switch (example) {
        case 'Basic Date Picker':
          return `<DatePicker 
  label="Select date" 
  value={null} 
/>`;
        case 'With Constraints':
          return `<DatePicker 
  label="Birth date" 
  value={null} 
  maxDate={new Date()} 
/>`;
        case 'Different Formats':
          return `<DatePicker 
  label="Start date" 
  value={null} 
  format="MM/dd/yyyy" 
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
    
    default:
      return `<${componentName} />`;
  }
};
