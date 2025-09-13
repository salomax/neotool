'use client';

import * as React from 'react';
import { Paper, Box, Stack, Typography, Divider, Drawer, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import type { ColDef } from 'ag-grid-community';
import { DataTable } from '../components/organisms/DataTable';

export interface CrudPageProps<T extends { id: string | number }> {
  title: string;
  columns: ColDef<T>[] | ((helpers: { openEdit: (row: T) => void; openCreate: () => void }) => ColDef<T>[]);
  rows: T[];
  loading?: boolean;
  error?: string;
  totalRows?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;

  /** External create hook: if provided, overrides internal drawer open */
  onCreate?: () => void;

  /** Render the form inside a Drawer. Receives current item (for edit) and close(). */
  renderForm: (ctx: { mode: 'create' | 'edit'; item?: T; close: () => void }) => React.ReactNode;
}

export function CrudPage<T extends { id: string | number }>(props: CrudPageProps<T>) {
  const { title, columns, rows, loading, error, totalRows, page, pageSize, onPageChange, renderForm, onCreate } = props;
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'create' | 'edit'>('create');
  const [current, setCurrent] = React.useState<T | undefined>(undefined);

  const openCreate = () => {
    if (onCreate) return onCreate();
    setMode('create'); setCurrent(undefined); setOpen(true);
  };
  const openEdit = (item: T) => { setMode('edit'); setCurrent(item); setOpen(true); };
  const close = () => setOpen(false);

  const computedColumns: ColDef<T>[] = Array.isArray(columns) ? columns : columns({ openEdit, openCreate });

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h5">{title}</Typography>
        <IconButton color="primary" onClick={openCreate} aria-label="create new">
          <AddIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 1 }} />

      <Box>
        <DataTable<T>
          columns={computedColumns}
          rows={rows}
          loading={loading}
          error={error}
          totalRows={totalRows}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onRowClicked={(row) => openEdit(row)}
        />
      </Box>

      {/* Internal drawer only used when onCreate is not provided or for edits */}
      <Drawer anchor="right" open={open} onClose={close} PaperProps={{ sx: { width: 420, p: 2 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6">{mode === 'create' ? 'Create' : 'Edit'}</Typography>
          <IconButton onClick={close} aria-label="close drawer"><CloseIcon /></IconButton>
        </Stack>
        {renderForm({ mode, item: current, close })}
      </Drawer>
    </Paper>
  );
}

export default CrudPage;
