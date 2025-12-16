import './Footer.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div>
          📧 Contact: <a href="mailto:support@example.com">support@example.com</a>
        </div>
        <div>© {new Date().getFullYear()} Product CRUD App. All rights reserved.</div>
      </div>
    </footer>
  )
}
