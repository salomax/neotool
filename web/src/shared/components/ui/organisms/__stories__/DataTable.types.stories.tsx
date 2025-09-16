// web/src/components/organisms/__stories__/DataTable.types.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import type { ColDef } from "ag-grid-community";

type Row = {
  id: number;
  amount: number; // currency-like number
  percent: number; // 0..1
  active: boolean; // boolean
};

const columns: ColDef<Row>[] = [
  {
    headerName: "ID",
    field: "id",
    filter: "agNumberColumnFilter",
    maxWidth: 100,
  },
  {
    headerName: "Amount",
    field: "amount",
    filter: "agNumberColumnFilter",
    valueFormatter: (p) =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(p.value ?? 0),
  },
  {
    headerName: "Percent",
    field: "percent", // stored as 0..1 (sort correto)
    filter: "agNumberColumnFilter", // mas o usuário digita 0..100
    valueFormatter: (p) =>
      new Intl.NumberFormat(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(p.value ?? 0),
  },
  {
    headerName: "Active",
    field: "active",
    filter: "agSetColumnFilter",
    valueFormatter: (p) => (p.value ? "Yes" : "No"),
  },
];

const rows: Row[] = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  amount: Math.round(Math.random() * 100000) / 100,
  percent: Math.round(Math.random() * 1000) / 1000,
  active: Math.random() > 0.5,
}));

const meta: Meta = { title: "Organisms/DataTable.Types" };
export default meta;
type Story = StoryObj;

export const NumericCurrencyPercentBoolean: Story = {
  render: () => (
    <DataTable<Row>
      tableId="types-demo"
      columns={columns}
      rows={rows}
      showToolbar
      enableColumnSelector
      enableDensity
      enableExport
      enableFilterBar
      // diga quais colunas devem aceitar 0..100 no filtro (data continua 0..1)
      percentFilterColumns={["percent"]}
    />
  ),
};
