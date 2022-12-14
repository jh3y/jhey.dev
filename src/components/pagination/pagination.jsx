import React from 'react'

const Pagination = ({ current, total, prefix = '/posts', splice = 5 }) => {
  if (total <= 1 || !current || !total) return null
  return (
    <nav aria-labelledby="pagination-header" className="mt-8">
      <h2 className="sr-only" id={`pagination-header-${prefix.slice(1)}`}>
        Pagination links
      </h2>
      <ul className="flex items-center justify-center gap-x-2">
        <li>
          {current > 1 && (
            <a
              title="Previous page"
              href={`${prefix}/${current - 1}`}
              className="w-10 h-10 grid place-items-center rounded-md hover:bg-surface-4"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
          {current === 1 && (
            <span className="text-text-4 opacity-20 w-10 h-10 grid place-items-center rounded-md">
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </li>
        <li>
          <span
            className="grid place-items-center">
            {`${current} / ${total}`} 
          </span>
        </li>
        {/* If splice and splice < total then show ... */}
        <li>
          {current < total && (
            <a
              title="Next page"
              href={`${prefix}/${current + 1}`}
              className="w-10 h-10 grid place-items-center rounded-md hover:bg-surface-4"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
          {current === total && (
            <span className="text-text-4 opacity-20 w-10 h-10 grid place-items-center rounded-md">
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination