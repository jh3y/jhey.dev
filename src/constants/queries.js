const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET, PAGINATION_SIZE } = import.meta.env
const pageSize = parseInt(PAGINATION_SIZE, 10)

export const ORDERED_CHEEPS = '*[_type == "cheep"]{..., status->{...}, article[]->{tags[]->{...}}, tags[]->{...},author->{"avatar": image.asset->url, ...}} | order(publishedAt desc) | order(pinned desc)'
export const SITE_CONFIG = '*[_type == "config"]{...,character->{"avatar": image.asset->url, ...}}'
export const ALL_TAGS = '*[_type == "tag"]'
export const ALL_POSTS = '*[_type == "cheep"||_type == "article"]{..., status->{...}, author->{"avatar": image.asset->url, ...}, tags[]->{...}}'

export const getQueryUrl = query => {
  const queryString = encodeURIComponent(query)
  return `https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_STUDIO_PROJECT_DATASET}?query=${queryString}`
}

export const getAllCheeps = async () => {
  const CHEEP_URL = getQueryUrl(ORDERED_CHEEPS)
  const allCheeps = await (await (await fetch(CHEEP_URL)).json()).result
  return allCheeps
}

export const getSiteConfig = async () => {
  const CONFIG_URL = getQueryUrl(SITE_CONFIG)
  const config = await (await (await fetch(CONFIG_URL)).json()).result
  return config
}

export const getAllTags = async () => {
  const TAG_URL = getQueryUrl(ALL_TAGS)
  const tags = await (await (await fetch(TAG_URL)).json()).result
  return tags
}

export const getAllPosts = async () => {
  const POSTS_URL = getQueryUrl(ALL_POSTS)
  const posts = await (await (await fetch(POSTS_URL)).json()).result
  return posts
}