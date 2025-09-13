// web/src/components/organisms/__stories__/DataTable.validation.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../DataTable";
import type {
  ColDef,
  CellValueChangedEvent,
  GridApi,
  RowClassRules,
} from "ag-grid-community";
import { z } from "zod";
import "./DataTable.validation.css";

type Row = {
  id: number;
  name: string;
  amount: number; // >= 0
  percent: number; // 0..1
  active: boolean;
};

const RowSchema = z.object({
  id: z.number(),
  name: z.string().min(3, "Name must be at least 3 chars"),
  amount: z
    .number()
    .min(0, "Amount must be >= 0")
    .max(1_000_000, "Amount too large"),
  percent: z
    .number()
    .min(0, "Percent must be >= 0%")
    .max(1, "Percent must be <= 100%"),
  active: z.boolean(),
});
type RowErrs = Partial<Record<keyof Row, string>>;

const colsFactory = (
  errorsRef: React.MutableRefObject<Map<number, RowErrs>>,
): ColDef<Row>[] => [
  {
    headerName: "ID",
    field: "id",
    dataType: "number",
    maxWidth: 100,
    sortable: true,
  },
  {
    headerName: "Name",
    field: "name",
    editable: true,
    filter: "agTextColumnFilter",
    tooltipValueGetter: (p) => errorsRef.current.get(p.data.id)?.name,
    cellClassRules: {
      "cell-error": (p) => !!errorsRef.current.get(p.data.id)?.name,
    },
  },
  {
    headerName: "Amount",
    field: "amount",
    dataType: "number",
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
    tooltipValueGetter: (p) => errorsRef.current.get(p.data.id)?.amount,
    cellClassRules: {
      "cell-error": (p) => !!errorsRef.current.get(p.data.id)?.amount,
    },
  },
  {
    headerName: "Percent",
    field: "percent",
    dataType: "number",
    editable: true,
    filter: "agNumberColumnFilter",
    valueFormatter: (p) =>
      new Intl.NumberFormat(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(p.value ?? 0),
    valueParser: (p) => {
      const raw = parseFloat(String(p.newValue).replace(",", "."));
      if (isNaN(raw)) return p.oldValue;
      if (raw > 1.0001) return raw / 100;
      if (raw < 0) return 0;
      return raw;
    },
    tooltipValueGetter: (p) => errorsRef.current.get(p.data.id)?.percent,
    cellClassRules: {
      "cell-error": (p) => !!errorsRef.current.get(p.data.id)?.percent,
    },
  },
  {
    headerName: "Active",
    field: "active",
    dataType: "boolean",
    filter: "agSetColumnFilter",
    valueFormatter: (p) => (p.value ? "Yes" : "No"),
    editable: true,
    valueParser: (p) => !p.oldValue,
    maxWidth: 120,
    tooltipValueGetter: (p) => errorsRef.current.get(p.data.id)?.active,
    cellClassRules: {
      "cell-error": (p) => !!errorsRef.current.get(p.data.id)?.active,
    },
  },
];

const initialRows: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  amount: Math.round(Math.random() * 100000) / 100,
  percent: Math.round(Math.random() * 1000) / 1000,
  active: Math.random() > 0.5,
}));

const meta: Meta = { title: "Organisms/DataTable.Validation & Status" };
export default meta;
type Story = StoryObj;

function InlineValidationSaveRevertDemo() {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [selected, setSelected] = React.useState<Array<string | number>>([]);

  const dirtyIdsRef = React.useRef<Set<number>>(new Set());
  const [, force] = React.useState(0);
  const forceRender = () => force((x) => x + 1);

  const originalRef = React.useRef<Map<number, Row>>(
    new Map(initialRows.map((r) => [r.id, { ...r }])),
  );

  const errorsRef = React.useRef<Map<number, RowErrs>>(new Map());

  const columns = React.useMemo(() => colsFactory(errorsRef), []);

  const rowClassRules: RowClassRules = {
    "row-dirty": (p) => dirtyIdsRef.current.has(p.data.id),
  };

  const updateErrors = (
    rowId: number,
    update: (current: RowErrs) => RowErrs,
  ) => {
    const current = errorsRef.current.get(rowId) || {};
    const next = update(current);
    if (Object.keys(next).length === 0) errorsRef.current.delete(rowId);
    else errorsRef.current.set(rowId, next);
  };

  const validateField = (data: Row, field: keyof Row): string | undefined => {
    const partial = { ...data };
    const parsed = ((): any => {
      const res = { success: true as const };
      try {
        RowSchema.parse(partial);
      } catch (e: any) {
        return { success: false as const, error: e };
      }
      return res;
    })();
    if (parsed.success) return undefined;
    const issues = parsed.error.issues as Array<{
      path: (keyof Row)[];
      message: string;
    }>;
    const issue = issues.find((i) => i.path[0] === field);
    return issue?.message;
  };

  const onCellValueChanged = (e: CellValueChangedEvent<Row>) => {
    const { data, oldValue, colDef } = e;
    const field = (colDef.field || "") as keyof Row;
    if (!field) return;

    const msg = validateField(data, field);

    if (msg) {
      const id = data.id as number;
      const reverted = rows.map((r) =>
        r.id === id ? { ...r, [field]: oldValue } : r,
      );
      setRows(reverted);
      updateErrors(id, (prev) => ({ ...prev, [field]: msg }));
      forceRender();
      e.api.flashCells({ rowNodes: [e.node], columns: [e.column.getId()] });
      return;
    }

    updateErrors(data.id, (prev) => {
      const { [field]: _field, ...rest } = prev;
      return rest;
    });
    forceRender();
    dirtyIdsRef.current.add(data.id);
  };

  const apiRef = React.useRef<GridApi<Row> | null>(null);

  const saveAll = () => {
    rows.forEach((r) => originalRef.current.set(r.id, { ...r }));
    dirtyIdsRef.current.clear();
    forceRender();
    apiRef.current?.flashCells();
  };

  const revertSelected = () => {
    const selectedIds = new Set(selected.map((x) => Number(x)));
    const reverted = rows.map((r) =>
      selectedIds.has(r.id) ? originalRef.current.get(r.id) || r : r,
    );
    setRows(reverted);
    selectedIds.forEach((id) => {
      errorsRef.current.delete(id);
      dirtyIdsRef.current.delete(id);
    });
    forceRender();
    apiRef.current?.flashCells();
  };

  const onGridReady = (p: { api: GridApi<Row> }) => {
    apiRef.current = p.api;
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rows, saveAll]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
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
        <strong>{dirtyIdsRef.current.size} dirty</strong>
        <button onClick={saveAll}>Save all (⌘/Ctrl+S)</button>
        <button onClick={revertSelected} disabled={selected.length === 0}>
          Revert selected
        </button>
      </div>

      <DataTable<Row>
        tableId="validation-demo"
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
        gridProps={{
          singleClickEdit: true,
          stopEditingWhenCellsLoseFocus: true,
          enterMovesDownAfterEdit: true,
          onCellValueChanged,
          rowClassRules,
          onGridReady,
        }}
      />
    </div>
  );
}

export const InlineValidationSaveRevert: Story = {
  render: () => <InlineValidationSaveRevertDemo />,
};
