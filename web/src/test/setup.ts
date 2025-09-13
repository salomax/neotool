// src/test/setup.ts
// Jest-DOM + RTL setup + MSW (node) + polyfills necessários (sem JSX aqui)
import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { setupServer } from "msw/node";

// -------- Handlers (carregados ANTES do setupServer) --------
let handlers: any[] = [];
try {
  // Tenta usar os handlers oficiais do projeto
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  handlers = require("@/mocks/handlers").handlers;
} catch {
  try {
    // fallback relativo
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    handlers = require("../mocks/handlers").handlers;
  } catch {
    // Fallback embutido (rota /api/mock/users) — garante testes mesmo sem arquivo
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { http, HttpResponse, delay } = require("msw");
      handlers = [
        http.get("/api/mock/users", async () => {
          await delay(50);
          return HttpResponse.json([
            { id: "u1", name: "Ada Lovelace", email: "ada@example.com" },
            { id: "u2", name: "Grace Hopper", email: "grace@example.com" },
          ]);
        }),
        http.post("/api/mock/users", async ({ request }: any) => {
          const body = await request.json();
          await delay(20);
          return HttpResponse.json({ id: "uX", name: body?.name ?? "User", email: body?.email ?? "" }, { status: 201 });
        }),
        // delete responde 204
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        http.delete("/api/mock/users/:id", async () => new (require("msw").HttpResponse)(null, { status: 204 })),
      ];
    } catch {
      handlers = [];
    }
  }
}

// -------- MSW (node) --------
export const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// -------- Polyfills p/ JSDOM usados por MUI/AG Grid --------
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!("ResizeObserver" in globalThis)) {
  // @ts-ignore
  globalThis.ResizeObserver = ResizeObserver as any;
}
if (!("matchMedia" in window)) {
  // @ts-ignore
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// next/link mock SEM JSX (arquivo .ts)
vi.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ href, children, ...rest }: any) =>
      React.createElement("a", { href: typeof href === "string" ? href : "#", ...rest }, children),
  };
});
