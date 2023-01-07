import React from 'react'

const TabNav = ({ items }) => {
  return (
    <div data-tabs="true" role="navigation">
      <ul className="max-w-full overflow-auto flex items-center text-fluid--1">
        {items.map(({ active, enabled, href, label }) => {
          if (!enabled) return null
          return (
            <li key={label} className={`flex-grow hover:bg-surface-2`}>
              <a href={href} data-tab-active={active} className={`font-bold grid place-items-center w-full h-full text-text-4 block hover:no-underline focus-visible:outline-0 focus-visible:bg-surface-2`}>
                <span className={`${active ? 'border-b-brand-stroke text-text-1' : ''} p-2 px-4 border-y-4 border-transparent`}>
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TabNav