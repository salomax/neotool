// web/src/components/organisms/__stories__/DataTable.inline-bulk.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import type { ColDef, CellValueChangedEvent } from "ag-grid-community";

type Row = {
  id: number;
  name: string;
  amount: number; // currency
  percent: number; // 0..1
  active: boolean;
};

const columns: ColDef<Row>[] = [
  {
    headerName: "ID",
    field: "id",
    maxWidth: 100,
    sortable: true,
  },
  {
    headerName: "Name",
    field: "name",
    editable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Amount",
    field: "amount",
    editable: true,
    filter: "agNumberColumnFilter",
    valueFormatter: (p) =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(p.value ?? 0),
    valueParser: (p) => {
      const n = parseFloat(String(p.newValue).replace(/[^\d.-]/g, ""));
      return isNaN(n) ? p.oldValue : n;
    },
  },
  {
    headerName: "Percent",
    field: "percent", // stored as 0..1
    editable: true,
    filter: "agNumberColumnFilter", // user types 0..100 in filter (handled by percentFilterColumns)
    valueFormatter: (p) =>
      new Intl.NumberFormat(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(p.value ?? 0),
    valueParser: (p) => {
      const raw = parseFloat(String(p.newValue).replace(",", "."));
      if (isNaN(raw)) return p.oldValue;
      if (raw > 1.0001) return raw / 100; // accept 20 -> 0.2
      if (raw < 0) return 0;
      return raw;
    },
  },
  {
    headerName: "Active",
    field: "active",
    filter: "agSetColumnFilter",
    valueFormatter: (p) => (p.value ? "Yes" : "No"),
    editable: true,
    valueParser: (p) => !p.oldValue,
    maxWidth: 120,
  },
];

const initialRows: Row[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  amount: Math.round(Math.random() * 100000) / 100,
  percent: Math.round(Math.random() * 1000) / 1000,
  active: Math.random() > 0.5,
}));

const meta: Meta = { title: "Organisms/DataTable.Inline & Bulk" };
export default meta;
type Story = StoryObj;

function InlineEditingAndBulkActionsDemo() {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [selected, setSelected] = React.useState<Array<string | number>>([]);

  const applyBulk = (fn: (row: Row) => Row) => {
    setRows((prev) => prev.map((row) => (selected.includes(row.id) ? fn(row) : row)));
  };

  const onCellValueChanged = (e: CellValueChangedEvent<Row>) => {
    const { data } = e;
    setRows((prev) => prev.map((row) => (row.id === data.id ? { ...data } : row)));
  };

  const gridProps = {
    singleClickEdit: true,
    stopEditingWhenCellsLoseFocus: true,
    enterMovesDownAfterEdit: true,
    onCellValueChanged,
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {selected.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <strong>{selected.length} selected</strong>
          <button onClick={() => applyBulk((r) => ({ ...r, active: true }))}>
            Activate
          </button>
          <button onClick={() => applyBulk((r) => ({ ...r, active: false }))}>
            Deactivate
          </button>
          <button
            onClick={() =>
              setRows((prev) => prev.filter((r) => !selected.includes(r.id)))
            }
          >
            Delete
          </button>
        </div>
      )}

      <DataTable<Row>
        tableId="inline-bulk-demo"
        columns={columns}
        rows={rows}
        showToolbar
        enableDensity
        enableExport
        selectable
        selectionMode="multiple"
        onSelectionChange={(ids) => setSelected(ids)}
        enableFilterBar
        percentFilterColumns={["percent"]}
        gridProps={gridProps}
      />
    </div>
  );
}

export const InlineEditingAndBulkActions: Story = {
  render: () => <InlineEditingAndBulkActionsDemo />,
};
