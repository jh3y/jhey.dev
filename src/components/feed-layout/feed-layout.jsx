import React from 'react'

import LayoutHeader from '../header/header.jsx'
import Card from '../card/card.jsx'
import Pagination from '../pagination/pagination.jsx'

const FeedLayout = ({ character, posts, category = '', currentPage, totalPages, route = "/posts" }) => {
  return (
    <>
      <LayoutHeader character={character} />
      <main className="w-main-content max-w-full mv-0 mx-auto grid justify-center pt-8 gap-8">
        {posts.length === 0 && (
          <p
            className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md"
          >
            {`No ${category} cheeps to show currently.`}
          </p>
        )}
        {posts.length > 0 && posts.map(CHEEP => {
          return (
            <Card key={CHEEP._id} {...CHEEP} />
          )
        })}
        <Pagination current={currentPage} total={totalPages} prefix={route} />
      </main>
    </>
  )
}

export default FeedLayout