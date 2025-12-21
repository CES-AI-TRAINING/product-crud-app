import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'A test product',
    image: 'https://via.placeholder.com/150',
  };

  it('renders product information', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />
    );

    const image = screen.getByAltText('Test Product') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://via.placeholder.com/150');
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it('renders without optional fields', () => {
    const minimalProduct: Product = {
      id: 1,
      title: 'Minimal Product',
      price: 19.99,
    };
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ProductCard product={minimalProduct} onEdit={onEdit} onDelete={onDelete} />
    );

    expect(screen.getByText('Minimal Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
