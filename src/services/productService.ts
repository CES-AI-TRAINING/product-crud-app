import type { Product } from '../types/product'

const BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'https://fakestoreapi.com'

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let body: any
    try {
      body = await res.json()
    } catch {
      body = await res.text()
    }
    throw new Error(`Request failed: ${res.status} ${res.statusText} - ${JSON.stringify(body)}`)
  }
  return res.json()
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`)
  return parseResponse<Product[]>(res)
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  return parseResponse<Product>(res)
}

export async function createProduct(body: Product): Promise<Product> {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<Product>(res)
}

export async function updateProduct(id: number, body: Partial<Product>): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<Product>(res)
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'DELETE',
  })
  await parseResponse(res)
  return
}
