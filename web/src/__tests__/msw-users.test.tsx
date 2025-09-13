import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importa com alias claro para o teste
import UserTestPage from "@/app/(app)/examples/msw-users/page";

function renderWithClient(ui: React.ReactElement) {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe("MSW Users page", () => {
  it("lists and creates users via MSW handlers (by data-testid)", async () => {
    renderWithClient(<UserTestPage />);

    // Lista inicial mocked (Ada / Grace) via MSW setup fallback
    const initial = await screen.findAllByTestId("user-item");
    expect(initial.length).toBeGreaterThanOrEqual(2);

    // Preenche via data-testid (independente de i18n/labels)
    await userEvent.type(screen.getByTestId("users-name-input"), "Linus");
    await userEvent.type(screen.getByTestId("users-email-input"), "linus@example.com");
    await userEvent.click(screen.getByTestId("users-add"));

    // Deve aparecer o novo usuário
    expect(await screen.findByText(/Linus/)).toBeInTheDocument();
  });
});
