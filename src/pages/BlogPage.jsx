/*
  Blog post template for future entries:

  {
    title: 'Post title',
    category: 'process',
    date: 'Oct 4, 2026',
    readTime: '4 min read',
    excerpt: 'A short summary shown on the blog cards.',
    markdown: `# Post title

## Intro

Write the opening paragraph here.

- first idea
- second idea
- third idea

> Add a quote or key insight here.

## Main section

This is where the main writing goes.

### Subheading

Use subheadings to keep things readable.

## Closing thought

End with the main takeaway.
`,
  }

  Markdown format is intentionally simple: headings, paragraphs, lists, and blockquotes.
*/

import PageHeader from '../components/PageHeader'
import { useEffect, useMemo, useRef, useState } from 'react'
import { blogCategories, blogEntries, blogPageData } from '../data/blogPages'

export function navigateToPost(post) {
  const nextPath = `/blog/${post.slug}`
  window.history.pushState({}, '', nextPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function renderMarkdownToHtml(markdown) {
  const lines = markdown.split('\n')
  const htmlParts = []
  const headingIds = new Map()
  let paragraph = []
  let listItems = []
  let blockquote = []

  function getHeadingId(text) {
    const baseId = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const occurrence = headingIds.get(baseId) ?? 0
    headingIds.set(baseId, occurrence + 1)
    return occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`
  }

  function flushParagraph() {
    if (paragraph.length > 0) {
      htmlParts.push(`<p>${paragraph.join(' ')}</p>`)
      paragraph = []
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      htmlParts.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join('')}</ul>`)
      listItems = []
    }
  }

  function flushQuote() {
    if (blockquote.length > 0) {
      htmlParts.push(`<blockquote>${blockquote.join(' ')}</blockquote>`)
      blockquote = []
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      flushQuote()
      return
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph()
      flushList()
      flushQuote()
      return
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph()
      flushList()
      flushQuote()
      const text = trimmed.replace(/^##\s*/, '')
      htmlParts.push(`<h2 id="${getHeadingId(text)}">${text}</h2>`)
      return
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph()
      flushList()
      flushQuote()
      const text = trimmed.replace(/^###\s*/, '')
      htmlParts.push(`<h3 id="${getHeadingId(text)}">${text}</h3>`)
      return
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph()
      flushQuote()
      listItems.push(trimmed.replace(/^-\s*/, ''))
      return
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph()
      flushList()
      blockquote.push(trimmed.replace(/^>\s*/, ''))
      return
    }

    paragraph.push(trimmed)
  })

  flushParagraph()
  flushList()
  flushQuote()

  return htmlParts.join('')
}

export function getMarkdownOutline(markdown) {
  const outline = []
  const headingIds = new Map()

  markdown.split('\n').forEach((line) => {
    const trimmed = line.trim()
    const level = trimmed.startsWith('## ') ? 2 : trimmed.startsWith('### ') ? 3 : 0

    if (!level) {
      return
    }

    const text = trimmed.replace(/^#{2,3}\s*/, '')
    const baseId = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const occurrence = headingIds.get(baseId) ?? 0
    headingIds.set(baseId, occurrence + 1)
    const heading = {
      id: occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`,
      text,
    }

    if (level === 2) {
      outline.push({ ...heading, children: [] })
    } else if (outline.length > 0) {
      outline[outline.length - 1].children.push(heading)
    }
  })

  return outline
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedPost, setExpandedPost] = useState(null)
  const blogGridRef = useRef(null)

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'all') {
      return blogEntries
    }

    return blogEntries.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    const blogGrid = blogGridRef.current

    if (!blogGrid) {
      return undefined
    }

    const cards = Array.from(blogGrid.querySelectorAll('.blog-card'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => {
        card.dataset.revealed = 'true'
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = 'true'
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    cards.forEach((card) => {
      card.dataset.revealed = 'false'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [visiblePosts])

  return (
    <>
      <PageHeader
        description={blogPageData.description}
        slim
        title={blogPageData.title}
      />

      <section className='section-block'>
        <div className='blog-tabs' role='tablist' aria-label='Blog categories'>
          {blogCategories.map((tab) => (
            <button
              aria-pressed={activeCategory === tab.key}
              className={activeCategory === tab.key ? 'project-tab active' : 'project-tab'}
              key={tab.key}
              type='button'
              onClick={() => setActiveCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className='blog-grid' ref={blogGridRef}>
          {visiblePosts.map((post, index) => {
            const isExpanded = expandedPost === post.title

            return (
              <article className='blog-card' key={post.title} style={{ '--card-index': index }}>
                <div className='blog-card-topline'>
                  <span className='blog-tag'>{post.category}</span>
                  <span className='blog-meta'>{post.date}</span>
                </div>

                <h3>{post.title}</h3>
                <p className='blog-excerpt'>{isExpanded ? post.detail : post.excerpt}</p>

                <div className='blog-card-footer'>
                  <span className='blog-meta'>{post.readTime}</span>
                  <button
                    className='blog-link-button'
                    type='button'
                    onClick={() => navigateToPost(post)}
                  >
                    Read more
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
