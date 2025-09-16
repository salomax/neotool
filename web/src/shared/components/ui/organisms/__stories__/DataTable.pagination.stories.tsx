// web/src/components/organisms/__stories__/DataTable.pagination.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import type { ColDef } from "ag-grid-community";

type Row = { id: number; name: string; value: number };

const columns: ColDef<Row>[] = [
  { headerName: "ID", field: "id", maxWidth: 100 },
  { headerName: "Name", field: "name" },
  { headerName: "Value", field: "value" },
];

const rows: Row[] = Array.from({ length: 137 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.round(Math.random() * 1000),
}));

const meta: Meta = { title: "Organisms/DataTable.Pagination" };
export default meta;
type Story = StoryObj;

export const UncontrolledClient: Story = {
  render: () => (
    <DataTable<Row>
      columns={columns}
      rows={rows}
      showToolbar
      enableColumnSelector
      enableDensity
      enableExport
      // sem onPageChange => client-side pagination interna
    />
  ),
};

function ControlledServerDemo() {
  const [page, setPage] = React.useState(0);
  const pageSize = 25;
  const slice = rows.slice(page * pageSize, page * pageSize + pageSize);
  return (
    <DataTable<Row>
      columns={columns}
      rows={slice}
      totalRows={rows.length}
      page={page}
      pageSize={pageSize}
      onPageChange={(p) => setPage(p)}
      showToolbar
      enableColumnSelector
      enableDensity
      enableExport
    />
  );
}

export const ControlledServer: Story = {
  render: () => <ControlledServerDemo />,
};
