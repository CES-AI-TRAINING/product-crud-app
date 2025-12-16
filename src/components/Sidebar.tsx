import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <ul>
        <li>
          <div>📦 Manage Products</div>
        </li>
        <li>
          <div>📂 Categories</div>
        </li>
        <li>
          <div>🛒 Orders</div>
        </li>
        <li>
          <div>📊 Analytics</div>
        </li>
        <li>
          <div>⚙️ Settings</div>
        </li>
      </ul>
    </aside>
  )
}
