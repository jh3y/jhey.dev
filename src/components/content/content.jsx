import React from 'react'
import ContentBlock from '../content-block/content-block.jsx'

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
})

const getShortDate = (stamp) => shortDateFormatter.format(new Date(stamp))

const ContentSection = ({ data, title, intro }) => {
  if (!data || data.filter(d => d).length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="font-bold mb-2 text-fluid-1">{title}</h2>
      <ContentBlock>{intro}</ContentBlock>
      <ul>
        {data.map((item) => {
          if (!item || !item.link) return null
          return (
            <li key={item._id} className="mb-2">
              <a href={item.link} className="leading-tight">
                {item.title}
              </a>
              <p className="text-fluid--2 text-text-4">
                {
                  `
                    ${item.where ? item.where.toUpperCase() : ''}
                    ${item.where && item.when ? ' - ' : ''}
                    ${item.when ? getShortDate(item.when) : ''}
                  `
                }
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const SECTIONS = [
  'posts',
  'articles',
  'talks',
  'appearances',
  'features',
  'demos',
  'videos',
]
const Content = ({ content: { data, currentPage, totalPages, route } }) => {

  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <a href="/content" className="text-fluid--2 font-bold">permalink</a>
      </div>
      <p className="mb-8">
        When you make a lot of content, it's hard to keep tabs on all of it.
        Here are some links to various things I create or have been involved
        with.
      </p>
      {SECTIONS.map((key) => {
        const section = data[key]
        if (!section || !section.active) return null

        if (key === 'posts') {
          const internalPosts = JSON.parse(JSON.stringify(section.data)).map((post) => ({
            ...post,
            link: `/cheep/${post.slug.current}`,
            where: 'jhey.dev',
            when: post.publishedAt,
          }))
          section.selection = internalPosts.filter(p => p.draft !== true).slice(0, 10)
        }

        return (
          <ContentSection
            key={section.heading}
            data={section.selection}
            title={section.heading}
            intro={section.intro}
          />
        )
      })}
    </div>
  )
}

export default Content