import PageHeader from '../components/PageHeader'
import { findMePageData } from '../data/pages/findMe'

export default function FindMePage() {
  return (
    <>
      {/* Find-me page replaces the older contact page name. */}
      <PageHeader
        description={findMePageData.description}
        eyebrow={findMePageData.eyebrow}
        slim
        title={findMePageData.title}
      />

      <section className="section-block">
        <article className="panel contact-panel">
          <p>{findMePageData.introduction}</p>
          <div className="hero-actions">
            {findMePageData.links.map((link) => (
              <a
                className={`button button-${link.variant}`}
                href={link.href}
                key={link.label}
                rel={link.external ? 'noreferrer' : undefined}
                target={link.external ? '_blank' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}
