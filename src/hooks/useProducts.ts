import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product } from '../types/product'
import * as api from '../services/productService'

export function useAllProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: api.fetchAllProducts,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Product) => api.createProduct(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useUpdateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => api.updateProduct(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}
