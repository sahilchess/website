import { navItems } from '../data/pages/navigation'

// Sidebar links only show the pages meant for primary navigation.
export default function SiteNav({ currentPage }) {
  function handleNavigate(event, href) {
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <nav className="topnav" aria-label="Primary navigation">
      {navItems.map((item, index) => {
        const pageKey = item.href.replace(/^\//, '')
        const isActive = currentPage === pageKey || (pageKey === 'blog' && currentPage === 'blog-post')

        return (
          <a
            className={isActive ? 'active' : ''}
            href={item.href}
            key={item.label}
            style={{ '--nav-chars': item.label.length, '--nav-index': index }}
            onClick={(event) => handleNavigate(event, item.href)}
          >
            <span className="nav-prefix">ssh</span>
            <span className="nav-label">{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}