import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Badge", () => {
  it("renders label", () => {
    render(<Badge label="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
