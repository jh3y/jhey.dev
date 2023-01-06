import React from 'react'

const TabNav = ({ items }) => {
  return (
    <nav className="grid place-items-center text-fluid--1">
      <ul className="max-w-full overflow-auto flex items-center mx-auto">
        {items.map(({ active, href, label }) => {
          return (
            <li key={label} className={`${active ? 'border-b-brand-stroke' : ''} border-y-4 border-transparent hover:bg-surface-4`}>
              <a href={href} className={`font-bold text-text-1 p-2 px-4 block hover:no-underline`}>{label}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default TabNav