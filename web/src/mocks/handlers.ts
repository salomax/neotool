import { http, HttpResponse, delay } from "msw";

type User = { id: string; name: string; email: string };

let users: User[] = [
  { id: "u1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: "u2", name: "Grace Hopper", email: "grace@example.com" }
];

export const handlers = [
  http.get("/api/mock/users", async () => {
    await delay(400);
    return HttpResponse.json(users);
  }),
  http.post("/api/mock/users", async ({ request }) => {
    const body = (await request.json()) as Partial<User>;
    const id = "u" + Math.random().toString(36).slice(2, 8);
    const user: User = { id, name: body.name ?? "Unnamed", email: body.email ?? "" };
    users.push(user);
    await delay(300);
    return HttpResponse.json(user, { status: 201 });
  }),
  http.put("/api/mock/users/:id", async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as Partial<User>;
    users = users.map(u => u.id === id ? { ...u, ...body, id } : u);
    await delay(250);
    const found = users.find(u => u.id == id);
    if (!found) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(found);
  }),
  http.delete("/api/mock/users/:id", async ({ params }) => {
    const id = String(params.id);
    const before = users.length;
    users = users.filter(u => u.id !== id);
    await delay(200);
    return new HttpResponse(null, { status: before === users.length ? 404 : 204 });
  }),
];
