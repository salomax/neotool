// web/src/components/organisms/__stories__/DataTable.filterbar.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import type { ColDef } from "ag-grid-community";

type Row = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Viewer";
  active: boolean;
};

const columns: ColDef<Row>[] = [
  { headerName: "ID", field: "id", maxWidth: 100 },
  { headerName: "Name", field: "name", filter: "agTextColumnFilter" },
  { headerName: "Email", field: "email", filter: "agTextColumnFilter" },
  { headerName: "Role", field: "role", filter: "agSetColumnFilter" },
];

const rows: Row[] = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: (i % 3 === 0
    ? "Admin"
    : i % 3 === 1
      ? "Manager"
      : "Viewer") as Row["role"],
  active: i % 2 === 0,
}));

const meta: Meta = { title: "Organisms/DataTable.FilterBar" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DataTable<Row>
      tableId="demo-users"
      columns={columns}
      rows={rows}
      showToolbar
      enableColumnSelector
      enableDensity
      enableExport
      enableFilterBar
    />
  ),
};
