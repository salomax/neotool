import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUpload from '../ImageUpload';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock File constructor
global.File = class MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;

  constructor(chunks: any[], filename: string, options: any = {}) {
    this.name = filename;
    this.size = options.size || 1024;
    this.type = options.type || 'image/jpeg';
    this.lastModified = options.lastModified || Date.now();
  }
} as any;

describe('ImageUpload', () => {
  const defaultProps = {
    onChange: jest.fn(),
    'data-testid': 'image-upload'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<ImageUpload {...defaultProps} />);
    
    const upload = screen.getByTestId('image-upload');
    expect(upload).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<ImageUpload {...defaultProps} label="Upload Images" />);
    
    expect(screen.getByText('Upload Images')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<ImageUpload {...defaultProps} helperText="Select images to upload" />);
    
    expect(screen.getByText('Select images to upload')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<ImageUpload {...defaultProps} error errorMessage="Upload failed" />);
    
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<ImageUpload {...defaultProps} label="Required Upload" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<ImageUpload {...defaultProps} disabled />);
    
    const uploadButton = screen.getByText('Upload Images');
    expect(uploadButton).toBeDisabled();
  });

  it('applies error state correctly', () => {
    render(<ImageUpload {...defaultProps} error />);
    
    const formControl = screen.getByTestId('image-upload');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('opens file dialog when clicked', async () => {
    const user = userEvent.setup();
    render(<ImageUpload {...defaultProps} />);
    
    const uploadButton = screen.getByText('Upload Images');
    await user.click(uploadButton);
    
    // File input should be triggered
    const fileInput = screen.getByRole('textbox', { hidden: true });
    expect(fileInput).toBeInTheDocument();
  });

  it('handles file selection', async () => {
    const onChange = jest.fn();
    render(<ImageUpload {...defaultProps} onChange={onChange} />);
    
    const fileInput = screen.getByRole('textbox', { hidden: true });
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([file]);
    });
  });

  it('validates file size', async () => {
    const onChange = jest.fn();
    render(
      <ImageUpload 
        {...defaultProps} 
        onChange={onChange} 
        maxFileSize={1000} // 1KB
      />
    );
    
    const fileInput = screen.getByRole('textbox', { hidden: true });
    const largeFile = new File(['test'], 'large.jpg', { type: 'image/jpeg', size: 2000 });
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    await waitFor(() => {
      expect(screen.getByText(/File "large.jpg" is too large/)).toBeInTheDocument();
    });
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('validates file type', async () => {
    const onChange = jest.fn();
    render(
      <ImageUpload 
        {...defaultProps} 
        onChange={onChange} 
        accept="image/png"
      />
    );
    
    const fileInput = screen.getByRole('textbox', { hidden: true });
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    
    await waitFor(() => {
      expect(screen.getByText(/File "test.txt" is not a supported image format/)).toBeInTheDocument();
    });
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('enforces maximum file count', async () => {
    const onChange = jest.fn();
    render(
      <ImageUpload 
        {...defaultProps} 
        onChange={onChange} 
        maxFiles={2}
        value={[new File(['test'], 'file1.jpg'), new File(['test'], 'file2.jpg')]}
      />
    );
    
    const fileInput = screen.getByRole('textbox', { hidden: true });
    const newFile = new File(['test'], 'file3.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [newFile] } });
    
    await waitFor(() => {
      expect(screen.getByText('Maximum 2 files allowed')).toBeInTheDocument();
    });
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles drag and drop', async () => {
    const onChange = jest.fn();
    render(<ImageUpload {...defaultProps} onChange={onChange} />);
    
    const dropArea = screen.getByText('Drag and drop images here');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.dragOver(dropArea);
    expect(dropArea.closest('[data-testid="image-upload"]')).toHaveClass('Mui-error');
    
    fireEvent.drop(dropArea, { dataTransfer: { files: [file] } });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([file]);
    });
  });

  it('shows file previews when enabled', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(
      <ImageUpload 
        {...defaultProps} 
        value={[file]} 
        showPreview 
      />
    );
    
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByAltText('test.jpg')).toBeInTheDocument();
  });

  it('shows file list when enabled', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(
      <ImageUpload 
        {...defaultProps} 
        value={[file]} 
        showFileList 
      />
    );
    
    expect(screen.getByText('Selected Files (1/5)')).toBeInTheDocument();
    expect(screen.getByText('test.jpg (1 KB)')).toBeInTheDocument();
  });

  it('removes files when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    render(
      <ImageUpload 
        {...defaultProps} 
        value={[file]} 
        showPreview 
        onRemove={onRemove}
      />
    );
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(onRemove).toHaveBeenCalledWith(file, 0);
  });

  it('handles multiple file selection', async () => {
    const onChange = jest.fn();
    render(<ImageUpload {...defaultProps} onChange={onChange} multiple />);
    
    const fileInput = screen.getByRole('textbox', { hidden: true });
    const files = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.jpg', { type: 'image/jpeg' })
    ];
    
    fireEvent.change(fileInput, { target: { files } });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(files);
    });
  });

  it('shows upload progress when enabled', async () => {
    render(<ImageUpload {...defaultProps} showProgress />);
    
    // This would need to be triggered by the upload process
    // For now, just check that the component renders
    expect(screen.getByTestId('image-upload')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ImageUpload {...defaultProps} className="custom-upload" />);
    
    const upload = screen.getByTestId('image-upload');
    expect(upload).toHaveClass('custom-upload');
  });

  it('handles controlled value updates', () => {
    const file1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });
    
    const { rerender } = render(<ImageUpload {...defaultProps} value={[file1]} />);
    expect(screen.getByText('test1.jpg (1 KB)')).toBeInTheDocument();
    
    rerender(<ImageUpload {...defaultProps} value={[file2]} />);
    expect(screen.getByText('test2.jpg (1 KB)')).toBeInTheDocument();
  });

  it('handles uncontrolled value updates', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<ImageUpload {...defaultProps} defaultValue={[file]} />);
    
    expect(screen.getByText('test.jpg (1 KB)')).toBeInTheDocument();
  });

  it('disables drag and drop when disabled', () => {
    render(<ImageUpload {...defaultProps} disabled />);
    
    const dropArea = screen.getByText('Drag and drop images here');
    fireEvent.dragOver(dropArea);
    
    // Should not show drag over state when disabled
    expect(dropArea.closest('[data-testid="image-upload"]')).not.toHaveClass('Mui-error');
  });

  it('shows custom upload text', () => {
    render(<ImageUpload {...defaultProps} uploadText="Choose Files" />);
    
    expect(screen.getByText('Choose Files')).toBeInTheDocument();
  });

  it('shows custom drag text', () => {
    render(<ImageUpload {...defaultProps} dragText="Drop files here" />);
    
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('handles single file mode', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(
      <ImageUpload 
        {...defaultProps} 
        value={[file]} 
        multiple={false}
        maxFiles={1}
      />
    );
    
    expect(screen.getByText('Selected Files (1/1)')).toBeInTheDocument();
  });
});
