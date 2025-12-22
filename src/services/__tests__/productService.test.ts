import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../productService'
import type { Product } from '../../types/product'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('productService', () => {
  it('fetchAllProducts returns data when fetch ok', async () => {
    const mockProducts: Product[] = [{ id: 1, title: 'x', price: 9.99, description: 'd', image: 'img' }]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => mockProducts }))
    const res = await fetchAllProducts()
    expect(res).toEqual(mockProducts)
  })

  it('fetchAllProducts throws when fetch not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(fetchAllProducts()).rejects.toThrow('Failed to fetch products')
  })

  it('getProduct returns a product on success', async () => {
    const mockProduct: Product = { id: 2, title: 'p', price: 1, description: 'd', image: 'i' }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => mockProduct }))
    const res = await getProduct(2)
    expect(res).toEqual(mockProduct)
  })

  it('createProduct posts body and returns product', async () => {
    const body: Product = { title: 'new', price: 2, description: 'd', image: 'i' }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ...body, id: 3 }) }))
    const res = await createProduct(body)
    expect(res).toEqual({ ...body, id: 3 })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/products'), expect.objectContaining({ method: 'POST' }))
  })

  it('updateProduct uses PUT and returns product', async () => {
    const body = { title: 'updated' }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 4, ...body }) }))
    const res = await updateProduct(4, body)
    expect(res).toEqual({ id: 4, ...body })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/products/4'), expect.objectContaining({ method: 'PUT' }))
  })

  it('deleteProduct calls DELETE and resolves on ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    await expect(deleteProduct(5)).resolves.toBeUndefined()
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/products/5'), expect.objectContaining({ method: 'DELETE' }))
  })
})
