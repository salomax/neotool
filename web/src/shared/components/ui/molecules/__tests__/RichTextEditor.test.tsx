import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RichTextEditor from '../RichTextEditor';

describe('RichTextEditor', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'rich-text-editor'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<RichTextEditor {...defaultProps} />);
    
    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
    expect(screen.getByText('Start typing...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<RichTextEditor {...defaultProps} placeholder="Enter your text here..." />);
    
    expect(screen.getByText('Enter your text here...')).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<RichTextEditor {...defaultProps} value="<p>Hello World</p>" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('calls onChange when content changes', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    await user.type(editor!, 'Hello World');
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('shows toolbar by default', () => {
    render(<RichTextEditor {...defaultProps} />);
    
    expect(screen.getByTestId('toolbar-bold')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-italic')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-underline')).toBeInTheDocument();
  });

  it('hides toolbar when showToolbar is false', () => {
    render(<RichTextEditor {...defaultProps} showToolbar={false} />);
    
    expect(screen.queryByTestId('toolbar-bold')).not.toBeInTheDocument();
  });

  it('disables toolbar buttons when readOnly is true', () => {
    render(<RichTextEditor {...defaultProps} readOnly />);
    
    expect(screen.getByTestId('toolbar-bold')).toBeDisabled();
    expect(screen.getByTestId('toolbar-italic')).toBeDisabled();
  });

  it('applies bold formatting when bold button is clicked', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    await user.type(editor!, 'Hello');
    
    // Select the text
    const range = document.createRange();
    range.selectNodeContents(editor!);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    
    // Click bold button
    await user.click(screen.getByTestId('toolbar-bold'));
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies italic formatting when italic button is clicked', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    await user.type(editor!, 'Hello');
    
    // Select the text
    const range = document.createRange();
    range.selectNodeContents(editor!);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    
    // Click italic button
    await user.click(screen.getByTestId('toolbar-italic'));
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('handles keyboard shortcuts', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    await user.type(editor!, 'Hello');
    
    // Select the text
    const range = document.createRange();
    range.selectNodeContents(editor!);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    
    // Press Ctrl+B
    await user.keyboard('{Control>}b{/Control}');
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('opens font size menu when font size button is clicked', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    await user.click(screen.getByTestId('toolbar-fontsize'));
    
    expect(screen.getByText('12px')).toBeInTheDocument();
    expect(screen.getByText('16px')).toBeInTheDocument();
    expect(screen.getByText('24px')).toBeInTheDocument();
  });

  it('opens color menu when color button is clicked', async () => {
    const user = userEvent.setup();
    render(<RichTextEditor {...defaultProps} />);
    
    await user.click(screen.getByTestId('toolbar-color'));
    
    expect(screen.getByText('Text Color')).toBeInTheDocument();
  });

  it('filters toolbar buttons based on allowedFormats', () => {
    render(
      <RichTextEditor 
        {...defaultProps} 
        allowedFormats={['bold', 'italic']} 
      />
    );
    
    expect(screen.getByTestId('toolbar-bold')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-italic')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-underline')).not.toBeInTheDocument();
  });

  it('renders with custom minHeight and maxHeight', () => {
    render(
      <RichTextEditor 
        {...defaultProps} 
        minHeight={300}
        maxHeight={500}
      />
    );
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    expect(editor).toHaveStyle({ minHeight: '300px', maxHeight: '500px' });
  });

  it('renders toolbar at bottom when toolbarPosition is bottom', () => {
    render(<RichTextEditor {...defaultProps} toolbarPosition="bottom" />);
    
    const toolbar = screen.getByTestId('rich-text-editor').querySelector('.MuiToolbar-root');
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    
    expect(toolbar).toBeInTheDocument();
    expect(editor).toBeInTheDocument();
    
    // Check that toolbar comes after editor in DOM order
    const toolbarIndex = Array.from(screen.getByTestId('rich-text-editor').children).indexOf(toolbar!);
    const editorIndex = Array.from(screen.getByTestId('rich-text-editor').children).indexOf(editor!);
    
    expect(toolbarIndex).toBeGreaterThan(editorIndex);
  });

  it('handles link insertion', async () => {
    const user = userEvent.setup();
    // Mock prompt
    window.prompt = jest.fn().mockReturnValue('https://example.com');
    
    render(<RichTextEditor {...defaultProps} />);
    
    const editor = screen.getByTestId('rich-text-editor').querySelector('[contenteditable]');
    await user.type(editor!, 'Hello');
    
    // Select the text
    const range = document.createRange();
    range.selectNodeContents(editor!);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    
    // Click link button
    await user.click(screen.getByTestId('toolbar-link'));
    
    expect(window.prompt).toHaveBeenCalledWith('Enter URL:');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('handles image insertion', async () => {
    const user = userEvent.setup();
    // Mock prompt
    window.prompt = jest.fn().mockReturnValue('https://example.com/image.jpg');
    
    render(<RichTextEditor {...defaultProps} />);
    
    // Click image button
    await user.click(screen.getByTestId('toolbar-image'));
    
    expect(window.prompt).toHaveBeenCalledWith('Enter image URL:');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<RichTextEditor {...defaultProps} className="custom-editor" />);
    
    expect(screen.getByTestId('rich-text-editor')).toHaveClass('custom-editor');
  });

  it('renders with custom test id', () => {
    render(<RichTextEditor {...defaultProps} data-testid="custom-test-id" />);
    
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
});
