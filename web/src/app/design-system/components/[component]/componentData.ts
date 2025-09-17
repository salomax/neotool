export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

export interface ComponentExample {
  title: string;
  description: string;
}

export interface ComponentData {
  name: string;
  description: string;
  status: 'stable' | 'beta' | 'deprecated';
  category: string;
  tags: string[];
  stories: boolean;
  tests: boolean;
  props: ComponentProp[];
  examples: ComponentExample[];
}

export const getComponentData = (name: string): ComponentData => {
  const componentDataMap: Record<string, ComponentData> = {
    button: {
      name: "Button",
      description: "Interactive elements for user actions with various styles and states",
      status: "stable",
      category: "atoms",
      tags: ["interaction", "action", "clickable"],
      stories: true,
      tests: true,
      props: [
        { name: "variant", type: "'contained' | 'outlined' | 'text'", required: false, description: "Button style variant", default: "'contained'" },
        { name: "color", type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'", required: false, description: "Button color theme", default: "'primary'" },
        { name: "size", type: "'small' | 'medium' | 'large'", required: false, description: "Button size", default: "'medium'" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the button", default: "false" },
        { name: "onClick", type: "(event: MouseEvent) => void", required: false, description: "Click handler function" },
        { name: "children", type: "ReactNode", required: true, description: "Button content" },
      ],
      examples: [
        { title: "Basic Usage", description: "Simple button with default styling" },
        { title: "Variants", description: "Different button styles (contained, outlined, text)" },
        { title: "Colors", description: "Various color themes" },
        { title: "Sizes", description: "Small, medium, and large button sizes" },
      ]
    },
    textfield: {
      name: "TextField",
      description: "Input fields for text data with validation and formatting",
      status: "stable",
      category: "atoms",
      tags: ["input", "form", "text"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Input label text" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
        { name: "value", type: "string", required: false, description: "Input value" },
        { name: "onChange", type: "(event: ChangeEvent) => void", required: false, description: "Change handler" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the input", default: "false" },
        { name: "required", type: "boolean", required: false, description: "Required field", default: "false" },
        { name: "type", type: "'text' | 'email' | 'password' | 'number'", required: false, description: "Input type", default: "'text'" },
      ],
      examples: [
        { title: "Basic Input", description: "Simple text input with label" },
        { title: "Validation", description: "Input with error states and validation" },
        { title: "Types", description: "Different input types (email, password, number)" },
      ]
    },
    avatar: {
      name: "Avatar",
      description: "User profile images and initials with fallback options",
      status: "stable",
      category: "atoms",
      tags: ["profile", "user", "image"],
      stories: true,
      tests: true,
      props: [
        { name: "src", type: "string", required: false, description: "Image source URL" },
        { name: "alt", type: "string", required: false, description: "Alt text for image" },
        { name: "children", type: "string", required: false, description: "Text to display (usually initials)" },
        { name: "size", type: "number | 'small' | 'medium' | 'large'", required: false, description: "Avatar size", default: "'medium'" },
        { name: "variant", type: "'circular' | 'rounded' | 'square'", required: false, description: "Avatar shape", default: "'circular'" },
      ],
      examples: [
        { title: "With Image", description: "Avatar with profile image" },
        { title: "With Initials", description: "Avatar showing user initials" },
        { title: "Sizes", description: "Different avatar sizes" },
      ]
    },
    badge: {
      name: "Badge",
      description: "Small status indicators and notifications",
      status: "stable",
      category: "atoms",
      tags: ["status", "notification", "indicator"],
      stories: true,
      tests: true,
      props: [
        { name: "badgeContent", type: "ReactNode", required: true, description: "Content to display in badge" },
        { name: "children", type: "ReactNode", required: true, description: "Element to attach badge to" },
        { name: "color", type: "'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'", required: false, description: "Badge color", default: "'default'" },
        { name: "variant", type: "'standard' | 'dot'", required: false, description: "Badge style", default: "'standard'" },
        { name: "max", type: "number", required: false, description: "Maximum number to show", default: "99" },
      ],
      examples: [
        { title: "Notification Badge", description: "Badge showing notification count" },
        { title: "Status Indicator", description: "Dot badge for status indication" },
        { title: "Custom Content", description: "Badge with custom content" },
      ]
    },
    chip: {
      name: "Chip",
      description: "Compact elements for tags, filters, and selections",
      status: "stable",
      category: "atoms",
      tags: ["tag", "filter", "selection"],
      stories: false,
      tests: false,
      props: [
        { name: "label", type: "ReactNode", required: true, description: "Chip content" },
        { name: "color", type: "'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'", required: false, description: "Chip color", default: "'default'" },
        { name: "variant", type: "'filled' | 'outlined'", required: false, description: "Chip style", default: "'filled'" },
        { name: "size", type: "'small' | 'medium'", required: false, description: "Chip size", default: "'medium'" },
        { name: "onDelete", type: "() => void", required: false, description: "Delete handler" },
        { name: "clickable", type: "boolean", required: false, description: "Make chip clickable", default: "false" },
      ],
      examples: [
        { title: "Basic Chip", description: "Simple chip with label" },
        { title: "Deletable", description: "Chip with delete functionality" },
        { title: "Clickable", description: "Interactive clickable chip" },
      ]
    },
    checkboxfield: {
      name: "CheckboxField",
      description: "Boolean input with checkbox styling and form integration",
      status: "stable",
      category: "formFields",
      tags: ["input", "boolean", "checkbox", "form"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Checkbox label text" },
        { name: "checked", type: "boolean", required: false, description: "Checked state", default: "false" },
        { name: "onChange", type: "(event: ChangeEvent) => void", required: false, description: "Change handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the checkbox", default: "false" },
        { name: "indeterminate", type: "boolean", required: false, description: "Indeterminate state", default: "false" },
      ],
      examples: [
        { title: "Basic Checkbox", description: "Simple checkbox with label" },
        { title: "States", description: "Different checkbox states" },
        { title: "Indeterminate", description: "Indeterminate checkbox state" },
      ]
    },
    selectfield: {
      name: "SelectField",
      description: "Dropdown selection component with options",
      status: "stable",
      category: "formFields",
      tags: ["input", "select", "dropdown", "form"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Select label text" },
        { name: "value", type: "string | string[]", required: false, description: "Selected value(s)" },
        { name: "onChange", type: "(event: ChangeEvent) => void", required: false, description: "Change handler" },
        { name: "options", type: "Array<{value: string, label: string}>", required: true, description: "Select options" },
        { name: "multiple", type: "boolean", required: false, description: "Allow multiple selections", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the select", default: "false" },
      ],
      examples: [
        { title: "Basic Select", description: "Simple dropdown selection" },
        { title: "Multiple Select", description: "Multi-selection dropdown" },
        { title: "With Options", description: "Select with predefined options" },
      ]
    },
    currencyfield: {
      name: "CurrencyField",
      description: "Formatted input for monetary values with currency symbols",
      status: "stable",
      category: "formFields",
      tags: ["input", "currency", "money", "form"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "number", required: false, description: "Currency value" },
        { name: "onChange", type: "(value: number) => void", required: false, description: "Change handler" },
        { name: "currency", type: "string", required: false, description: "Currency code", default: "'USD'" },
        { name: "locale", type: "string", required: false, description: "Locale for formatting", default: "'en-US'" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Currency", description: "Simple currency input" },
        { title: "Different Currencies", description: "Various currency formats" },
        { title: "Formatted Display", description: "Properly formatted currency display" },
      ]
    },
    togglefield: {
      name: "ToggleField",
      description: "Switch input for boolean values with toggle styling",
      status: "stable",
      category: "formFields",
      tags: ["input", "toggle", "switch", "boolean"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Toggle label text" },
        { name: "checked", type: "boolean", required: false, description: "Toggle state", default: "false" },
        { name: "onChange", type: "(checked: boolean) => void", required: false, description: "Change handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the toggle", default: "false" },
        { name: "color", type: "'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'", required: false, description: "Toggle color", default: "'primary'" },
      ],
      examples: [
        { title: "Basic Toggle", description: "Simple on/off switch" },
        { title: "With Labels", description: "Toggle with descriptive labels" },
        { title: "Different States", description: "Various toggle states and colors" },
      ]
    },
    datepickers: {
      name: "DatePicker",
      description: "Date selection input with calendar popup",
      status: "stable",
      category: "formFields",
      tags: ["input", "date", "calendar", "picker"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Date picker label" },
        { name: "value", type: "Date | null", required: false, description: "Selected date" },
        { name: "onChange", type: "(date: Date | null) => void", required: false, description: "Change handler" },
        { name: "minDate", type: "Date", required: false, description: "Minimum selectable date" },
        { name: "maxDate", type: "Date", required: false, description: "Maximum selectable date" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the picker", default: "false" },
      ],
      examples: [
        { title: "Basic Date Picker", description: "Simple date selection" },
        { title: "With Constraints", description: "Date picker with min/max dates" },
        { title: "Different Formats", description: "Various date formats and locales" },
      ]
    },
    fileuploader: {
      name: "FileUploader",
      description: "File upload component with drag and drop support",
      status: "stable",
      category: "molecules",
      tags: ["upload", "file", "drag-drop", "input"],
      stories: false,
      tests: false,
      props: [
        { name: "onUpload", type: "(files: File[]) => void", required: true, description: "Upload handler" },
        { name: "accept", type: "string", required: false, description: "Accepted file types", default: "'*'" },
        { name: "multiple", type: "boolean", required: false, description: "Allow multiple files", default: "false" },
        { name: "maxSize", type: "number", required: false, description: "Maximum file size in bytes" },
        { name: "disabled", type: "boolean", required: false, description: "Disable upload", default: "false" },
      ],
      examples: [
        { title: "Basic Upload", description: "Simple file upload area" },
        { title: "Drag & Drop", description: "Drag and drop file upload" },
        { title: "Multiple Files", description: "Upload multiple files at once" },
      ]
    },
    autocompletefield: {
      name: "AutocompleteField",
      description: "Text input with auto-completion suggestions and dropdown",
      status: "stable",
      category: "formFields",
      tags: ["input", "autocomplete", "search", "suggestions"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "Input value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "options", type: "string[]", required: true, description: "Available options" },
        { name: "freeSolo", type: "boolean", required: false, description: "Allow custom input", default: "false" },
        { name: "multiple", type: "boolean", required: false, description: "Allow multiple selections", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Autocomplete", description: "Simple autocomplete with suggestions" },
        { title: "Free Solo", description: "Autocomplete that allows custom input" },
        { title: "Multiple Selection", description: "Select multiple options from suggestions" },
      ]
    },
    numberfield: {
      name: "NumberField",
      description: "Input field specifically for numerical values with validation",
      status: "stable",
      category: "formFields",
      tags: ["input", "number", "numeric", "validation"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "number", required: false, description: "Numeric value" },
        { name: "onChange", type: "(value: number) => void", required: false, description: "Change handler" },
        { name: "min", type: "number", required: false, description: "Minimum value" },
        { name: "max", type: "number", required: false, description: "Maximum value" },
        { name: "step", type: "number", required: false, description: "Step increment", default: "1" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Number", description: "Simple numeric input" },
        { title: "With Constraints", description: "Number input with min/max values" },
        { title: "Decimal Input", description: "Number input with decimal precision" },
      ]
    },
    passwordfield: {
      name: "PasswordField",
      description: "Input field for passwords with visibility toggle",
      status: "stable",
      category: "formFields",
      tags: ["input", "password", "security", "visibility"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "Password value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "showPassword", type: "boolean", required: false, description: "Show password text", default: "false" },
        { name: "onToggleVisibility", type: "() => void", required: false, description: "Toggle visibility handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Password", description: "Simple password input with toggle" },
        { title: "With Validation", description: "Password field with strength indicator" },
        { title: "Confirm Password", description: "Password confirmation field" },
      ]
    },
    percentfield: {
      name: "PercentField",
      description: "Input field for percentage values with proper formatting",
      status: "stable",
      category: "formFields",
      tags: ["input", "percentage", "percent", "numeric"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "number", required: false, description: "Percentage value (0-100)" },
        { name: "onChange", type: "(value: number) => void", required: false, description: "Change handler" },
        { name: "min", type: "number", required: false, description: "Minimum percentage", default: "0" },
        { name: "max", type: "number", required: false, description: "Maximum percentage", default: "100" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Percentage", description: "Simple percentage input" },
        { title: "With Range", description: "Percentage input with min/max constraints" },
        { title: "Formatted Display", description: "Percentage with proper formatting" },
      ]
    },
    radiogroupfield: {
      name: "RadioGroupField",
      description: "Group of radio buttons for single selection",
      status: "stable",
      category: "formFields",
      tags: ["input", "radio", "selection", "group"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Group label text" },
        { name: "value", type: "string", required: false, description: "Selected value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "options", type: "Array<{value: string, label: string}>", required: true, description: "Radio options" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the group", default: "false" },
      ],
      examples: [
        { title: "Basic Radio Group", description: "Simple radio button group" },
        { title: "With Labels", description: "Radio group with descriptive labels" },
        { title: "Vertical Layout", description: "Radio buttons in vertical layout" },
      ]
    },
    tooltip: {
      name: "Tooltip",
      description: "Displays informative text when a user hovers over an element",
      status: "stable",
      category: "atoms",
      tags: ["info", "hover", "help", "overlay"],
      stories: true,
      tests: false,
      props: [
        { name: "title", type: "ReactNode", required: true, description: "Tooltip content" },
        { name: "children", type: "ReactElement", required: true, description: "Element to attach tooltip to" },
        { name: "placement", type: "'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top'", required: false, description: "Tooltip placement", default: "'bottom'" },
        { name: "arrow", type: "boolean", required: false, description: "Show arrow", default: "false" },
        { name: "open", type: "boolean", required: false, description: "Control tooltip visibility" },
      ],
      examples: [
        { title: "Basic Tooltip", description: "Simple tooltip on hover" },
        { title: "With Arrow", description: "Tooltip with arrow pointer" },
        { title: "Different Placements", description: "Tooltips in various positions" },
      ]
    },
    link: {
      name: "Link",
      description: "Navigational elements for directing users",
      status: "stable",
      category: "atoms",
      tags: ["navigation", "anchor", "hyperlink"],
      stories: true,
      tests: false,
      props: [
        { name: "href", type: "string", required: true, description: "Link destination" },
        { name: "children", type: "ReactNode", required: true, description: "Link content" },
        { name: "target", type: "'_blank' | '_self' | '_parent' | '_top'", required: false, description: "Link target", default: "'_self'" },
        { name: "color", type: "'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'", required: false, description: "Link color", default: "'primary'" },
        { name: "underline", type: "'always' | 'hover' | 'none'", required: false, description: "Underline style", default: "'hover'" },
      ],
      examples: [
        { title: "Basic Link", description: "Simple text link" },
        { title: "External Link", description: "Link that opens in new tab" },
        { title: "Styled Link", description: "Link with custom styling" },
      ]
    },
    loadingspinner: {
      name: "LoadingSpinner",
      description: "Indicates ongoing processes and loading states",
      status: "stable",
      category: "atoms",
      tags: ["feedback", "progress", "loading"],
      stories: true,
      tests: false,
      props: [
        { name: "size", type: "number | 'small' | 'medium' | 'large'", required: false, description: "Spinner size", default: "'medium'" },
        { name: "color", type: "'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'", required: false, description: "Spinner color", default: "'primary'" },
        { name: "message", type: "string", required: false, description: "Loading message" },
        { name: "thickness", type: "number", required: false, description: "Stroke thickness", default: "3.6" },
      ],
      examples: [
        { title: "Basic Spinner", description: "Simple loading spinner" },
        { title: "With Message", description: "Spinner with loading text" },
        { title: "Different Sizes", description: "Various spinner sizes" },
      ]
    },
    pageskeleton: {
      name: "PageSkeleton",
      description: "Placeholder for content while loading",
      status: "stable",
      category: "atoms",
      tags: ["feedback", "loading", "placeholder"],
      stories: true,
      tests: false,
      props: [
        { name: "variant", type: "'text' | 'rectangular' | 'circular'", required: false, description: "Skeleton shape", default: "'text'" },
        { name: "width", type: "number | string", required: false, description: "Skeleton width" },
        { name: "height", type: "number | string", required: false, description: "Skeleton height" },
        { name: "animation", type: "'pulse' | 'wave' | false", required: false, description: "Animation type", default: "'pulse'" },
      ],
      examples: [
        { title: "Text Skeleton", description: "Skeleton for text content" },
        { title: "Card Skeleton", description: "Skeleton for card layouts" },
        { title: "List Skeleton", description: "Skeleton for list items" },
      ]
    },
    asyncautocomplete: {
      name: "AsyncAutocomplete",
      description: "Autocomplete with asynchronous data loading",
      status: "beta",
      category: "molecules",
      tags: ["input", "async", "autocomplete", "loading"],
      stories: true,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "Input value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "loadOptions", type: "(query: string) => Promise<Option[]>", required: true, description: "Function to load options asynchronously" },
        { name: "loading", type: "boolean", required: false, description: "Loading state", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Async", description: "Simple async autocomplete" },
        { title: "With Loading", description: "Async autocomplete with loading state" },
        { title: "API Integration", description: "Autocomplete connected to API" },
      ]
    },
    confirmdialog: {
      name: "ConfirmDialog",
      description: "Modal dialog for user confirmation",
      status: "stable",
      category: "molecules",
      tags: ["feedback", "modal", "confirmation", "dialog"],
      stories: true,
      tests: false,
      props: [
        { name: "open", type: "boolean", required: true, description: "Dialog visibility" },
        { name: "title", type: "string", required: true, description: "Dialog title" },
        { name: "message", type: "string", required: true, description: "Confirmation message" },
        { name: "onConfirm", type: "() => void", required: true, description: "Confirm handler" },
        { name: "onCancel", type: "() => void", required: true, description: "Cancel handler" },
        { name: "confirmText", type: "string", required: false, description: "Confirm button text", default: "'Confirm'" },
        { name: "cancelText", type: "string", required: false, description: "Cancel button text", default: "'Cancel'" },
      ],
      examples: [
        { title: "Basic Confirmation", description: "Simple confirmation dialog" },
        { title: "Delete Confirmation", description: "Confirmation for destructive actions" },
        { title: "Custom Buttons", description: "Dialog with custom button text" },
      ]
    },
    emptyerrorstate: {
      name: "EmptyErrorState",
      description: "Displays when no data is available or an error occurs",
      status: "stable",
      category: "molecules",
      tags: ["feedback", "empty", "error", "state"],
      stories: true,
      tests: false,
      props: [
        { name: "type", type: "'empty' | 'error' | 'loading'", required: true, description: "State type" },
        { name: "title", type: "string", required: true, description: "State title" },
        { name: "message", type: "string", required: false, description: "State message" },
        { name: "actionText", type: "string", required: false, description: "Action button text" },
        { name: "onAction", type: "() => void", required: false, description: "Action handler" },
      ],
      examples: [
        { title: "Empty State", description: "When no data is available" },
        { title: "Error State", description: "When an error occurs" },
        { title: "With Action", description: "State with action button" },
      ]
    },
    maskedfield: {
      name: "MaskedField",
      description: "Input field with predefined masks",
      status: "stable",
      category: "molecules",
      tags: ["input", "mask", "format", "validation"],
      stories: false,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "Input value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "mask", type: "string", required: true, description: "Input mask pattern" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Phone Mask", description: "Phone number with formatting" },
        { title: "Date Mask", description: "Date input with mask" },
        { title: "Custom Mask", description: "Custom mask pattern" },
      ]
    },
    searchfield: {
      name: "SearchField",
      description: "Input field specifically for search queries",
      status: "stable",
      category: "molecules",
      tags: ["input", "search", "query", "filter"],
      stories: true,
      tests: false,
      props: [
        { name: "placeholder", type: "string", required: false, description: "Search placeholder", default: "'Search...'" },
        { name: "value", type: "string", required: false, description: "Search value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "onSearch", type: "(query: string) => void", required: false, description: "Search handler" },
        { name: "loading", type: "boolean", required: false, description: "Loading state", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic Search", description: "Simple search field" },
        { title: "With Loading", description: "Search field with loading state" },
        { title: "Advanced Search", description: "Search with filters and options" },
      ]
    },
    toastprovider: {
      name: "ToastProvider",
      description: "Provides context for displaying toast notifications",
      status: "stable",
      category: "molecules",
      tags: ["feedback", "notification", "toast", "context"],
      stories: false,
      tests: false,
      props: [
        { name: "children", type: "ReactNode", required: true, description: "Child components" },
        { name: "position", type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", required: false, description: "Toast position", default: "'top-right'" },
        { name: "maxToasts", type: "number", required: false, description: "Maximum number of toasts", default: "5" },
      ],
      examples: [
        { title: "Basic Provider", description: "Simple toast provider setup" },
        { title: "With Position", description: "Toast provider with custom position" },
        { title: "Multiple Toasts", description: "Provider handling multiple toasts" },
      ]
    },
    cepfield: {
      name: "CEPField",
      description: "Input field for Brazilian postal codes (CEP)",
      status: "stable",
      category: "brazilianComponents",
      tags: ["input", "brazil", "cep", "postal"],
      stories: false,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "CEP value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "onBlur", type: "() => void", required: false, description: "Blur handler for validation" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic CEP", description: "Simple CEP input field" },
        { title: "With Validation", description: "CEP field with validation" },
        { title: "Auto Complete", description: "CEP field with address lookup" },
      ]
    },
    cnpjfield: {
      name: "CNPJField",
      description: "Input field for Brazilian company registration number (CNPJ)",
      status: "stable",
      category: "brazilianComponents",
      tags: ["input", "brazil", "cnpj", "company"],
      stories: false,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "CNPJ value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic CNPJ", description: "Simple CNPJ input field" },
        { title: "With Formatting", description: "CNPJ field with automatic formatting" },
        { title: "With Validation", description: "CNPJ field with validation" },
      ]
    },
    cpffield: {
      name: "CPFField",
      description: "Input field for Brazilian individual registration number (CPF)",
      status: "stable",
      category: "brazilianComponents",
      tags: ["input", "brazil", "cpf", "individual"],
      stories: false,
      tests: false,
      props: [
        { name: "label", type: "string", required: false, description: "Field label text" },
        { name: "value", type: "string", required: false, description: "CPF value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disable the field", default: "false" },
      ],
      examples: [
        { title: "Basic CPF", description: "Simple CPF input field" },
        { title: "With Formatting", description: "CPF field with automatic formatting" },
        { title: "With Validation", description: "CPF field with validation" },
      ]
    }
  };

  return componentDataMap[name.toLowerCase()] || {
    name: name,
    description: "Component description and usage guidelines",
    status: "stable",
    category: "atoms",
    tags: ["interaction", "action"],
    stories: true,
    tests: true,
    props: [
      { name: "variant", type: "string", required: false, description: "Component variant" },
      { name: "color", type: "string", required: false, description: "Component color" },
      { name: "disabled", type: "boolean", required: false, description: "Disable the component" },
    ],
    examples: [
      { title: "Basic Usage", description: "Simple component implementation" },
      { title: "Variants", description: "Different component styles" },
      { title: "Sizes", description: "Various component sizes" },
    ]
  };
};
