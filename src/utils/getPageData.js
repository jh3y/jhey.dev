/**
 * Idea of this file is to provide an easy way to get base data for a collection.
 * */
import {
  getAllArticles,
  getAllCheeps,
  getGuestbook,
  getContent,
  getAllData,
} from '../constants/queries.js'
import { ROUTES } from '../constants/routes.js'

const { POSTS_PAGINATION_SIZE, GUESTBOOK_PAGINATION_SIZE } = import.meta.env
const postsPageSize = parseInt(POSTS_PAGINATION_SIZE, 10)
const guestbookPageSize = parseInt(GUESTBOOK_PAGINATION_SIZE, 10)

const sortContent = (data) => {
  const newData = {}
  for (const entry of data) {
    if (!newData[entry.category]) newData[entry.category] = []
    newData[entry.category].push(entry)
  }
  return newData
}

export const getAllPageData = async () => {
  const allData = await getAllData()
  const { appearances, articles, talks, features, posts, demos, videos } =
    allData.content[0]

  const page = {
    config: allData.config,
    cheeps: {
      data: allData.cheeps.slice(0, postsPageSize),
      currentPage: 1,
      totalPages: Math.ceil(allData.cheeps.length / postsPageSize),
      route: ROUTES.cheeps.href,
    },
    guestbook: {
      data: allData.guestbook.slice(0, guestbookPageSize),
      currentPage: 1,
      totalPages: Math.ceil(allData.guestbook.length / guestbookPageSize),
      route: ROUTES.guestbook.href,
    },
    // Gotta sort this block out for sure...
    content: {
      // data: sortContent([...allData.content, ...allData.posts.map(a => ({...a, category: 'post'}))]),
      data: {
        appearances: appearances || {},
        articles: articles || {},
        talks: talks || {},
        videos: videos || {},
        demos: demos || {},
        features: features || {},
        talks: talks || {},
        posts: { ...posts, data: allData.posts } || {},
      },
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

export const getContentData = async () => {
  const allContent = await getContent()
  const allArticles = await getAllArticles()
  const content = {
    data: sortContent([
      ...allContent,
      ...allArticles.map((a) => ({ ...a, category: 'post' })),
    ]),
  }
  return content
}

export const getPostsData = async () => {
  const allCheeps = await getAllCheeps()
  const cheeps = {
    data: allCheeps.slice(0, postsPageSize),
    currentPage: 1,
    totalPages: Math.ceil(allCheeps.length / postsPageSize),
    route: ROUTES.cheeps.href,
  }
  return cheeps
}