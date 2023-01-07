import About from '../components/about/about.jsx'
import Posts from '../components/posts/posts.jsx'
import Activity from '../components/activity/activity.jsx'

export const POSTS = 'posts'
export const ABOUT = 'about'
export const TESIMONIALS = 'testimonials'
export const ACTIVITY = 'activity'

export const ROUTES = {
  posts: {
    href: '/posts',
    label: 'Feed',
    enabled: true,
    renderer: Posts,
  },
  about: {
    href: '/about',
    label: 'About',
    enabled: true,
    renderer: About
  },
  activity: {
    href: '/activity',
    label: 'Activity',
    enabled: false,
    renderer: Activity,
  },
  testimonials: {
    href: '/testimonials',
    label: 'Testimonials',
    enabled: false,
  }
}

export const getRoutes = key => {
  return Object.keys(ROUTES).reduce((acc, cur) => {
    acc.push({
      ...ROUTES[cur],
      active: (cur === POSTS && !key) || key === cur
    })
    return acc
  }, [])
}