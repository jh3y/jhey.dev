import React from 'react'
import Pagination from '../pagination/pagination.jsx'
import ContentItem from './content-item.jsx'
import ContentBlock from '../content-block/content-block.jsx'

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
})

const getShortDate = (stamp) => shortDateFormatter.format(new Date(stamp))

const ContentSection = ({ data, title, intro, limit, supplementKey }) => {
  if (!data || data.filter(d => d).length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="font-bold mb-2 text-fluid-1">{title}</h2>
      <ContentBlock>{intro}</ContentBlock>
      <ul>
        {data.map((item) => {
          if (!item || !item.links) return null
          return (
            <li key={item._id} className="mb-2">
              <a href={item?.links[0].url} className="leading-tight">
                {item.title}
              </a>
              <p className="text-fluid--2 text-text-4">
                {item.where &&
                  item.when &&
                  `${item.where.toUpperCase()} – ${getShortDate(item.when)}`}
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
      <p className="mb-8">
        When you make a lot of content, it's hard to keep tabs on all of it.
        Here are some links to various things I create or have been involved
        with.
      </p>
      {SECTIONS.map((key) => {
        const section = data[key]
        if (!section || !section.active) return null
        
        let sectionData = section.selection
        if (key === 'posts') {
          const internalPosts = JSON.parse(JSON.stringify(section.data)).map((post) => ({
            ...post,
            links: [{ url: `/cheep/${post.slug.current}` }],
            where: 'jhey.dev',
            when: post.publishedAt,
          }))
          section.selection = internalPosts
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