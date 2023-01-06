import React from 'react'

const TabNav = ({ items }) => {
  return (
    <nav className="text-fluid--1">
      <ul className="max-w-full overflow-auto flex items-center">
        {items.map(({ active, href, label }) => {
          return (
            <li key={label} className={`flex-grow hover:bg-surface-2`}>
              <a href={href} className={`font-bold grid place-items-center w-full h-full text-text-4 block hover:no-underline focus-visible:outline-0 focus-visible:bg-surface-2`}>
                <span className={`${active ? 'border-b-brand-stroke text-text-1' : ''} p-2 px-4 border-y-4 border-transparent`}>
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default TabNav