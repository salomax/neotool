"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack, Button } from "@mui/material";
import type { ColDef } from "ag-grid-community";
import { DataTable } from "../../components/organisms/DataTable";
import { FilterBar } from "../../components/organisms/FilterBar";
import { useDataTableQuery } from "../../hooks/useDataTableQuery";
import { toSearchString, parseNumberParam } from "../../lib/url";

type Role = "Admin" | "Manager" | "Viewer";
type Status = "active" | "pending" | "blocked";
type Row = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: string;
  amount: number;
};

const columns: ColDef<Row>[] = [
  { headerName: "ID", field: "id", maxWidth: 90, pinned: "left" },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Role", field: "role" },
  { headerName: "Status", field: "status" },
  {
    headerName: "Created At",
    field: "createdAt",
    valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
  },
  {
    headerName: "Amount",
    field: "amount",
    valueFormatter: (p) =>
      p.value?.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
      }),
  },
];

function useUrlState() {
  const router = useRouter();
  const search = useSearchParams();

  const page = Math.max(0, parseNumberParam(search.get("page"), 0));
  const pageSize = Math.max(1, parseNumberParam(search.get("pageSize"), 25));
  const sort = search.get("sort") ?? "";
  const q = search.get("search") ?? "";
  const role = search.get("role") ?? "";
  const status = search.get("status") ?? "";
  const start = search.get("start") ?? "";
  const end = search.get("end") ?? "";
  const minAmount = search.get("minAmount") ?? "";

  const setParams = (patch: Record<string, any>) => {
    const next = {
      page,
      pageSize,
      sort,
      search: q,
      role,
      status,
      start,
      end,
      minAmount,
      ...patch,
    };
    router.replace("/users" + toSearchString(next));
  };

  return {
    page,
    pageSize,
    sort,
    q,
    role,
    status,
    start,
    end,
    minAmount,
    setParams,
  };
}

function UsersInner() {
  const {
    page,
    pageSize,
    sort,
    q,
    role,
    status,
    start,
    end,
    minAmount,
    setParams,
  } = useUrlState();

  const fetcher = async (params: any) => {
    const qs = toSearchString({
      page: params.page,
      pageSize: params.pageSize,
      sort: params.sort,
      search: params.search,
      role: params.filters?.role,
      status: params.filters?.status,
      start: params.filters?.start ?? undefined,
      end: params.filters?.end ?? undefined,
      minAmount: params.filters?.minAmount ?? undefined,
    });
    const res = await fetch("/api/users" + qs, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
  };

  const { rows, total, isLoading } = useDataTableQuery<Row>(
    ["users"],
    {
      page,
      pageSize,
      sort,
      search: q,
      filters: {
        role: role || undefined,
        status: status || undefined,
        start: start || undefined,
        end: end || undefined,
        minAmount: minAmount === "" ? "" : Number(minAmount),
      },
    },
    fetcher,
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <FilterBar
          schema={[
            {
              type: "text",
              name: "search",
              label: "Search",
              placeholder: "Name or email",
            },
            {
              type: "select",
              name: "role",
              label: "Role",
              options: [
                { label: "All", value: "" },
                ...(["Admin", "Manager", "Viewer"] as const).map((r) => ({
                  label: r,
                  value: r,
                })),
              ],
            },
            {
              type: "select",
              name: "status",
              label: "Status",
              options: [
                { label: "All", value: "" },
                ...(["active", "pending", "blocked"] as const).map((s) => ({
                  label: s,
                  value: s,
                })),
              ],
            },
            {
              type: "dateRange",
              nameStart: "start",
              nameEnd: "end",
              labelStart: "From",
              labelEnd: "To",
            },
            {
              type: "number",
              name: "minAmount",
              label: "Min amount",
              fractionDigits: 2,
              locale: "en-US",
            },
          ]}
          defaultValues={{
            search: q,
            role,
            status,
            start: start || null,
            end: end || null,
            minAmount,
          }}
          onChange={(v) => {
            setParams({
              search: v.search || "",
              role: v.role || "",
              status: v.status || "",
              start: v.start || "",
              end: v.end || "",
              minAmount: v.minAmount ?? "",
              page: 0,
            });
          }}
          onReset={() =>
            setParams({
              search: "",
              role: "",
              status: "",
              start: "",
              end: "",
              minAmount: "",
              page: 0,
            })
          }
          actionsRight={
            <Button variant="contained" onClick={() => alert("Create user")}>
              New user
            </Button>
          }
        />

        <DataTable<Row>
          columns={columns}
          rows={rows}
          totalRows={total}
          page={page}
          pageSize={pageSize}
          onPageChange={(p) => setParams({ page: p })}
          sort={sort}
          onSortChange={(s) => setParams({ sort: s, page: 0 })}
          showToolbar
          enableColumnSelector
          enableDensity
          enableExport
          selectable
          selectionMode="multiple"
          onSelectionChange={(ids) => console.log("selected ids", ids)}
          height={560}
          loading={isLoading}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default function UsersPage() {
  const [client] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <UsersInner />
    </QueryClientProvider>
  );
}
