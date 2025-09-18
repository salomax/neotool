'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Stack, Paper } from '../../shared/ui/mui-imports';
import { ProgressBar } from '../../shared/components/ui/atoms/ProgressBar';
import { ColorPicker } from '../../shared/components/ui/atoms/ColorPicker';
import { Slider } from '../../shared/components/ui/atoms/Slider';
import { Switch } from '../../shared/components/ui/atoms/Switch';
import { RichTextEditor } from '../../shared/components/ui/molecules/RichTextEditor';

export default function TestComponentsPage() {
  const [progress, setProgress] = useState(50);
  const [color, setColor] = useState('#3f51b5');
  const [sliderValue, setSliderValue] = useState(30);
  const [switchValue, setSwitchValue] = useState(false);
  const [editorValue, setEditorValue] = useState('');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Component Test Page
      </Typography>
      
      <Stack spacing={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ProgressBar Test
          </Typography>
          <ProgressBar
            value={progress}
            onChange={(value) => setProgress(value as number)}
            label="Progress"
            helperText="Test progress bar"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current value: {progress}%
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ColorPicker Test
          </Typography>
          <ColorPicker
            value={color}
            onChange={setColor}
            label="Color"
            helperText="Test color picker"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Selected color: {color}
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Slider Test
          </Typography>
          <Slider
            value={sliderValue}
            onChange={(value) => setSliderValue(value as number)}
            label="Slider"
            helperText="Test slider"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current value: {sliderValue}
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Switch Test
          </Typography>
          <Switch
            checked={switchValue}
            onChange={setSwitchValue}
            label="Switch"
            helperText="Test switch"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current state: {switchValue ? 'ON' : 'OFF'}
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            RichTextEditor Test
          </Typography>
          <RichTextEditor
            value={editorValue}
            onChange={setEditorValue}
            placeholder="Test rich text editor"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Content length: {editorValue.length} characters
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
