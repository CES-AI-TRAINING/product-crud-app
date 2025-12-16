type Props = {
  current: number
  total: number
  perPage: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, perPage, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / perPage))
  const arr = Array.from({ length: pages }).map((_, i) => i + 1)
  return (
    <div className="pagination">
      {arr.map((p) => (
        <button
          key={p}
          className={p === current ? 'active' : ''}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
