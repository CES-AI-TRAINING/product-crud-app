import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../ProductForm";

const initial = {
  id: 1,
  title: "Old",
  price: 5,
  description: "D",
  image: "img",
};

describe("ProductForm", () => {
  it("renders initial values and submits updated product", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onSubmit = vi.fn();
    render(
      <ProductForm initial={initial} onCancel={onCancel} onSubmit={onSubmit} />
    );

    expect(screen.getByDisplayValue("Old")).toBeInTheDocument();
    const titleInput = screen.getByDisplayValue("Old") as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, "New");
    await user.click(screen.getByText("Save"));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: "New" })
    );
  });

  it("does not submit when title is empty", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onSubmit = vi.fn();
    render(<ProductForm onCancel={onCancel} onSubmit={onSubmit} />);

    await user.click(screen.getByText("Save"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
