import PageHeader from '../components/PageHeader'
import { useEffect, useMemo, useRef, useState } from 'react'
import { projectCards, projectTabs, projectsPageData } from '../data/pages/projects'

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const projectMatrixRef = useRef(null)

  // Filter the visible cards when the selected tab changes.
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') {
      return projectCards
    }

    return projectCards.filter((project) => project.category === activeTab)
  }, [activeTab])

  useEffect(() => {
    const projectMatrix = projectMatrixRef.current

    if (!projectMatrix) {
      return undefined
    }

    const cards = Array.from(projectMatrix.querySelectorAll('.project-cell'))

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
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    cards.forEach((card) => {
      card.dataset.revealed = 'false'
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <>
      {/* Projects page hero keeps the section title compact. */}
      <PageHeader
        description={projectsPageData.description}
        eyebrow={projectsPageData.eyebrow}
        slim
        title={projectsPageData.title}
      />

      <section className="section-block">
        {/* Tabs switch the grid without leaving the page. */}
        <div className="project-tabs" role="tablist" aria-label="Project categories">
          {projectTabs.map((tab) => (
            <button
              aria-pressed={activeTab === tab.key}
              className={activeTab === tab.key ? 'project-tab active' : 'project-tab'}
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* The project grid renders only the cards that match the selected tab. */}
        <div className="project-matrix" ref={projectMatrixRef}>
          {filteredProjects.map((project, index) => (
            <article className="project-cell" key={project.title} style={{ '--card-index': index }}>
              {/* Title plus GitHub link live together in the card header. */}
              <div className="project-cell-head">
                <h3>{project.title}</h3>
                <a
                  className="project-repo-link"
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`Open ${project.title} on GitHub`}
                  title="Open GitHub repo"
                >
                  <GitHubMark />
                </a>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function GitHubMark() {
  return (
    // Inline GitHub icon keeps the card self-contained.
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.66-.22.66-.49v-1.8c-2.78.61-3.36-1.39-3.36-1.39-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.88 1.54 2.32 1.1 2.88.84.09-.65.35-1.1.64-1.35-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.73 1.05A9.17 9.17 0 0 1 12 7.17c.84 0 1.69.12 2.48.35 1.9-1.32 2.73-1.05 2.73-1.05.54 1.41.2 2.45.1 2.71.63.72 1.01 1.63 1.01 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .27.16.59.67.49A10.27 10.27 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}