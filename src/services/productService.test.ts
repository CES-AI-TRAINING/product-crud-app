import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as productService from '../services/productService';
import type { Product } from '../types/product';

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchAllProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts: Product[] = [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ];

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await productService.fetchAllProducts();

      expect(result).toEqual(mockProducts);
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.fetchAllProducts()).rejects.toThrow(
        'Failed to fetch products'
      );
    });
  });

  describe('getProduct', () => {
    it('should fetch a single product by id', async () => {
      const mockProduct: Product = { id: 1, title: 'Product 1', price: 10 };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await productService.getProduct(1);

      expect(result).toEqual(mockProduct);
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
    });

    it('should throw error when product not found', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.getProduct(999)).rejects.toThrow(
        'Failed to fetch product'
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProduct: Product = { title: 'New Product', price: 15 };
      const createdProduct: Product = { id: 3, ...newProduct };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => createdProduct,
      });

      const result = await productService.createProduct(newProduct);

      expect(result).toEqual(createdProduct);
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
    });

    it('should throw error when creation fails', async () => {
      const newProduct: Product = { title: 'New Product', price: 15 };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.createProduct(newProduct)).rejects.toThrow(
        'Failed to create product'
      );
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const update: Partial<Product> = { price: 25 };
      const updatedProduct: Product = { id: 1, title: 'Product 1', price: 25 };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => updatedProduct,
      });

      const result = await productService.updateProduct(1, update);

      expect(result).toEqual(updatedProduct);
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });
    });

    it('should throw error when update fails', async () => {
      const update: Partial<Product> = { price: 25 };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.updateProduct(1, update)).rejects.toThrow(
        'Failed to update product'
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
      });

      const result = await productService.deleteProduct(1);

      expect(result).toBeUndefined();
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1', {
        method: 'DELETE',
      });
    });

    it('should throw error when deletion fails', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.deleteProduct(1)).rejects.toThrow(
        'Failed to delete product'
      );
    });
  });
});
