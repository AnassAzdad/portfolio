import { render, screen } from "@testing-library/react";
import App from "./App";

test("toont de naam op de homepage", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Anass Azdad");
});
