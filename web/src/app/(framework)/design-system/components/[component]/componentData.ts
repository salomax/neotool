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
  githubUrl: string;
  type?: 'custom' | 'mui-wrapper' | 'mui-simple';
  muiDocsUrl?: string;
  codeSnippets?: Record<string, string>;
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
      githubUrl: "/web/src/shared/components/ui/atoms/Button.tsx",
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
      category: "formFields",
      tags: ["input", "form", "text"],
      stories: true,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/TextField.tsx",
      type: "mui-simple",
      muiDocsUrl: "https://mui.com/material-ui/react-text-field/",
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
      githubUrl: "/web/src/shared/components/ui/atoms/Avatar.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/Badge.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/Chip.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/CheckboxField.tsx",
      type: "mui-wrapper",
      muiDocsUrl: "https://mui.com/material-ui/react-checkbox/",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/SelectField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/CurrencyField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/ToggleField.tsx",
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
    datepickerfield: {
      name: "DatePickerField",
      description: "Date selection input with calendar popup",
      status: "stable",
      category: "formFields",
      tags: ["input", "date", "calendar", "picker"],
      stories: true,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/DatePickers.tsx",
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
      category: "formFields",
      tags: ["upload", "file", "drag-drop", "input"],
      stories: false,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/FileUploader.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/AutocompleteField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/NumberField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/PasswordField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/PercentField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/form/RadioGroupField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/Tooltip.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/Link.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/LoadingSpinner.tsx",
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
      githubUrl: "/web/src/shared/components/ui/atoms/PageSkeleton.tsx",
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
    drawer: {
      name: "Drawer",
      description: "Sliding panel for navigation, sidebars, and overlays",
      status: "stable",
      category: "atoms",
      tags: ["navigation", "sidebar", "overlay", "panel"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/Drawer.tsx",
      props: [
        { name: "open", type: "boolean", required: true, description: "Controls drawer visibility" },
        { name: "onClose", type: "() => void", required: true, description: "Callback when drawer is closed" },
        { name: "title", type: "string", required: false, description: "Optional title displayed in drawer header" },
        { name: "showCloseButton", type: "boolean", required: false, description: "Show close button in header", default: "true" },
        { name: "showMenuButton", type: "boolean", required: false, description: "Show menu button in header", default: "false" },
        { name: "onMenuClick", type: "() => void", required: false, description: "Callback when menu button is clicked" },
        { name: "variant", type: "'temporary' | 'persistent' | 'permanent'", required: false, description: "Drawer variant type", default: "'temporary'" },
        { name: "anchor", type: "'left' | 'right' | 'top' | 'bottom'", required: false, description: "Drawer anchor position", default: "'left'" },
        { name: "width", type: "number | string", required: false, description: "Drawer width (for left/right anchors)", default: "280" },
        { name: "height", type: "number | string", required: false, description: "Drawer height (for top/bottom anchors)", default: "'100%'" },
        { name: "children", type: "ReactNode", required: true, description: "Drawer content" },
      ],
      examples: [
        { title: "Basic Drawer", description: "Simple drawer with navigation content" },
        { title: "With Title", description: "Drawer with header title and close button" },
        { title: "Different Anchors", description: "Drawer positioned on different sides" },
        { title: "Persistent Drawer", description: "Drawer that stays open and pushes content" },
        { title: "Custom Styling", description: "Drawer with custom colors and styling" },
      ]
    },
    rating: {
      name: "Rating",
      description: "Interactive rating component with multiple variants and customization options",
      status: "stable",
      category: "atoms",
      tags: ["rating", "stars", "feedback", "interaction", "evaluation"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/Rating.tsx",
      props: [
        { name: "value", type: "number", required: false, description: "Current rating value", default: "0" },
        { name: "max", type: "number", required: false, description: "Maximum rating value", default: "5" },
        { name: "size", type: "'small' | 'medium' | 'large'", required: false, description: "Size of the rating icons", default: "'medium'" },
        { name: "variant", type: "'star' | 'thumbs' | 'heart' | 'emoji'", required: false, description: "Visual variant of the rating", default: "'star'" },
        { name: "color", type: "'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'", required: false, description: "Color theme of the rating", default: "'primary'" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the rating is read-only", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the rating is disabled", default: "false" },
        { name: "showLabels", type: "boolean", required: false, description: "Whether to show labels on hover", default: "false" },
        { name: "showValue", type: "boolean", required: false, description: "Whether to show the current value", default: "false" },
        { name: "precision", type: "number", required: false, description: "Precision of the rating (1 for whole numbers, 0.5 for half ratings)", default: "1" },
        { name: "onChange", type: "(value: number) => void", required: false, description: "Callback fired when rating changes" },
        { name: "onHover", type: "(value: number) => void", required: false, description: "Callback fired when hovering over rating" },
        { name: "onLeave", type: "() => void", required: false, description: "Callback fired when mouse leaves rating" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Star Rating", description: "Classic 5-star rating system" },
        { title: "Thumbs Rating", description: "Like/dislike thumbs up/down rating" },
        { title: "Heart Rating", description: "Heart-based rating for favorites" },
        { title: "Emoji Rating", description: "Emoji-based emotional rating" },
        { title: "Half Precision", description: "Rating with half-star precision" },
        { title: "Read Only", description: "Display-only rating without interaction" }
      ]
    },
    chart: {
      name: "Chart",
      description: "Data visualization component with multiple chart types (line, bar, pie, area)",
      status: "stable",
      category: "molecules",
      tags: ["data", "visualization", "charts", "analytics"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/molecules/Chart.tsx",
      props: [
        { name: "type", type: "'line' | 'bar' | 'pie' | 'area'", required: true, description: "Chart type" },
        { name: "data", type: "ChartData[]", required: true, description: "Chart data array" },
        { name: "title", type: "string", required: false, description: "Chart title" },
        { name: "width", type: "number | string", required: false, description: "Chart width", default: "'100%'" },
        { name: "height", type: "number | string", required: false, description: "Chart height", default: "300" },
        { name: "showLegend", type: "boolean", required: false, description: "Show legend", default: "true" },
        { name: "showTooltip", type: "boolean", required: false, description: "Show tooltip", default: "true" },
        { name: "showGrid", type: "boolean", required: false, description: "Show grid", default: "true" },
        { name: "colors", type: "string[]", required: false, description: "Custom colors array" },
        { name: "xAxisKey", type: "string", required: false, description: "X-axis data key", default: "'name'" },
        { name: "yAxisKey", type: "string", required: false, description: "Y-axis data key", default: "'value'" },
        { name: "dataKey", type: "string", required: false, description: "Data key for chart", default: "'value'" },
        { name: "nameKey", type: "string", required: false, description: "Name key for pie chart", default: "'name'" },
        { name: "valueKey", type: "string", required: false, description: "Value key for pie chart", default: "'value'" },
        { name: "strokeWidth", type: "number", required: false, description: "Line/area stroke width", default: "2" },
        { name: "fillOpacity", type: "number", required: false, description: "Area fill opacity", default: "0.6" },
        { name: "animationDuration", type: "number", required: false, description: "Animation duration in ms", default: "800" },
        { name: "margin", type: "object", required: false, description: "Chart margins" },
        { name: "sx", type: "object", required: false, description: "Custom styles" },
      ],
      examples: [
        { title: "Line Chart", description: "Time series data visualization" },
        { title: "Bar Chart", description: "Categorical data comparison" },
        { title: "Pie Chart", description: "Proportional data representation" },
        { title: "Area Chart", description: "Cumulative data over time" },
        { title: "Custom Colors", description: "Charts with custom color schemes" },
        { title: "Responsive Charts", description: "Charts that adapt to container size" },
      ]
    },
    asyncautocomplete: {
      name: "AsyncAutocomplete",
      description: "Autocomplete with asynchronous data loading",
      status: "beta",
      category: "formFields",
      tags: ["input", "async", "autocomplete", "loading"],
      stories: true,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/AsyncAutocomplete.tsx",
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
      githubUrl: "/web/src/shared/components/ui/molecules/ConfirmDialog.tsx",
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
      githubUrl: "/web/src/shared/components/ui/molecules/EmptyErrorState.tsx",
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
      category: "formFields",
      tags: ["input", "mask", "format", "validation"],
      stories: false,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/MaskedField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/molecules/SearchField.tsx",
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
      githubUrl: "/web/src/shared/components/ui/molecules/ToastProvider.tsx",
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
      category: "formFields",
      tags: ["input", "brazil", "cep", "postal"],
      stories: false,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/br/CEPField.tsx",
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
      category: "formFields",
      tags: ["input", "brazil", "cnpj", "company"],
      stories: false,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/br/CNPJField.tsx",
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
      category: "formFields",
      tags: ["input", "brazil", "cpf", "individual"],
      stories: false,
      tests: false,
      githubUrl: "/web/src/shared/components/ui/atoms/form/br/CPFField.tsx",
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
    },
    colorpicker: {
      name: "ColorPicker",
      description: "Comprehensive color picker with preset colors and multiple format support",
      status: "stable",
      category: "atoms",
      tags: ["color", "picker", "palette", "input", "hex", "rgb", "hsl"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/ColorPicker.tsx",
      props: [
        { name: "value", type: "string", required: false, description: "Selected color value", default: "'#000000'" },
        { name: "onChange", type: "(color: string) => void", required: false, description: "Callback fired when color changes" },
        { name: "variant", type: "'standard' | 'outlined' | 'filled'", required: false, description: "Visual variant of the button", default: "'standard'" },
        { name: "size", type: "'small' | 'medium' | 'large'", required: false, description: "Size of the component", default: "'medium'" },
        { name: "showPresets", type: "boolean", required: false, description: "Whether to show preset colors", default: "true" },
        { name: "showCustomInput", type: "boolean", required: false, description: "Whether to show custom color input", default: "true" },
        { name: "showHexInput", type: "boolean", required: false, description: "Whether to show hex input format", default: "true" },
        { name: "showRgbInput", type: "boolean", required: false, description: "Whether to show RGB input format", default: "false" },
        { name: "showHslInput", type: "boolean", required: false, description: "Whether to show HSL input format", default: "false" },
        { name: "presets", type: "string[]", required: false, description: "Array of preset colors" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the component is disabled", default: "false" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the component is read-only", default: "false" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text", default: "'Select a color'" },
        { name: "label", type: "string", required: false, description: "Label for the color picker" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the component" },
        { name: "error", type: "boolean", required: false, description: "Whether to show error state", default: "false" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic Color Picker", description: "Simple color picker with presets" },
        { title: "With Custom Input", description: "Color picker with custom input field" },
        { title: "All Formats", description: "Color picker supporting Hex, RGB, and HSL" },
        { title: "Different Variants", description: "Standard, outlined, and filled variants" }
      ]
    },
    slider: {
      name: "Slider",
      description: "Versatile slider component with single value, range, and various customization options",
      status: "stable",
      category: "atoms",
      tags: ["slider", "range", "input", "control", "value", "selection"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/Slider.tsx",
      props: [
        { name: "value", type: "number | number[]", required: false, description: "Current value(s) of the slider", default: "0" },
        { name: "min", type: "number", required: false, description: "Minimum value of the slider", default: "0" },
        { name: "max", type: "number", required: false, description: "Maximum value of the slider", default: "100" },
        { name: "step", type: "number", required: false, description: "Step size for the slider", default: "1" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the slider is disabled", default: "false" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the slider is read-only", default: "false" },
        { name: "showValue", type: "boolean", required: false, description: "Whether to show value labels", default: "true" },
        { name: "showChips", type: "boolean", required: false, description: "Whether to show value chips", default: "false" },
        { name: "showMinMax", type: "boolean", required: false, description: "Whether to show min/max labels", default: "false" },
        { name: "showMarks", type: "boolean", required: false, description: "Whether to show step marks", default: "false" },
        { name: "marks", type: "Array<{value: number, label: string}>", required: false, description: "Custom marks for the slider" },
        { name: "orientation", type: "'horizontal' | 'vertical'", required: false, description: "Orientation of the slider", default: "'horizontal'" },
        { name: "size", type: "'small' | 'medium'", required: false, description: "Size of the slider", default: "'medium'" },
        { name: "color", type: "'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'", required: false, description: "Color theme of the slider", default: "'primary'" },
        { name: "range", type: "boolean", required: false, description: "Whether to use range mode (dual thumbs)", default: "false" },
        { name: "label", type: "string", required: false, description: "Label for the slider" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the slider" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "valueFormatter", type: "(value: number) => string", required: false, description: "Custom value formatter", default: "(val) => val.toString()" },
        { name: "onChange", type: "(value: number | number[]) => void", required: false, description: "Callback fired when the value changes" },
        { name: "onChangeCommitted", type: "(value: number | number[]) => void", required: false, description: "Callback fired when the value change is committed" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic Slider", description: "Simple slider with default settings" },
        { title: "With Value Display", description: "Slider showing current value" },
        { title: "Range Slider", description: "Dual-thumb range selection" },
        { title: "With Marks", description: "Slider with step marks and labels" },
        { title: "Vertical Slider", description: "Vertically oriented slider" },
        { title: "Custom Formatter", description: "Slider with custom value formatting" }
      ]
    },
    switch: {
      name: "Switch",
      description: "Versatile switch component for toggle states with various customization options",
      status: "stable",
      category: "atoms",
      tags: ["switch", "toggle", "input", "control", "binary", "state"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/Switch.tsx",
      props: [
        { name: "checked", type: "boolean", required: false, description: "Whether the switch is checked" },
        { name: "defaultChecked", type: "boolean", required: false, description: "Default checked state (uncontrolled)", default: "false" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the switch is disabled", default: "false" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the switch is read-only", default: "false" },
        { name: "size", type: "'small' | 'medium'", required: false, description: "Size of the switch", default: "'medium'" },
        { name: "color", type: "'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'", required: false, description: "Color theme of the switch", default: "'primary'" },
        { name: "label", type: "string", required: false, description: "Label for the switch" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the switch" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "showLabel", type: "boolean", required: false, description: "Whether to show the label", default: "true" },
        { name: "labelPlacement", type: "'start' | 'end' | 'top' | 'bottom'", required: false, description: "Label placement", default: "'end'" },
        { name: "labelComponent", type: "React.ReactNode", required: false, description: "Custom label component" },
        { name: "checkedLabel", type: "string", required: false, description: "Custom checked label" },
        { name: "uncheckedLabel", type: "string", required: false, description: "Custom unchecked label" },
        { name: "showStatus", type: "boolean", required: false, description: "Whether to show status text", default: "false" },
        { name: "statusFormatter", type: "(checked: boolean) => string", required: false, description: "Custom status formatter", default: "(checked) => checked ? 'On' : 'Off'" },
        { name: "onChange", type: "(checked: boolean) => void", required: false, description: "Callback fired when the state changes" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic Switch", description: "Simple switch with default settings" },
        { title: "With Status", description: "Switch showing current state" },
        { title: "Custom Labels", description: "Switch with custom checked/unchecked labels" },
        { title: "Different Placements", description: "Switch with various label placements" },
        { title: "Different Sizes", description: "Small and medium sized switches" },
        { title: "Different Colors", description: "Switch with various color themes" }
      ]
    },
    datetimepicker: {
      name: "DateTimePicker",
      description: "Comprehensive date and time picker component with various customization options",
      status: "stable",
      category: "atoms",
      tags: ["datetime", "picker", "input", "calendar", "time", "date"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/DateTimePicker.tsx",
      props: [
        { name: "value", type: "Dayjs | null", required: false, description: "Current value of the date time picker" },
        { name: "defaultValue", type: "Dayjs | null", required: false, description: "Default value (uncontrolled)", default: "null" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the picker is disabled", default: "false" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the picker is read-only", default: "false" },
        { name: "required", type: "boolean", required: false, description: "Whether the picker is required", default: "false" },
        { name: "label", type: "string", required: false, description: "Label for the picker" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text", default: "'Select date and time'" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the picker" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "errorMessage", type: "string", required: false, description: "Error message" },
        { name: "size", type: "'small' | 'medium'", required: false, description: "Size of the picker", default: "'medium'" },
        { name: "variant", type: "'standard' | 'outlined' | 'filled'", required: false, description: "Variant of the input", default: "'outlined'" },
        { name: "showTime", type: "boolean", required: false, description: "Whether to show time picker", default: "true" },
        { name: "showDate", type: "boolean", required: false, description: "Whether to show date picker", default: "true" },
        { name: "format", type: "string", required: false, description: "Format for display" },
        { name: "minDateTime", type: "Dayjs | null", required: false, description: "Minimum selectable date" },
        { name: "maxDateTime", type: "Dayjs | null", required: false, description: "Maximum selectable date" },
        { name: "disablePast", type: "boolean", required: false, description: "Whether to disable past dates", default: "false" },
        { name: "disableFuture", type: "boolean", required: false, description: "Whether to disable future dates", default: "false" },
        { name: "showSeconds", type: "boolean", required: false, description: "Whether to show seconds in time picker", default: "false" },
        { name: "use24HourFormat", type: "boolean", required: false, description: "Whether to use 24-hour format", default: "true" },
        { name: "showCalendarIcon", type: "boolean", required: false, description: "Whether to show calendar icon", default: "true" },
        { name: "showClockIcon", type: "boolean", required: false, description: "Whether to show clock icon", default: "true" },
        { name: "calendarIcon", type: "React.ReactNode", required: false, description: "Custom calendar icon" },
        { name: "clockIcon", type: "React.ReactNode", required: false, description: "Custom clock icon" },
        { name: "onChange", type: "(value: Dayjs | null) => void", required: false, description: "Callback fired when the value changes" },
        { name: "onOpen", type: "() => void", required: false, description: "Callback fired when the picker opens" },
        { name: "onClose", type: "() => void", required: false, description: "Callback fired when the picker closes" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic DateTimePicker", description: "Simple date and time picker with default settings" },
        { title: "Date Only", description: "Date picker without time selection" },
        { title: "Time Only", description: "Time picker without date selection" },
        { title: "With Seconds", description: "DateTime picker including seconds" },
        { title: "12-Hour Format", description: "DateTime picker with 12-hour format and AM/PM" },
        { title: "With Constraints", description: "DateTime picker with date range constraints" }
      ]
    },
    imageupload: {
      name: "ImageUpload",
      description: "Comprehensive image upload component with drag & drop, preview, and validation features",
      status: "stable",
      category: "atoms",
      tags: ["upload", "image", "drag", "drop", "preview", "file", "validation"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/ImageUpload.tsx",
      props: [
        { name: "value", type: "File[]", required: false, description: "Current uploaded files" },
        { name: "defaultValue", type: "File[]", required: false, description: "Default files (uncontrolled)", default: "[]" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the upload is disabled", default: "false" },
        { name: "required", type: "boolean", required: false, description: "Whether the upload is required", default: "false" },
        { name: "label", type: "string", required: false, description: "Label for the upload" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the upload" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "errorMessage", type: "string", required: false, description: "Error message" },
        { name: "maxFiles", type: "number", required: false, description: "Maximum number of files allowed", default: "5" },
        { name: "maxFileSize", type: "number", required: false, description: "Maximum file size in bytes", default: "5 * 1024 * 1024" },
        { name: "accept", type: "string", required: false, description: "Accepted file types", default: "'image/*'" },
        { name: "multiple", type: "boolean", required: false, description: "Whether to allow multiple files", default: "true" },
        { name: "showDragDrop", type: "boolean", required: false, description: "Whether to show drag and drop area", default: "true" },
        { name: "showPreview", type: "boolean", required: false, description: "Whether to show file previews", default: "true" },
        { name: "showFileList", type: "boolean", required: false, description: "Whether to show file list", default: "true" },
        { name: "showProgress", type: "boolean", required: false, description: "Whether to show upload progress", default: "false" },
        { name: "uploadText", type: "string", required: false, description: "Custom upload text", default: "'Upload Images'" },
        { name: "dragText", type: "string", required: false, description: "Custom drag text", default: "'Drag and drop images here'" },
        { name: "dropText", type: "string", required: false, description: "Custom drop text", default: "'Drop images here'" },
        { name: "previewSize", type: "number", required: false, description: "Preview image size", default: "100" },
        { name: "compressImages", type: "boolean", required: false, description: "Whether to compress images", default: "false" },
        { name: "imageQuality", type: "number", required: false, description: "Image quality for compression (0-1)", default: "0.8" },
        { name: "maxImageWidth", type: "number", required: false, description: "Maximum image width for compression", default: "1920" },
        { name: "maxImageHeight", type: "number", required: false, description: "Maximum image height for compression", default: "1080" },
        { name: "onChange", type: "(files: File[]) => void", required: false, description: "Callback fired when files change" },
        { name: "onAdd", type: "(files: File[]) => void", required: false, description: "Callback fired when files are added" },
        { name: "onRemove", type: "(file: File, index: number) => void", required: false, description: "Callback fired when files are removed" },
        { name: "onUploadStart", type: "(files: File[]) => void", required: false, description: "Callback fired when upload starts" },
        { name: "onUploadComplete", type: "(files: File[]) => void", required: false, description: "Callback fired when upload completes" },
        { name: "onUploadError", type: "(error: Error) => void", required: false, description: "Callback fired when upload fails" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic ImageUpload", description: "Simple image upload with drag & drop" },
        { title: "With Preview", description: "Image upload with preview thumbnails" },
        { title: "Single File", description: "Upload component for single image only" },
        { title: "With Constraints", description: "Upload with file size and type constraints" },
        { title: "With Compression", description: "Upload with automatic image compression" },
        { title: "Custom Text", description: "Upload with custom text and labels" }
      ]
    },
    progressbar: {
      name: "ProgressBar",
      description: "Versatile progress indicator component with linear, circular, and step variants",
      status: "stable",
      category: "atoms",
      tags: ["progress", "indicator", "loading", "status", "bar", "circular", "step"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/atoms/ProgressBar.tsx",
      props: [
        { name: "value", type: "number", required: false, description: "Current progress value (0-100)", default: "0" },
        { name: "indeterminate", type: "boolean", required: false, description: "Whether the progress is indeterminate", default: "false" },
        { name: "variant", type: "'linear' | 'circular' | 'step'", required: false, description: "Progress bar variant", default: "'linear'" },
        { name: "size", type: "'small' | 'medium' | 'large'", required: false, description: "Progress bar size", default: "'medium'" },
        { name: "color", type: "'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'", required: false, description: "Progress bar color", default: "'primary'" },
        { name: "thickness", type: "number", required: false, description: "Progress bar thickness (for circular)", default: "4" },
        { name: "width", type: "number | string", required: false, description: "Progress bar width (for linear)" },
        { name: "height", type: "number", required: false, description: "Progress bar height (for linear)", default: "8" },
        { name: "showPercentage", type: "boolean", required: false, description: "Whether to show percentage", default: "true" },
        { name: "showLabel", type: "boolean", required: false, description: "Whether to show label", default: "true" },
        { name: "label", type: "string", required: false, description: "Custom label text" },
        { name: "helperText", type: "string", required: false, description: "Helper text below the progress bar" },
        { name: "error", type: "boolean", required: false, description: "Error state", default: "false" },
        { name: "errorMessage", type: "string", required: false, description: "Error message" },
        { name: "disabled", type: "boolean", required: false, description: "Whether the progress bar is disabled", default: "false" },
        { name: "currentStep", type: "number", required: false, description: "Current step index (0-based) for step variant", default: "0" },
        { name: "totalSteps", type: "number", required: false, description: "Total number of steps for step variant", default: "3" },
        { name: "steps", type: "string[]", required: false, description: "Step labels for step variant", default: "[]" },
        { name: "showStepContent", type: "boolean", required: false, description: "Whether to show step content for step variant", default: "false" },
        { name: "stepContent", type: "React.ReactNode[]", required: false, description: "Step content for step variant", default: "[]" },
        { name: "clickable", type: "boolean", required: false, description: "Whether steps are clickable for step variant", default: "false" },
        { name: "onStepClick", type: "(stepIndex: number) => void", required: false, description: "Callback fired when step is clicked for step variant" },
        { name: "stepStatus", type: "('completed' | 'active' | 'pending' | 'error')[]", required: false, description: "Step status for step variant", default: "[]" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic ProgressBar", description: "Simple progress bar with default settings" },
        { title: "Linear Progress", description: "Linear progress bar variant" },
        { title: "Circular Progress", description: "Circular progress bar variant" },
        { title: "Step Progress", description: "Step-by-step progress indicator" },
        { title: "Indeterminate", description: "Indeterminate progress for loading states" },
        { title: "With Status", description: "Progress bar with different status indicators" }
      ]
    },
    richtexteditor: {
      name: "RichTextEditor",
      description: "Rich text editor with comprehensive formatting options and toolbar",
      status: "stable",
      category: "molecules",
      tags: ["editor", "text", "formatting", "wysiwyg", "content"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/molecules/RichTextEditor.tsx",
      props: [
        { name: "value", type: "string", required: false, description: "HTML content of the editor" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Callback fired when content changes" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text when editor is empty", default: "'Start typing...'" },
        { name: "minHeight", type: "number", required: false, description: "Minimum height of the editor", default: "200" },
        { name: "maxHeight", type: "number", required: false, description: "Maximum height of the editor", default: "400" },
        { name: "readOnly", type: "boolean", required: false, description: "Whether the editor is read-only", default: "false" },
        { name: "showToolbar", type: "boolean", required: false, description: "Whether to show the toolbar", default: "true" },
        { name: "toolbarPosition", type: "'top' | 'bottom'", required: false, description: "Position of the toolbar", default: "'top'" },
        { name: "allowedFormats", type: "string[]", required: false, description: "Array of allowed formatting options" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic Editor", description: "Simple rich text editor with default toolbar" },
        { title: "Read Only", description: "Display formatted content without editing" },
        { title: "Custom Toolbar", description: "Editor with limited formatting options" },
        { title: "Bottom Toolbar", description: "Editor with toolbar positioned at bottom" }
      ]
    },
        tabs: {
          name: "Tabs",
          description: "Dynamic tabs component with creation, closing, and reordering capabilities",
          status: "stable",
          category: "molecules",
      tags: ["tabs", "navigation", "dynamic", "closable", "reorderable"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/molecules/Tabs.tsx",
      props: [
        { name: "tabs", type: "TabItem[]", required: true, description: "Array of tab items" },
        { name: "value", type: "string", required: false, description: "Currently active tab ID" },
        { name: "onChange", type: "(tabId: string) => void", required: false, description: "Callback fired when tab selection changes" },
        { name: "onTabClose", type: "(tabId: string) => void", required: false, description: "Callback fired when a tab is closed" },
        { name: "onTabAdd", type: "() => void", required: false, description: "Callback fired when a new tab is added" },
        { name: "showAddButton", type: "boolean", required: false, description: "Whether to show the add tab button", default: "true" },
        { name: "showCloseButtons", type: "boolean", required: false, description: "Whether to show close buttons on tabs", default: "true" },
        { name: "draggable", type: "boolean", required: false, description: "Whether tabs can be reordered by dragging", default: "false" },
        { name: "orientation", type: "'horizontal' | 'vertical'", required: false, description: "Tab orientation", default: "'horizontal'" },
        { name: "variant", type: "'standard' | 'scrollable' | 'fullWidth'", required: false, description: "Tab variant", default: "'scrollable'" },
        { name: "indicatorColor", type: "'primary' | 'secondary'", required: false, description: "Tab indicator color", default: "'primary'" },
        { name: "textColor", type: "'primary' | 'secondary' | 'inherit'", required: false, description: "Tab text color", default: "'primary'" },
        { name: "showBadges", type: "boolean", required: false, description: "Whether to show tab badges", default: "true" },
        { name: "maxTabs", type: "number", required: false, description: "Maximum number of tabs allowed", default: "10" },
        { name: "className", type: "string", required: false, description: "Custom CSS class name" },
        { name: "data-testid", type: "string", required: false, description: "Test identifier for testing" }
      ],
      examples: [
        { title: "Basic Static Tabs", description: "Simple static tabs without dynamic features" },
        { title: "Self-Managed Tabs", description: "Tabs that manage their own state internally" },
        { title: "Basic Tabs", description: "Simple tabs with basic functionality" },
        { title: "With Icons and Badges", description: "Tabs with icons and notification badges" },
        { title: "Vertical Tabs", description: "Tabs displayed vertically" },
        { title: "Dynamic Tabs", description: "Tabs with add/close functionality" },
        { title: "Scrollable Tabs", description: "Tabs that scroll when there are many" },
        { title: "Draggable Tabs", description: "Resort tabs by dragging" },
        { title: "Disabled Tabs", description: "Tabs with disabled state" }
      ],
      codeSnippets: {
        "Basic Static Tabs": `<Tabs
  tabs={[
    {
      id: 'overview',
      label: 'Overview',
      content: <div>Overview content</div>
    },
    {
      id: 'details',
      label: 'Details',
      content: <div>Details content</div>
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <div>Settings content</div>
    }
  ]}
  showAddButton={false}
  showCloseButtons={false}
/>`,
        "Self-Managed Tabs": `<Tabs
  tabs={[
    {
      id: 'welcome',
      label: 'Welcome',
      content: <div>Welcome content</div>,
      closable: true
    },
    {
      id: 'features',
      label: 'Features',
      content: <div>Features content</div>,
      closable: true
    }
  ]}
  showAddButton={true}
  showCloseButtons={true}
/>`,
        "Basic Tabs": `<Tabs
  tabs={[
    {
      id: 'tab1',
      label: 'Tab 1',
      content: <div>Content 1</div>
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: <div>Content 2</div>
    }
  ]}
/>`,
        "With Icons and Badges": `<Tabs
  tabs={[
    {
      id: 'inbox',
      label: 'Inbox',
      content: <div>Inbox content</div>,
      icon: <InboxIcon />,
      badge: 5,
      closable: true
    },
    {
      id: 'sent',
      label: 'Sent',
      content: <div>Sent content</div>,
      icon: <SendIcon />,
      badge: 12,
      closable: true
    }
  ]}
  showBadges={true}
/>`,
        "Vertical Tabs": `<Tabs
  tabs={tabs}
  orientation="vertical"
  variant="standard"
/>`,
        "Dynamic Tabs": `<Tabs
  tabs={tabs}
  onChange={handleTabChange}
  onTabClose={handleTabClose}
  onTabAdd={handleTabAdd}
  showAddButton={true}
  showCloseButtons={true}
/>`,
        "Scrollable Tabs": `<Tabs
  tabs={manyTabs}
  variant="scrollable"
  showAddButton={true}
  showCloseButtons={true}
/>`,
        "Disabled Tabs": `<Tabs
  tabs={[
    {
      id: 'active',
      label: 'Active Tab',
      content: <div>Active content</div>
    },
    {
      id: 'disabled',
      label: 'Disabled Tab',
      content: <div>Disabled content</div>,
      disabled: true
    }
  ]}
/>`
      }
    },
    datatable: {
      name: "DataTable",
      description: "Advanced data table with sorting, filtering, pagination, and selection capabilities",
      status: "stable",
      category: "organisms",
      tags: ["table", "data", "grid", "sorting", "filtering", "pagination", "selection"],
      stories: true,
      tests: true,
      githubUrl: "/web/src/shared/components/ui/organisms/DataTable.tsx",
      props: [
        { name: "columns", type: "ColDef[]", required: true, description: "Column definitions for the table" },
        { name: "rows", type: "T[]", required: true, description: "Data rows to display" },
        { name: "height", type: "number | string", required: false, description: "Table height", default: "560" },
        { name: "loading", type: "boolean", required: false, description: "Loading state", default: "false" },
        { name: "error", type: "string", required: false, description: "Error message to display" },
        { name: "totalRows", type: "number", required: false, description: "Total number of rows for server-side pagination" },
        { name: "page", type: "number", required: false, description: "Current page number", default: "0" },
        { name: "pageSize", type: "number", required: false, description: "Number of rows per page", default: "25" },
        { name: "onPageChange", type: "(page: number, pageSize: number) => void", required: false, description: "Callback fired when page changes" },
        { name: "onRowClicked", type: "(row: T) => void", required: false, description: "Callback fired when a row is clicked" },
        { name: "sort", type: "string", required: false, description: "Current sort configuration" },
        { name: "onSortChange", type: "(sort: string) => void", required: false, description: "Callback fired when sort changes" },
        { name: "selectable", type: "boolean", required: false, description: "Whether rows can be selected", default: "false" },
        { name: "selectionMode", type: "'single' | 'multiple'", required: false, description: "Selection mode", default: "'multiple'" },
        { name: "selectedIds", type: "Array<string | number>", required: false, description: "Currently selected row IDs" },
        { name: "onSelectionChange", type: "(ids: Array<string | number>, rows: T[]) => void", required: false, description: "Callback fired when selection changes" },
        { name: "getRowId", type: "(row: T) => string | number", required: false, description: "Function to get unique row ID" },
        { name: "showToolbar", type: "boolean", required: false, description: "Whether to show the toolbar", default: "true" },
        { name: "enableDensity", type: "boolean", required: false, description: "Whether to enable density controls", default: "true" },
        { name: "enableExport", type: "boolean", required: false, description: "Whether to enable export functionality", default: "true" },
        { name: "enableColumnSelector", type: "boolean", required: false, description: "Whether to enable column selector", default: "false" },
        { name: "initialDensity", type: "'compact' | 'standard' | 'comfortable'", required: false, description: "Initial density setting", default: "'standard'" },
        { name: "tableId", type: "string", required: false, description: "Unique table ID for saving views" },
        { name: "enableFilterBar", type: "boolean", required: false, description: "Whether to enable filter bar", default: "false" },
        { name: "percentFilterColumns", type: "string[]", required: false, description: "Columns that should use percent filters" },
        { name: "gridProps", type: "any", required: false, description: "Additional props for the underlying grid" }
      ],
      examples: [
        { title: "Basic Table", description: "Simple data table with basic functionality. Shows employee data with `columns` and `rows` props." },
        { title: "With Selection", description: "Table with row selection capabilities. Use `selectable={true}` and `selectionMode` to enable multi-select." },
        { title: "With Sorting", description: "Table with sorting functionality. Click column headers to sort. Use `sort` prop for initial sort state." },
        { title: "With Filtering", description: "Table with filtering capabilities. Enable `enableFilterBar={true}` to show filter controls." },
        { title: "With Pagination", description: "Table with server-side pagination. Use `totalRows`, `page`, and `pageSize` for pagination controls." },
        { title: "With Toolbar", description: "Table with full toolbar features. Enable `showToolbar`, `enableDensity`, `enableExport`, and `enableColumnSelector`." },
        { title: "Compact Density", description: "Table with compact row density. Use `initialDensity=\"compact\"` for tighter spacing." },
        { title: "Custom Columns", description: "Table with custom column configurations. Use `valueFormatter`, `cellRenderer`, and custom filters." }
      ],
      codeSnippets: {
        "Basic Table": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1 },
    { headerName: 'Status', field: 'status', width: 120 }
  ]}
  rows={[
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' }
  ]}
  height={300}
/>`,
        "With Selection": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1 },
    { headerName: 'Status', field: 'status', width: 120 }
  ]}
  rows={[
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active' }
  ]}
  selectable={true}
  selectionMode="multiple"
  height={300}
/>`,
        "With Sorting": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Age', field: 'age', width: 100 },
    { headerName: 'Department', field: 'department', width: 150 }
  ]}
  rows={[
    { id: 1, name: 'Alice Johnson', age: 28, department: 'Engineering' },
    { id: 2, name: 'Bob Smith', age: 35, department: 'Marketing' },
    { id: 3, name: 'Charlie Brown', age: 42, department: 'Sales' },
    { id: 4, name: 'Diana Wilson', age: 31, department: 'Engineering' },
    { id: 5, name: 'Eve Davis', age: 29, department: 'HR' }
  ]}
  sort="name:asc"
  height={300}
/>`,
        "With Filtering": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Product', field: 'product', flex: 1 },
    { headerName: 'Category', field: 'category', width: 120 },
    { headerName: 'Price', field: 'price', width: 100 },
    { headerName: 'Stock', field: 'stock', width: 100 }
  ]}
  rows={[
    { id: 1, product: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15 },
    { id: 2, product: 'Office Chair', category: 'Furniture', price: 299, stock: 8 },
    { id: 3, product: 'Wireless Mouse', category: 'Electronics', price: 49, stock: 25 },
    { id: 4, product: 'Desk Lamp', category: 'Furniture', price: 89, stock: 12 },
    { id: 5, product: 'Keyboard', category: 'Electronics', price: 79, stock: 20 }
  ]}
  enableFilterBar={true}
  height={300}
/>`,
        "With Pagination": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Customer', field: 'customer', flex: 1 },
    { headerName: 'Order Date', field: 'orderDate', width: 120 },
    { headerName: 'Amount', field: 'amount', width: 100 }
  ]}
  rows={[
    { id: 1, customer: 'John Smith', orderDate: '2024-01-15', amount: 299.99 },
    { id: 2, customer: 'Sarah Johnson', orderDate: '2024-01-16', amount: 149.50 },
    { id: 3, customer: 'Mike Wilson', orderDate: '2024-01-17', amount: 89.99 },
    { id: 4, customer: 'Lisa Brown', orderDate: '2024-01-18', amount: 199.00 },
    { id: 5, customer: 'David Lee', orderDate: '2024-01-19', amount: 75.25 }
  ]}
  totalRows={50}
  page={0}
  pageSize={5}
  height={300}
/>`,
        "With Toolbar": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'Employee', field: 'employee', flex: 1 },
    { headerName: 'Position', field: 'position', width: 150 },
    { headerName: 'Salary', field: 'salary', width: 120 },
    { headerName: 'Department', field: 'department', width: 120 }
  ]}
  rows={[
    { id: 1, employee: 'Alice Johnson', position: 'Senior Developer', salary: 95000, department: 'Engineering' },
    { id: 2, employee: 'Bob Smith', position: 'Marketing Manager', salary: 75000, department: 'Marketing' },
    { id: 3, employee: 'Charlie Brown', position: 'Sales Director', salary: 85000, department: 'Sales' },
    { id: 4, employee: 'Diana Wilson', position: 'UX Designer', salary: 70000, department: 'Design' },
    { id: 5, employee: 'Eve Davis', position: 'HR Specialist', salary: 60000, department: 'HR' }
  ]}
  showToolbar={true}
  enableDensity={true}
  enableExport={true}
  enableColumnSelector={true}
  height={300}
/>`,
        "Compact Density": `<DataTable
  columns={[
    { headerName: 'ID', field: 'id', width: 80 },
    { headerName: 'Code', field: 'code', width: 100 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Price', field: 'price', width: 80 },
    { headerName: 'Qty', field: 'quantity', width: 60 }
  ]}
  rows={[
    { id: 1, code: 'A001', name: 'Widget A', price: 12.99, quantity: 100 },
    { id: 2, code: 'B002', name: 'Widget B', price: 8.50, quantity: 250 },
    { id: 3, code: 'C003', name: 'Widget C', price: 15.75, quantity: 75 },
    { id: 4, code: 'D004', name: 'Widget D', price: 22.00, quantity: 50 },
    { id: 5, code: 'E005', name: 'Widget E', price: 6.25, quantity: 300 },
    { id: 6, code: 'F006', name: 'Widget F', price: 18.90, quantity: 120 }
  ]}
  initialDensity="compact"
  height={250}
/>`,
        "Custom Columns": `<DataTable
  columns={[
    { 
      headerName: 'ID', 
      field: 'id', 
      width: 100,
      filter: 'agNumberColumnFilter'
    },
    { 
      headerName: 'Name', 
      field: 'name', 
      flex: 1,
      filter: 'agTextColumnFilter',
      sortable: true
    },
    { 
      headerName: 'Amount', 
      field: 'amount', 
      width: 120,
      valueFormatter: (params) => 
        params.value ? \`$\${params.value.toLocaleString()}\` : ''
    }
  ]}
  rows={rows}
/>`
      }
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
    githubUrl: "/web/src/shared/components/ui/atoms/Component.tsx",
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
  }
};
