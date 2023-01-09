import React from 'react'
import GuestCard from '../guest-card/guest-card.jsx'
import Pagination from '../pagination/pagination.jsx'

const Guestbook = ({ guestbook: { data, currentPage, totalPages, route } }) => {
  
  return (
    <div className="grid gap-4">
      {data && data.length === 0 && (
        <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
          {`No guestbook entries to show currently.`}
        </p>
      )}
      {data &&
        data.length > 0 &&
        data.map((entry) => {
          return <GuestCard key={entry._id} {...entry} />
        })}
      {currentPage && totalPages && route && (
        <Pagination
          current={currentPage}
          total={totalPages}
          prefix={route}
        />
      )}
    </div>
  )
}

export default Guestbook