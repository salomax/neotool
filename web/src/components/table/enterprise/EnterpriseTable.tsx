"use client";
import * as React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  ColumnApi,
  ICellEditorParams,
} from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { savePreset, loadPreset, clearPreset } from "./presets";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule as any]);

function PercentEditor(props: ICellEditorParams) {
  const startVal = (() => {
    const v = props.value ?? null;
    return v == null ? "" : String(Number(v) * 100);
  })();
  const [val, setVal] = React.useState<string>(startVal);
  const ref = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  const getValue = React.useCallback(() => {
    if (val === "") return null;
    const n = Number(String(val).replace(",", "."));
    if (!Number.isFinite(n)) return null;
    return n > 1 ? n / 100 : n; // 20 -> 0.2
  }, [val]);
  (props as any).getValue = getValue;
  return (
    <TextField
      inputRef={ref}
      size="small"
      type="number"
      inputMode="decimal"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (props as any).stopEditing?.();
      }}
      sx={{ width: 100 }}
    />
  );
}

type Row = { id: number; name: string; percent: number | null; amount: number };

const PRESET_KEY = "neotool.enterprise.columns.v1";

export default function EnterpriseTable() {
  const [quickFilter, setQuickFilter] = React.useState("");
  const [rowData, setRowData] = React.useState<Row[]>([
    { id: 1, name: "Alpha", percent: 0.2, amount: 1500 },
    { id: 2, name: "Beta", percent: 0.05, amount: 320 },
    { id: 3, name: "Gamma", percent: 0.725, amount: 980 },
  ]);

  const gridApi = React.useRef<GridApi | null>(null);
  const colApi = React.useRef<ColumnApi | null>(null);

  const columnDefs = React.useMemo<ColDef<Row>[]>(
    () => [
      {
        headerName: "",
        field: "__sel__" as any,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 48,
        pinned: "left",
        sortable: false,
        filter: false,
      },
      {
        headerName: "ID",
        field: "id",
        filter: "agNumberColumnFilter",
        width: 100,
      },
      {
        headerName: "Name",
        field: "name",
        filter: "agTextColumnFilter",
        flex: 1,
        editable: true,
      },
      {
        headerName: "Percent",
        field: "percent",
        filter: "agNumberColumnFilter",
        editable: true,
        cellEditor: PercentEditor as any,
        valueFormatter: (p) =>
          p.value == null || p.value === ""
            ? ""
            : `${(Number(p.value) * 100).toFixed(0)}%`,
      },
      {
        headerName: "Amount",
        field: "amount",
        filter: "agNumberColumnFilter",
        editable: true,
        valueFormatter: (p) =>
          p.value == null
            ? ""
            : p.value.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              }),
      },
    ],
    [],
  );

  const defaultColDef = React.useMemo<ColDef>(
    () => ({ sortable: true, resizable: true }),
    [],
  );

  const onGridReady = (e: any) => {
    gridApi.current = e.api as GridApi;
    colApi.current = e.columnApi as ColumnApi;
    const state = loadPreset(PRESET_KEY);
    if (state) colApi.current.applyColumnState({ state, applyOrder: true });
  };

  const handleExportCsv = () => gridApi.current?.exportDataAsCsv?.();
  const handleSavePreset = () => {
    const s = colApi.current?.getColumnState?.();
    if (s) savePreset(PRESET_KEY, s);
  };
  const handleLoadPreset = () => {
    const st = loadPreset(PRESET_KEY);
    if (st) colApi.current?.applyColumnState?.({ state: st, applyOrder: true });
  };
  const handleResetPreset = () => {
    clearPreset(PRESET_KEY);
    colApi.current?.resetColumnState?.();
  };
  const handleDeleteSelected = () => {
    const nodes = gridApi.current?.getSelectedNodes?.() || [];
    const ids = new Set<number>(nodes.map((n: any) => n.data?.id));
    setRowData((rows) => rows.filter((r) => !ids.has(r.id)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }} data-testid="enterprise-title">
        Enterprise Table
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
        <TextField
          size="small"
          placeholder="Quick filter…"
          value={quickFilter}
          onChange={(e) => setQuickFilter(e.target.value)}
          data-testid="enterprise-quick-filter"
          inputProps={{ "data-testid": "enterprise-quick-filter-input" }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          onClick={handleDeleteSelected}
          data-testid="enterprise-delete"
        >
          Delete Selected
        </Button>
        <Button
          variant="outlined"
          onClick={handleExportCsv}
          data-testid="enterprise-export"
        >
          Export CSV
        </Button>
        <Button variant="outlined" onClick={handleSavePreset}>
          Save Preset
        </Button>
        <Button variant="outlined" onClick={handleLoadPreset}>
          Load Preset
        </Button>
        <Button variant="text" onClick={handleResetPreset}>
          Reset
        </Button>
      </Stack>
      <div className="ag-theme-quartz" style={{ height: 480 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection
          onGridReady={onGridReady}
          quickFilterText={quickFilter}
        />
      </div>
    </Box>
  );
}
