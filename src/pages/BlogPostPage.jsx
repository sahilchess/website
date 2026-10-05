import { blogEntries } from '../data/blogPages'
import { getMarkdownOutline, renderMarkdownToHtml } from './BlogPage'

function getCurrentSlug() {
  const [, maybeSlug] = window.location.pathname.split('/').filter(Boolean)
  return maybeSlug || null
}

function navigateBackToBlog(event) {
  event.preventDefault()
  window.history.pushState({}, '', '/blog')
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function BlogPostPage() {
  const slug = getCurrentSlug()
  const post = blogEntries.find((entry) => entry.slug === slug) ?? null

  if (!post) {
    return (
      <section className='section-block'>
        <div className='blog-article-shell'>
          <div className='blog-article-main'>
            <div className='blog-article-header'>
              <a className='back-link' href='/blog' onClick={navigateBackToBlog}>
                ← back to writing
              </a>
            </div>
            <h1 className='blog-article-title'>Post not found</h1>
            <p className='blog-article-intro'>This note does not exist in the archive yet.</p>
          </div>
        </div>
      </section>
    )
  }

  const bodyHtml = renderMarkdownToHtml(post.markdown)
  const outline = getMarkdownOutline(post.markdown)

  return (
    <section className='section-block'>
      <div className='blog-article-shell'>
        <article className='blog-article-main'>
          <div className='blog-article-header'>
            <a className='back-link' href='/blog' onClick={navigateBackToBlog}>
              ← back to writing
            </a>
            <div className='blog-article-kicker'>
              <span>{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className='blog-article-title'>{post.title}</h1>

          <div className='blog-article-body' dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </article>

        <aside className='blog-article-rail'>
          <nav className='blog-toc' aria-label='On this page'>
            <p className='blog-rail-label'>Contents</p>
            <ul>
              {outline.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.text}</a>
                  {section.children.length > 0 ? (
                    <ul>
                      {section.children.map((subsection) => (
                        <li key={subsection.id}>
                          <a href={`#${subsection.id}`}>{subsection.text}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </section>
  )
}
