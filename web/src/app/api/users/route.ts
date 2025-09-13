import { NextResponse } from "next/server";

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

// Deterministic PRNG for stable mock data
function mulberry32(a: number) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const roles: Role[] = ["Admin", "Manager", "Viewer"];
const statuses: Status[] = ["active", "pending", "blocked"];
const names = [
  "Alice",
  "Bob",
  "Carol",
  "Dave",
  "Eva",
  "Frank",
  "Grace",
  "Hugo",
  "Ivy",
  "John",
  "Katy",
  "Leo",
  "Mila",
  "Noah",
  "Olga",
  "Paul",
  "Quinn",
  "Rita",
  "Sam",
  "Tina",
  "Uma",
  "Vic",
  "Wes",
  "Xena",
  "Yuri",
  "Zoe",
];

function makeData(count = 1000): Row[] {
  const rand = mulberry32(123456);
  const rows: Row[] = [];
  for (let i = 0; i < count; i++) {
    const first = names[i % names.length];
    const lastInitial = String.fromCharCode(65 + (i % 26)) + ".";
    const name = `${first} ${lastInitial}`;
    const email =
      `${first}.${lastInitial.replace(".", "")}${i}@example.com`.toLowerCase();
    const role = roles[Math.floor(rand() * roles.length)] as Role;
    const status = statuses[Math.floor(rand() * statuses.length)] as Status;
    const year = 2023 + Math.floor(rand() * 2); // 2023-2024
    const month = Math.floor(rand() * 12);
    const day = 1 + Math.floor(rand() * 28);
    const createdAt = new Date(Date.UTC(year, month, day)).toISOString();
    const amount = Math.round(rand() * 10000 * 100) / 100;
    rows.push({ id: i + 1, name, email, role, status, createdAt, amount });
  }
  return rows;
}

const DATA = makeData();

function applyFilters(rows: Row[], params: URLSearchParams): Row[] {
  let out = rows.slice();
  const search = params.get("search")?.toLowerCase().trim();
  if (search) {
    out = out.filter(
      (r) =>
        r.name.toLowerCase().includes(search) ||
        r.email.toLowerCase().includes(search),
    );
  }
  const role = params.get("role");
  if (role) out = out.filter((r) => r.role === role);
  const status = params.get("status");
  if (status) out = out.filter((r) => r.status === status);
  const start = params.get("start");
  if (start) {
    const t = Date.parse(start);
    if (!isNaN(t)) out = out.filter((r) => Date.parse(r.createdAt) >= t);
  }
  const end = params.get("end");
  if (end) {
    const t = Date.parse(end);
    if (!isNaN(t)) out = out.filter((r) => Date.parse(r.createdAt) <= t);
  }
  const minAmount = params.get("minAmount");
  if (minAmount != null && minAmount !== "") {
    const n = Number(minAmount);
    if (!Number.isNaN(n)) out = out.filter((r) => r.amount >= n);
  }
  return out;
}

function applySort(rows: Row[], sort: string | null): Row[] {
  if (!sort) return rows;
  const parts = sort
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const sorted = rows.slice().sort((a, b) => {
    for (const p of parts) {
      const [col, dir] = p.split(":");
      const va = (a as any)[col];
      const vb = (b as any)[col];
      let cmp = 0;
      if (va == null && vb != null) cmp = -1;
      else if (va != null && vb == null) cmp = 1;
      else if (typeof va === "number" && typeof vb === "number") cmp = va - vb;
      else cmp = String(va).localeCompare(String(vb));
      if (cmp !== 0) return dir === "desc" ? -cmp : cmp;
    }
    return 0;
  });
  return sorted;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10) || 0);
  const pageSize = Math.max(
    1,
    parseInt(searchParams.get("pageSize") ?? "25", 10) || 25,
  );
  const sort = searchParams.get("sort");

  let rows = applyFilters(DATA, searchParams);
  rows = applySort(rows, sort);

  const total = rows.length;
  const start = page * pageSize;
  const slice = rows.slice(start, start + pageSize);

  return NextResponse.json({ rows: slice, total }, { status: 200 });
}
