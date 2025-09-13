// web/src/components/form/FormActions.tsx
'use client';

import * as React from 'react';
import { Stack, Button, CircularProgress } from '@mui/material';

export type FormActionsProps = {
  submitting?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
};

export function FormActions({ submitting, onCancel, submitLabel = 'Save', cancelLabel = 'Cancel' }: FormActionsProps) {
  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end">
      {onCancel && <Button variant="text" onClick={onCancel} disabled={submitting}>{cancelLabel}</Button>}
      <Button type="submit" variant="contained" disabled={submitting} startIcon={submitting ? <CircularProgress size={16} /> : null}>
        {submitLabel}
      </Button>
    </Stack>
  );
}

export default FormActions;
