import PageHeader from '../components/PageHeader'
import { notFoundPageData } from '../data/pages/notFound'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        description={notFoundPageData.description}
        eyebrow={notFoundPageData.eyebrow}
        slim
        title={notFoundPageData.title}
      />

      <section className="section-block">
        <article className="panel spotlight-panel text-center-panel">
          <h3>{notFoundPageData.heading}</h3>
          <p>{notFoundPageData.message}</p>
        </article>
      </section>
    </>
  )
}