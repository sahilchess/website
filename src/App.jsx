import { useEffect, useState } from 'react'
import SiteNav from './components/SiteNav'
import { pageTitles } from './data/pages/metadata'
import {
  AboutPage,
  HomePage,
  NotFoundPage,
  ProjectsPage,
  FindMePage,
  BlogPage,
  BlogPostPage,
} from './pages'

// Keep the about route available even though it is hidden from the sidebar.
const pageMap = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  'find-me': FindMePage,
  blog: BlogPage,
  'blog-post': BlogPostPage,
}

function getPageFromPath() {
  const [first, second] = window.location.pathname.split('/').filter(Boolean)

  if (first === 'blog' && second) {
    return 'blog-post'
  }

  return first || 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath())

  useEffect(() => {
    // Update the rendered page whenever the browser history changes.
    function handleRouteChange() {
      setCurrentPage(getPageFromPath())
    }

    window.addEventListener('popstate', handleRouteChange)

    // Default to the home route if the app loads at the site root.
    if (window.location.pathname === '/') {
      window.history.replaceState({}, '', '/home')
      setCurrentPage('home')
    } else {
      setCurrentPage(getPageFromPath())
    }

    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  useEffect(() => {
    document.title = pageTitles[currentPage] ?? 'Home | Sahil Dasari'
  }, [currentPage])

  const Page = pageMap[currentPage] ?? NotFoundPage

  return (
    <main className="app-shell">
      {/* Shared sidebar and brand mark stay mounted across all routes. */}
      <SiteNav currentPage={currentPage} />
      {/* The centered content area changes per page but shares the same shell. */}
      <div className="site-frame">
        <Page />
      </div>
      {/* The Latin footer sits in the same bottom-aligned spot on every page. */}
      <footer className="site-footer">
        <p className="site-footer-quote">Aut viam inveniam aut faciam</p>
      </footer>
    </main>
  )
}