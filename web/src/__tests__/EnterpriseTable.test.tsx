import React from "react";
import { render, screen, within } from "@testing-library/react";
import EnterpriseTable from "@/components/table/enterprise/EnterpriseTable";

describe("EnterpriseTable", () => {
  it("renders title and actions", async () => {
    render(<EnterpriseTable />);
    expect(await screen.findByText(/Enterprise Table/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export CSV/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete Selected/i })).toBeInTheDocument();
  });
});
