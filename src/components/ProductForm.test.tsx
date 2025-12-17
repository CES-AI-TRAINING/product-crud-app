import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";
import { TestProviders } from "../test-utils";

test("shows validation error when title is missing", async () => {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();
  render(
    <TestProviders>
      <ProductForm onCancel={onCancel} onSubmit={onSubmit} />
    </TestProviders>
  );

  fireEvent.click(screen.getByRole("button", { name: /save/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Title is required"
  );
  expect(onSubmit).not.toHaveBeenCalled();
});
