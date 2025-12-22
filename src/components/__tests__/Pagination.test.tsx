import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("renders correct number of pages and highlights current", async () => {
    const onChange = vi.fn();
    render(
      <Pagination current={2} total={45} perPage={10} onChange={onChange} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
    expect(buttons[1]).toHaveClass("active");
  });

  it("calls onChange with correct page when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination current={1} total={30} perPage={10} onChange={onChange} />
    );
    await user.click(screen.getByText("3"));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
