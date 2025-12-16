import { useState, useEffect } from 'react'
import type { Product } from '../types/product'

type Props = {
  initial?: Product
  onCancel: () => void
  onSubmit: (data: Product) => void
}

export default function ProductForm({ initial, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title || '')
  const [price, setPrice] = useState(initial?.price ?? 0)
  const [description, setDescription] = useState(initial?.description || '')
  const [image, setImage] = useState(initial?.image || '')

  useEffect(() => {
    setTitle(initial?.title || '')
    setPrice(initial?.price ?? 0)
    setDescription(initial?.description || '')
    setImage(initial?.image || '')
  }, [initial])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title) return
    onSubmit({ id: initial?.id, title, price, description, image })
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
