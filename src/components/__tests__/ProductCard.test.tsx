import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";

const product = {
  id: 1,
  title: "T",
  price: 10,
  description: "D",
  image: "img",
};

describe("ProductCard", () => {
  it("renders product info and handles actions", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
    );

    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    await user.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(product);
    await user.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith(product.id);
  });
});
