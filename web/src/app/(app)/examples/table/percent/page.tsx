"use client";
import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { percentColDef, withResetFilter } from "@/components/table/agGrid.utils";

// AG Grid styles (ensure dependency is installed)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Register modules (v34+ modular)
ModuleRegistry.registerModules([AllCommunityModule as any]);

export default function PercentDemoPage() {
  const [rowData] = React.useState([
    { id: 1, name: "Alpha", percent: 0.2, amount: 1500 },
    { id: 2, name: "Beta",  percent: 0.05, amount: 320  },
    { id: 3, name: "Gamma", percent: 0.725, amount: 980 },
  ]);

  const columnDefs = React.useMemo(() => [
    withResetFilter({ headerName: "ID", field: "id", filter: "agNumberColumnFilter", width: 100 }),
    withResetFilter({ headerName: "Name", field: "name", filter: "agTextColumnFilter", flex: 1 }),
    percentColDef("percent", { headerName: "Percent", decimals: 0, width: 120 }),
    withResetFilter({
      headerName: "Amount",
      field: "amount",
      filter: "agNumberColumnFilter",
      valueFormatter: (p: any) => p.value == null ? "" : p.value.toLocaleString(undefined, { style: "currency", currency: "USD" })
    }),
  ], []);

  const defaultColDef = React.useMemo(() => ({ sortable: true, resizable: true }), []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>AG Grid — Percent & Reset filter</Typography>
      <div className="ag-theme-quartz" style={{ height: 420 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef as any}
        />
      </div>
    </Box>
  );
}
