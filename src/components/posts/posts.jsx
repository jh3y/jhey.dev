import React from 'react'

import Card from '../card/card.jsx'
import Pagination from '../pagination/pagination.jsx'

const Posts = ({ posts, currentPage, totalPages, route, category }) => {
  return (
    <>
      {posts && posts.length === 0 && (
        <p
          class="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md"
        >
          {`No ${category} cheeps to show currently.`}
        </p>
      )}
      {posts && posts.length > 0 && posts.map(CHEEP => {
        return (
          <Card key={CHEEP._id} {...CHEEP} />
        )
      })}
      <Pagination current={currentPage} total={totalPages} prefix={route} />
    </>
  )
}

export default Posts