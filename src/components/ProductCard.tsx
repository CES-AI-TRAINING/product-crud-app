import type { Product } from '../types/product'

type Props = {
  product: Product
  onEdit: (p: Product) => void
  onDelete: (id?: number) => void
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="info">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="desc">{product.description}</p>
        <div className="actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
