import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../organisms/DataTable";
import type { ColDef } from "ag-grid-community";

type Row = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Viewer";
};

const columns: ColDef<Row>[] = [
  { headerName: "ID", field: "id", maxWidth: 100 },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Role", field: "role" },
];

const rows: Row[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: (i % 3 === 0
    ? "Admin"
    : i % 3 === 1
      ? "Manager"
      : "Viewer") as Row["role"],
}));

const meta: Meta = { title: "Organisms/DataTable.Toolbar" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DataTable<Row>
      columns={columns}
      rows={rows}
      showToolbar
      enableColumnSelector
      enableDensity
      enableExport
    />
  ),
};
