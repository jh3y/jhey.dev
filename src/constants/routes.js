const ROUTES = {
  posts: {
    label: 'Feed',
    href: '/',
    enabled: true,
  },
  about: {
    label: 'About',
    href: '/about',
    enabled: true,
  },
  activity: {
    label: 'Activity',
    href: '/activity',
    enabled: false,
  },
  testimonials: {
    label: 'Testimonials',
    href: '/testimonials',
    enabled: false,
  }
}

export const POSTS = 'posts'
export const ABOUT = 'about'

export const getRoutes = key => {
  return Object.keys(ROUTES).reduce((acc, cur) => {
    acc.push({
      ...ROUTES[cur],
      active: (cur === POSTS && !key) || key === cur
    })
    return acc
  }, [])
}