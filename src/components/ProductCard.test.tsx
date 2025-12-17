import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { TestProviders } from "../test-utils";

const product = { id: 1, title: "No image", price: 10 };

test("renders fallback when image missing", () => {
  render(
    <TestProviders>
      <ProductCard
        product={product as any}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </TestProviders>
  );

  expect(screen.getByText("📦")).toBeInTheDocument();
});
