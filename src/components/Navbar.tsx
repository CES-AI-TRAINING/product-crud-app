import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="app-navbar">
      <div className="container">
        <div className="logo">
          <span>🛍️</span>
          <span>Product CRUD</span>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </div>
    </header>
  )
}
