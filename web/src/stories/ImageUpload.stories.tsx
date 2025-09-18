import type { Meta, StoryObj } from '@storybook/react';
import ImageUpload from '../shared/components/ui/atoms/ImageUpload';
import { Box, Typography, Stack, Paper, Divider } from '../shared/ui/mui-imports';
import { useState } from 'react';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/Atoms/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive image upload component with drag & drop, preview, and validation features.'
      }
    }
  },
  argTypes: {
    value: {
      control: false,
      description: 'Current uploaded files'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the upload is disabled'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the upload is required'
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the upload'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the upload'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message'
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Maximum number of files allowed'
    },
    maxFileSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes'
    },
    accept: {
      control: { type: 'text' },
      description: 'Accepted file types'
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Whether to allow multiple files'
    },
    showDragDrop: {
      control: { type: 'boolean' },
      description: 'Whether to show drag and drop area'
    },
    showPreview: {
      control: { type: 'boolean' },
      description: 'Whether to show file previews'
    },
    showFileList: {
      control: { type: 'boolean' },
      description: 'Whether to show file list'
    },
    showProgress: {
      control: { type: 'boolean' },
      description: 'Whether to show upload progress'
    },
    uploadText: {
      control: { type: 'text' },
      description: 'Custom upload text'
    },
    dragText: {
      control: { type: 'text' },
      description: 'Custom drag text'
    },
    dropText: {
      control: { type: 'text' },
      description: 'Custom drop text'
    },
    previewSize: {
      control: { type: 'number' },
      description: 'Preview image size'
    },
    compressImages: {
      control: { type: 'boolean' },
      description: 'Whether to compress images'
    },
    imageQuality: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Image quality for compression (0-1)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

// Interactive wrapper for stories
const ImageUploadWrapper = (props: any) => {
  const [files, setFiles] = useState<File[]>(props.value || []);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <ImageUpload
        {...props}
        value={files}
        onChange={(newFiles) => setFiles(newFiles)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Upload Images',
    helperText: 'Select images to upload'
  }
};

export const WithPreview: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Upload with Preview',
    showPreview: true,
    showFileList: true,
    helperText: 'Images will be previewed after selection'
  }
};

export const SingleFile: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Single Image Upload',
    multiple: false,
    maxFiles: 1,
    helperText: 'Upload only one image'
  }
};

export const WithConstraints: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Constrained Upload',
    maxFiles: 3,
    maxFileSize: 2 * 1024 * 1024, // 2MB
    accept: 'image/jpeg,image/png',
    helperText: 'Maximum 3 files, 2MB each, JPEG/PNG only'
  }
};

export const WithoutDragDrop: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Button Only Upload',
    showDragDrop: false,
    helperText: 'Click the button to select files'
  }
};

export const WithProgress: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Upload with Progress',
    showProgress: true,
    helperText: 'Upload progress will be shown'
  }
};

export const WithCompression: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Compressed Upload',
    compressImages: true,
    imageQuality: 0.8,
    maxImageWidth: 1920,
    maxImageHeight: 1080,
    helperText: 'Images will be automatically compressed'
  }
};

export const CustomText: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Custom Upload',
    uploadText: 'Choose Photos',
    dragText: 'Drag photos here',
    dropText: 'Drop photos to upload',
    helperText: 'Custom text for all upload actions'
  }
};

export const Disabled: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Disabled Upload',
    disabled: true,
    helperText: 'This upload is disabled'
  }
};

export const Error: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Upload with Error',
    error: true,
    errorMessage: 'Upload failed. Please try again.',
    helperText: 'This upload has an error'
  }
};

export const Required: Story = {
  render: (args) => <ImageUploadWrapper {...args} />,
  args: {
    label: 'Required Upload',
    required: true,
    helperText: 'At least one image is required'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Small Preview (50px)
        </Typography>
        <ImageUploadWrapper
          label="Small Preview"
          previewSize={50}
          showPreview
          helperText="Small preview thumbnails"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Medium Preview (100px)
        </Typography>
        <ImageUploadWrapper
          label="Medium Preview"
          previewSize={100}
          showPreview
          helperText="Medium preview thumbnails"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Large Preview (150px)
        </Typography>
        <ImageUploadWrapper
          label="Large Preview"
          previewSize={150}
          showPreview
          helperText="Large preview thumbnails"
        />
      </Box>
    </Stack>
  )
};

export const InteractiveDemo: Story = {
  render: () => {
    const [profileImages, setProfileImages] = useState<File[]>([]);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [documentImages, setDocumentImages] = useState<File[]>([]);

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Image Upload Demo
        </Typography>
        
        <Stack spacing={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <ImageUpload
              value={profileImages}
              onChange={setProfileImages}
              label="Profile Picture"
              multiple={false}
              maxFiles={1}
              showPreview
              previewSize={120}
              accept="image/jpeg,image/png"
              maxFileSize={5 * 1024 * 1024} // 5MB
              helperText="Upload your profile picture (JPEG/PNG, max 5MB)"
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Photo Gallery
            </Typography>
            <ImageUpload
              value={galleryImages}
              onChange={setGalleryImages}
              label="Photo Gallery"
              multiple
              maxFiles={10}
              showPreview
              showFileList
              compressImages
              imageQuality={0.9}
              maxImageWidth={1920}
              maxImageHeight={1080}
              helperText="Upload up to 10 photos for your gallery (images will be compressed)"
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Document Images
            </Typography>
            <ImageUpload
              value={documentImages}
              onChange={setDocumentImages}
              label="Document Images"
              multiple
              maxFiles={5}
              showFileList
              accept="image/*"
              maxFileSize={10 * 1024 * 1024} // 10MB
              uploadText="Upload Documents"
              dragText="Drag document images here"
              dropText="Drop document images to upload"
              helperText="Upload document images (any format, max 10MB each)"
            />
          </Paper>
        </Stack>

        <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" gutterBottom>
            Upload Summary:
          </Typography>
          <pre style={{ margin: 0, fontSize: '12px' }}>
            {JSON.stringify({
              profileImages: profileImages.map(f => ({ name: f.name, size: f.size })),
              galleryImages: galleryImages.map(f => ({ name: f.name, size: f.size })),
              documentImages: documentImages.map(f => ({ name: f.name, size: f.size }))
            }, null, 2)}
          </pre>
        </Paper>
      </Box>
    );
  }
};
