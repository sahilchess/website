import PageHeader from '../components/PageHeader'
import { aboutPageData } from '../data/pages/about'

function renderAboutBlock(block, index) {
  if (block.type === 'paragraph') {
    return <p key={index}>{block.text}</p>
  }

  if (block.type === 'subheading') {
    return <h4 key={index}>{block.text}</h4>
  }

  if (block.type === 'badges') {
    return (
      <ul className='tag-list' key={index}>
        {block.items.map((language) => (
          <li className='language-badge' key={language.label}>
            <span className='language-signature'>{language.signature}</span>
            <span className='language-name'>{language.label}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'list') {
    return (
      <ul className={block.className} key={index}>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }

  return null
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        description={aboutPageData.description}
        eyebrow={aboutPageData.eyebrow}
        slim
        title={aboutPageData.title}
      />

      <section className="section-block">
        <div className="panel-grid about-grid">
          {aboutPageData.sections.map((section) => (
            <article className='panel' key={section.title}>
              <h3>{section.title}</h3>
              {section.blocks.map(renderAboutBlock)}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}