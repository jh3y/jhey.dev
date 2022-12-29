import React from 'react'

const Pagination = ({ current, total }) => {
  if (total <= 1) return null
  return (
    <nav>Howdy!</nav>
  )
}

export default Pagination