import React from 'react'
import Pagination from '../pagination/pagination.jsx'
import ContentItem from './content-item.jsx'
import ContentBlock from '../content-block/content-block.jsx'

const LIMITS = {
  speaking: 10,
  article: 4,
  post: 4,
  appearance: 10,
  feature: 6,
  demo: 4,
  video: 5,
}

const speakingIntro = `
  Howdy. I do some speaking. Want me to speak at your event? [Hit me up!](mailto:speaking@jhey.dev)
`
const articlesIntro = `
  It's been an honor to write for some of my favorite publications such as CSS Tricks, Smashing Magazine, and web.dev.
`
const postsIntro = `
  Don't wanna dig through the feed? Here's my latest full-length posts.
`
const appearanceIntro = `
  It's been an honor to write for some of my favorite publications such as CSS Tricks, Smashing Magazine, and web.dev.
`
const featuredIntro = `
  I'm thankful that people share my work around some times.
`
const demoIntro = `
  I've made a lot of demos...
`
const videoIntro = `
  I've made some videos
`

const INTROS = {
  speaking: speakingIntro,
}

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
})

const sections = [
  {
    active: true,
    key: 'post',
    title: 'Latest Posts',
    intro: postsIntro,
  },
  {
    active: true,
    key: 'article',
    title: 'Published Articles',
    intro: articlesIntro,
  },
  {
    active: true,
    key: 'speaking',
    title: 'Speaking',
    intro: speakingIntro,
  },
  {
    active: true,
    key: 'appearance',
    title: 'Appearances',
    intro: appearanceIntro,
  },
  {
    active: true,
    key: 'feature',
    title: 'Featured Work',
    intro: featuredIntro,
  },
  {
    active: true,
    key: 'demo',
    title: 'Demos',
    intro: demoIntro,
  },
  {
    active: false,
    key: 'video',
    title: 'Videos',
    intro: videoIntro,
  },
]

const getShortDate = (stamp) => shortDateFormatter.format(new Date(stamp))

const ContentSection = ({ data, title, intro, supplementKey }) => {
  return (
    <section className="mb-8">
      <h2 className="font-bold mb-2 text-fluid-1">{title}</h2>
      <ContentBlock>{intro}</ContentBlock>
      <ul>
        {data.map((item) => {
          return (
            <li key={item._id} className="mb-2">
              <a href={item.links[0].link} className="leading-tight">
                {item.title}
              </a>
              <p className="text-fluid--2 text-text-4">
                {item.where &&
                  `${item.where.toUpperCase()} – ${getShortDate(item.when)}`}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const Content = ({ content: { data, currentPage, totalPages, route } }) => {
  let internalPosts = []

  if (data.post) {
    internalPosts = JSON.parse(JSON.stringify(data?.post)).map((post) => ({
      ...post,
      links: [{ link: `/post/${post.slug.current}` }],
      where: 'jhey.dev',
      when: post.publishedAt,
    }))
  }

  data.post = internalPosts

  return (
    <div className="px-4">
      <p className="mb-8">
        When you make a lot of content, it's hard to keep tabs on all of it.
        Here are some links to various things I create or have been involved
        with.
      </p>
      {sections.map(section => {
        if (!section.active) return null
        return (
          <ContentSection
            key={section.title}
            data={data[section.key]}
            title={section.title}
            intro={section.intro}
          />
        )
      })}
    </div>
  )
}

export default Content