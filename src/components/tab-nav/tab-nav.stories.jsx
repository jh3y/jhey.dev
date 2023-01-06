import React from 'react'

import TabNav from './tab-nav.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Tab Nav',
  component: TabNav,
}

const items = [
  {
    label: 'Feed',
    href: '/'
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Timeline',
    href: '/timeline',
  },
  {
    label: 'Activity',
    href: '/activity',
  },
  {
    label: 'JavaScript',
    href: '/javascript',
  },
  {
    label: 'CSS',
    href: '/css',
  },
  {
    label: 'Testimonials',
    href: '/testimonials',
  },
  {
    label: 'Guestbook',
    href: '/guestbook',
  }
]

export const Default = () => <TabNav items={items.slice(0, 5)} />

const activeItems = JSON.parse(JSON.stringify(items))
activeItems[1].active = true

export const Active = () => <TabNav items={activeItems.slice(0, 4)} />

const lotsOfItems = JSON.parse(JSON.stringify(items))
lotsOfItems[4].active = true

export const LotsOfItems = () => <TabNav items={lotsOfItems} />
