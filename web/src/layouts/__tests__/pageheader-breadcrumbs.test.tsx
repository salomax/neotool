import React from "react";
import { render, screen } from "@testing-library/react";
import PageHeader from "@/layouts/PageHeader";
import "@/i18n/config";

vi.mock("next/navigation", () => ({
  usePathname: () => "/examples/forms/customer",
}));

describe("PageHeader breadcrumbs", () => {
  it("gera itens com data-testid e marca o último como current", () => {
    render(<PageHeader />);
    const items = screen.getAllByTestId("breadcrumb-item");
    // home + 3 segmentos = 4, mas só contamos os itens gerados após home aqui:
    // Como o test busca por "breadcrumb-item" incluímos Home também (quatro no total):
    expect(items.length).toBe(4);
    const last = items[items.length - 1];
    expect(last).toHaveAttribute("data-current", "true");
  });
});
