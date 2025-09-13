import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { ColDef } from "ag-grid-community";

type Row = { id: number; name: string; email: string; country: string };

const columns: ColDef<Row>[] = [
  { headerName: "ID", field: "id", maxWidth: 100 },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Country", field: "country" },
];

function makeRows(n: number): Row[] {
  const countries = ["Brazil", "USA", "Canada", "Germany", "Japan", "UK"];
  const rows: Row[] = [];
  for (let i = 1; i <= n; i++) {
    rows.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      country: countries[i % countries.length],
    });
  }
  return rows;
}

const meta: Meta<typeof DataTable<Row>> = {
  title: "Organisms/DataTable",
  component: DataTable<Row>,
  args: {
    columns,
    rows: makeRows(120),
    pageSize: 25,
    page: 0,
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<Row>>;

export const ClientSide: Story = {};

export const Loading: Story = {
  args: { rows: [], loading: true },
};

export const Empty: Story = {
  args: { rows: [] },
};

export const ErrorState: Story = {
  args: { rows: [], error: "Failed to load data from server" },
};

export const ServerSide: Story = {
  render: (args) => <ServerSideDemo {...args} />,
  args: { rows: [], page: 0, pageSize: 25 },
};

export const SmokeTest: Story = {
  args: {
    columns: [
      { headerName: "ID", field: "id", maxWidth: 100 },
      { headerName: "Name", field: "name" },
    ],
    rows: [{ id: 1, name: "test", email: "test@test.com", country: "Test" }],
    pageSize: 25,
    page: 0,
  },
};

const ServerSideDemo: React.FC<React.ComponentProps<typeof DataTable<Row>>> = (
  props
) => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(false);
  const total = 500;

  const fetchPage = React.useCallback((page: number, pageSize: number) => {
    setLoading(true);
    // Simulate network latency
    setTimeout(() => {
      const start = page * pageSize + 1;
      const end = Math.min(start + pageSize - 1, total);
      const pageRows = [];
      for (let i = start; i <= end; i++) {
        pageRows.push({
          id: i,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          country: "Brazil",
        });
      }
      setRows(pageRows);
      setLoading(false);
    }, 600);
  }, []);

  React.useEffect(() => {
    fetchPage(page, props.pageSize ?? 25);
  }, [page, props.pageSize, fetchPage]);

  return (
    <DataTable<Row>
      {...props}
      rows={rows}
      loading={loading}
      totalRows={total}
      page={page}
      onPageChange={(p, ps) => {
        setPage(p);
        fetchPage(p, ps);
      }}
    />
  );
};
