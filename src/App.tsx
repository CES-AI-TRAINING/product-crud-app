import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductsPage from './pages/ProductsPage'

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Product CRUD App</h1>
      <p>
        Use the navigation to view and manage products powered by the Fake Store API.
      </p>
      <p>
        <Link to="/products">Go to Products</Link>
      </p>
    </div>
  )
}

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
