import type { Product } from '../types/product'

const BASE = 'https://fakestoreapi.com'

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export async function createProduct(body: Product): Promise<Product> {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}

export async function updateProduct(id: number, body: Partial<Product>): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete product')
  return
}
