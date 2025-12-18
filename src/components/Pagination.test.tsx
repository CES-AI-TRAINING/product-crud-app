import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('renders pagination buttons for all pages', () => {
    const onChange = vi.fn();

    render(
      <Pagination
        current={1}
        total={50}
        perPage={10}
        onChange={onChange}
      />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('marks current page as active', () => {
    const onChange = vi.fn();

    render(
      <Pagination
        current={2}
        total={50}
        perPage={10}
        onChange={onChange}
      />
    );

    const activeButton = screen.getByRole('button', { name: '2' });
    expect(activeButton).toHaveClass('active');
  });

  it('does not mark other pages as active', () => {
    const onChange = vi.fn();

    render(
      <Pagination
        current={2}
        total={50}
        perPage={10}
        onChange={onChange}
      />
    );

    const button1 = screen.getByRole('button', { name: '1' });
    const button3 = screen.getByRole('button', { name: '3' });
    expect(button1).not.toHaveClass('active');
    expect(button3).not.toHaveClass('active');
  });

  it('calls onChange when a page button is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        current={1}
        total={50}
        perPage={10}
        onChange={onChange}
      />
    );

    const button3 = screen.getByRole('button', { name: '3' });
    await user.click(button3);

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calculates correct number of pages', () => {
    const onChange = vi.fn();

    render(
      <Pagination
        current={1}
        total={75}
        perPage={10}
        onChange={onChange}
      />
    );

    expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
  });

  it('handles single page correctly', () => {
    const onChange = vi.fn();

    render(
      <Pagination
        current={1}
        total={5}
        perPage={10}
        onChange={onChange}
      />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
  });
});
