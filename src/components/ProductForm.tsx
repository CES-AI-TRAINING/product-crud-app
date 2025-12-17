import { useState, useEffect } from "react";
import type { Product } from "../types/product";

type Props = {
  initial?: Product;
  onCancel: () => void;
  onSubmit: (data: Product) => void;
};

export default function ProductForm({ initial, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");

  useEffect(() => {
    setTitle(initial?.title || "");
    setPrice(initial?.price ?? 0);
    setDescription(initial?.description || "");
    setImage(initial?.image || "");
  }, [initial]);

  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (price < 0) {
      setError("Price must be 0 or greater");
      return;
    }
    setError(null);
    onSubmit({
      id: initial?.id,
      title: title.trim(),
      price,
      description,
      image,
    });
  }

  return (
    <form className="product-form" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          required
          aria-required
          value={title}
          aria-invalid={!!error}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      {error && (
        <div role="alert" className="form-error">
          {error}
        </div>
      )}
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
