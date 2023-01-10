import React from 'react'
import Pagination from '../pagination/pagination.jsx'
import ContentItem from './content-item.jsx'

const Content = ({ content: { data, currentPage, totalPages, route } }) => {

  return (
    <div className="px-4">
      <p className="mb-8">
        When you make a lot of content, it's hard to keep tabs on all of it.
        Here are some links to various things I create or have been involved with.
      </p>
      {data.speaking && data.speaking.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Speaking</h2>
          <p>I spoke at some events.</p>
        </section>
      )}
      
      {data.article && data.article.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Articles</h2>
          <p>I wrote some things.</p>
        </section>
      )}
      {data.post && data.post.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Latest Posts</h2>
          <p>Because you don't wanna dig through my cheeps.</p>
        </section>
      )}
      {data.appearance && data.appearance.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Appearances</h2>
          <p>I turned up at some things.</p>
        </section>
      )}
      {data.feature && data.feature.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Featured Work</h2>
          <p>My work gets shared in various newsletters, etc.</p>
        </section>
      )}
      {data.demo && data.demo.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Demos</h2>
          <p>I make a lot of demos.</p>
        </section>
      )}
      {data.video && data.video.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold text-fluid-1">Videos</h2>
          <p>I enjoy making videos too around tech content.</p>
        </section>
      )}
    </div>
  )
}

export default Content