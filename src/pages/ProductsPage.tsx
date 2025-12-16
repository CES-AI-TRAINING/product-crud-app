import { useState } from 'react'
import { useAllProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import ProductForm from '../components/ProductForm'
import type { Product } from '../types/product'

const PER_PAGE = 6

export default function ProductsPage() {
  const { data: products = [] as Product[], isLoading, error } = useAllProducts()
  const create = useCreateProduct()
  const update = useUpdateProduct()
  const del = useDeleteProduct()

  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Product | undefined>(undefined)
  const [showForm, setShowForm] = useState(false)

  const start = (page - 1) * PER_PAGE
  const paginated = products.slice(start, start + PER_PAGE)

  async function handleCreate(data: Product) {
    try {
      await create.mutateAsync(data)
      setShowForm(false)
    } catch (e) {
      alert('Create failed')
    }
  }

  async function handleUpdate(data: Product) {
    try {
      await update.mutateAsync({ id: data.id!, data })
      setEditing(undefined)
      setShowForm(false)
    } catch (e) {
      alert('Update failed')
    }
  }

  async function handleDelete(id?: number) {
    if (!id) return
    if (!confirm('Delete this product?')) return
    try {
      await del.mutateAsync(id)
    } catch (e) {
      alert('Delete failed')
    }
  }

  if (isLoading) return <div>Loading products…</div>
  if (error) return <div>Error loading products</div>

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Products</h2>
        <div>
          <button onClick={() => { setEditing(undefined); setShowForm(true) }}>Add Product</button>
        </div>
      </div>

      {showForm && (
        <ProductForm
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(undefined) }}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      )}

      <div className="products-grid">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} onEdit={(prod) => { setEditing(prod); setShowForm(true) }} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination current={page} total={products.length} perPage={PER_PAGE} onChange={setPage} />
    </div>
  )
}
