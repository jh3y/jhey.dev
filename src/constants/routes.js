import About from '../components/about/about.jsx'
import Cheeps from '../components/cheeps/cheeps.jsx'
import Content from '../components/content/content.jsx'
import Guestbook from '../components/guestbook/guestbook.astro'

export const GUESTBOOK_SUCCESS_PATH = 'thanks'

export const ROUTES = {
  cheeps: {
    href: '/cheeps',
    label: 'Feed',
    enabled: true,
    render: true,
    renderer: Cheeps,
  },
  about: {
    href: '/about',
    label: 'About',
    enabled: true,
    render: true,
    renderer: About
  },
  content: {
    href: '/content',
    label: 'Content',
    enabled: true,
    render: true,
    renderer: Content,
  },
  guestbook: {
    href: '/guestbook',
    label: 'Guestbook',
    enabled: true,
    render: true,
    renderer: Guestbook,
  }
}

export const getRoutes = key => {
  const newRoutes = Object.keys(ROUTES).reduce((acc, cur) => {
    acc.push({
      ...ROUTES[cur],
      active: (!key && cur === ROUTES.cheeps.href.slice(1)) || key.indexOf(cur) !== -1
    })
    return acc
  }, [])
  return newRoutes
}