import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component with link to View Current Employees", () => {
  render(<App />);
  const linkElement = screen.getByText(/View Current Employees/i);
  expect(linkElement).toBeInTheDocument();
});
