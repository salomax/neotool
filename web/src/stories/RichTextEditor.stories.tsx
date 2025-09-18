import type { Meta, StoryObj } from '@storybook/react';
import RichTextEditor from '../shared/components/ui/molecules/RichTextEditor';
import { Box, Typography, Paper, Stack, Chip } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Components/Molecules/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive rich text editor with toolbar and formatting options. Supports bold, italic, underline, lists, alignment, colors, and more.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'HTML content of the editor'
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when content changes'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty'
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of the editor'
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the editor'
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is read-only'
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar'
    },
    toolbarPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position of the toolbar'
    },
    allowedFormats: {
      control: 'object',
      description: 'Array of allowed formatting options'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

// Interactive example component
const InteractiveExample = () => {
  const [content, setContent] = useState('<p>Start typing to see the rich text editor in action!</p>');
  const [readOnly, setReadOnly] = useState(false);

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Chip 
          label={readOnly ? 'Read Only' : 'Editable'} 
          color={readOnly ? 'default' : 'primary'}
          onClick={() => setReadOnly(!readOnly)}
          clickable
        />
      </Stack>
      
      <RichTextEditor
        value={content}
        onChange={setContent}
        readOnly={readOnly}
        placeholder="Type something amazing..."
        minHeight={200}
      />
      
      <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>HTML Output:</Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem', overflow: 'auto' }}>
          {content}
        </Typography>
      </Paper>
    </Box>
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
    minHeight: 200
  }
};

export const WithInitialContent: Story = {
  args: {
    value: '<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>powerful</strong> rich text editor with <em>formatting</em> options.</p><ul><li>Bullet point 1</li><li>Bullet point 2</li></ul>',
    placeholder: 'Start typing...',
    minHeight: 200
  }
};

export const ReadOnly: Story = {
  args: {
    value: '<h2>Read Only Content</h2><p>This content cannot be edited. The toolbar is disabled and the editor is not interactive.</p><blockquote>This is a quote that cannot be modified.</blockquote>',
    readOnly: true,
    minHeight: 200
  }
};

export const WithoutToolbar: Story = {
  args: {
    value: '<p>This editor has no toolbar. You can still use keyboard shortcuts like <strong>Ctrl+B</strong> for bold.</p>',
    showToolbar: false,
    minHeight: 200
  }
};

export const BottomToolbar: Story = {
  args: {
    value: '<p>This editor has the toolbar at the bottom instead of the top.</p>',
    toolbarPosition: 'bottom',
    minHeight: 200
  }
};

export const LimitedFormats: Story = {
  args: {
    value: '<p>This editor only allows <strong>bold</strong> and <em>italic</em> formatting.</p>',
    allowedFormats: ['bold', 'italic'],
    minHeight: 200
  }
};

export const LargeEditor: Story = {
  args: {
    value: '<h1>Large Editor</h1><p>This editor has a larger height to accommodate more content.</p>',
    minHeight: 400,
    maxHeight: 600
  }
};

export const Interactive: Story = {
  render: () => <InteractiveExample />
};

export const WithCustomStyling: Story = {
  args: {
    value: '<h2>Custom Styled Editor</h2><p>This editor has custom styling applied.</p>',
    className: 'custom-rich-editor',
    minHeight: 250
  },
  decorators: [
    (Story) => (
      <Box>
        <style>{`
          .custom-rich-editor {
            border: 2px solid #1976d2;
            border-radius: 8px;
          }
          .custom-rich-editor .MuiToolbar-root {
            background-color: #f5f5f5;
          }
        `}</style>
        <Story />
      </Box>
    )
  ]
};

export const AllFormats: Story = {
  args: {
    value: `
      <h1>All Formatting Options</h1>
      <h2>This is a heading</h2>
      <p>This is <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, and <s>strikethrough</s> text.</p>
      <p style="color: red;">This is red text.</p>
      <p style="font-size: 24px;">This is large text.</p>
      <ul>
        <li>Bullet point 1</li>
        <li>Bullet point 2</li>
      </ul>
      <ol>
        <li>Numbered point 1</li>
        <li>Numbered point 2</li>
      </ol>
      <blockquote>This is a blockquote with important information.</blockquote>
      <p>This is <code>inline code</code> and a <a href="https://example.com">link</a>.</p>
      <pre>This is a code block
with multiple lines</pre>
    `,
    allowedFormats: ['bold', 'italic', 'underline', 'strikethrough', 'list', 'link', 'image', 'code', 'align', 'size', 'color'],
    minHeight: 300
  }
};
