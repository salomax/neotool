"use client";

import * as React from "react";
import { Paper, Box, Stack, Typography, Divider } from "@mui/material";
import type { ColDef } from "ag-grid-community";
import { DataTable } from "../components/organisms/DataTable";

export interface ListPageProps<T extends object> {
  title: string;
  columns: ColDef<T>[];
  rows: T[];
  actions?: React.ReactNode; // e.g., buttons on the right of header
  filters?: React.ReactNode; // optional filter bar above the table
  loading?: boolean;
  error?: string;
  totalRows?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export function ListPage<T extends object>(props: ListPageProps<T>) {
  const {
    title,
    actions,
    filters,
    columns,
    rows,
    loading,
    error,
    totalRows,
    page,
    pageSize,
    onPageChange,
  } = props;

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography variant="h5">{title}</Typography>
        <Box>{actions}</Box>
      </Stack>
      {filters && (
        <Box sx={{ mb: 1 }}>
          {filters}
          <Divider sx={{ mt: 1 }} />
        </Box>
      )}
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        totalRows={totalRows}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </Paper>
  );
}

export default ListPage;
