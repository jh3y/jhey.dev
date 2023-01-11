import React from 'react'

import Card from '../card/card.jsx'
import Pagination from '../pagination/pagination.jsx'

const Posts = ({
  posts: {
    data,
    currentPage,
    totalPages,
    route,
    category,
  },
}) => {
  return (
    <div className="grid gap-4">
      {data && data.length === 0 && (
        <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
          {`No ${category || ''} cheeps to show currently.`}
        </p>
      )}
      {data &&
        data.length > 0 &&
        data.map((CHEEP) => {
          return <Card key={CHEEP._id} {...CHEEP} />
        })}
      {currentPage !== 0 && totalPages !== 0 && route && (
        <Pagination
          current={currentPage}
          total={totalPages}
          prefix={route}
        />
      )}
    </div>
  )
}

export default Posts