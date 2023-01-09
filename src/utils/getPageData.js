/**
 * Idea of this file is to provide an easy way to get base data for a collection.
 * */
import { getAllCheeps, getGuestbook } from '../constants/queries.js'
import { ROUTES } from '../constants/routes.js'

const { POSTS_PAGINATION_SIZE, GUESTBOOK_PAGINATION_SIZE, ACTIVITY_PAGINATION_SIZE } = import.meta.env
const postsPageSize = parseInt(POSTS_PAGINATION_SIZE, 10)
const guestbookPageSize = parseInt(POSTS_PAGINATION_SIZE, 10)

export const getAllPageData = async () => {
  const allCheeps = await getAllCheeps()
  const allEntries = await getGuestbook()
  const page = {
    posts: {
      data: allCheeps.slice(0, postsPageSize),
      currentPage: 1,
      totalPages: Math.ceil(allCheeps.length / postsPageSize),
      route: ROUTES.posts.href,
    },
    guestbook: {
      data: allEntries.slice(0, guestbookPageSize),
      currentPage: 1,
      totalPages: Math.ceil(allEntries.length / guestbookPageSize),
      route: ROUTES.guestbook.href,
    },
  }
  return page
}

export const getGuestbookData = async () => {
  const allEntries = await getGuestbook()
  const guestbook = {
    data: allEntries.slice(0, guestbookPageSize),
    currentPage: 1,
    totalPages: Math.ceil(allEntries.length / guestbookPageSize),
    route: ROUTES.guestbook.href,
  }
  return guestbook
}

export const getPostsData = async () => {
  const allCheeps = await getAllCheeps()
  const posts = {
    data: allCheeps.slice(0, postsPageSize),
    currentPage: 1,
    totalPages: Math.ceil(allCheeps.length / postsPageSize),
    route: ROUTES.posts.href,
  }
  return posts
}