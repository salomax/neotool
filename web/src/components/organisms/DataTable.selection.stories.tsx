import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../organisms/DataTable';
import type { ColDef } from 'ag-grid-community';
import { Stack, Typography } from '@mui/material';

type Row = { id: number; name: string; email: string; role: 'Admin' | 'Manager' | 'Viewer' };

const columns: ColDef<Row>[] = [
  { headerName: 'ID', field: 'id', maxWidth: 100 },
  { headerName: 'Name', field: 'name' },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Role', field: 'role' },
];

const rows: Row[] = Array.from({ length: 56 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: (i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Manager' : 'Viewer') as Row['role'],
}));

const meta: Meta = { title: 'Organisms/DataTable.Selection' };
export default meta;
type Story = StoryObj;

export const Multiple: Story = {
  render: () => <Demo />,
};

function Demo() {
  const [ids, setIds] = React.useState<Array<number>>([]);
  return (
    <Stack spacing={1}>
      <Typography variant="caption">Selected: {ids.join(', ') || '—'}</Typography>
      <DataTable<Row>
        columns={columns}
        rows={rows}
        selectable
        selectionMode="multiple"
        onSelectionChange={(sel) => setIds(sel as number[])}
        showToolbar
        enableColumnSelector
        enableDensity
        enableExport
      />
    </Stack>
  );
}
