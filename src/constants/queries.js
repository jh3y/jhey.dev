const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET, PAGINATION_SIZE } = import.meta.env
const pageSize = parseInt(PAGINATION_SIZE, 10)

export const ORDERED_CHEEPS = `
  *[_type == "cheep"]{
    ...,
    status->{...},
    post[]->{
      tags[]->{...}
    },
    tags[]->{...},
    author->{
      "avatar": image,
      ...,
      specialty->{...},
    }
  } | order(publishedAt desc) | order(pinned desc)
`
export const RSS_CHEEPS = `
  *[_type == "cheep"]{
    ...,
    status->{...},
    post[]->{
      tags[]->{...}
    },
    tags[]->{...},
    author->{
      "avatar": image,
      ...
    }
  } | order(publishedAt desc)
`
export const SITE_CONFIG = `
  *[_type == "siteConfig"][0]{
    ...,
    character->{
      "avatar": image,
      ...
    }
  }`
export const ALL_TAGS = `
  *[_type == "tag"]
`

export const ALL_GUESTBOOK_ENTRIES = `
  *[_type == "guestEntry"] | order((when || _createdAt) desc) | order(pinned desc)
`
export const ALL_CONTENT = `
  *[_type == "content"] | order((when || _createdAt) desc) | order(feature desc)
`
export const ALL_POSTS = `
  *[_type == "post"] | order(publishedAt desc)
`
export const ALL_AUTHORS = `
  *[_type == "author"]{
    ...,
    "avatar": image.asset->url,
    specialty->{...}
  }`
export const ALL_SITE_POSTS = `
  *[_type == "cheep" || _type == "post" || _type == "guestEntry"]{
    ...,
    status->{...},
    author->{
      "avatar": image,
      ...,
      specialty->{...},
    },
    tags[]->{...}
  }
`
export const ALL_WRITING = `
  {
    "writing": *[_type == "post" || _type == "article"] {...} | order((publishedAt || when) desc)
  }
`

export const ALL_PAGE_DATA = `
  {
    "authors": ${ALL_AUTHORS},
    "tags": ${ALL_TAGS},
    "config": ${SITE_CONFIG},
    "cheeps": ${ORDERED_CHEEPS},
    "guestbook": ${ALL_GUESTBOOK_ENTRIES},
    "posts": ${ALL_POSTS},
    "content": ${ALL_CONTENT},
  }
`

export const RSS_FEED = `
  {
    "posts": ${RSS_CHEEPS},
    "writing": ${ALL_WRITING}, 
    "tags": ${ALL_TAGS},
    "config": ${SITE_CONFIG},
  }
`

export const getQueryUrl = query => {
  const queryString = encodeURIComponent(query)
  return `https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_STUDIO_PROJECT_DATASET}?query=${queryString}`
}

export const getData = async query => {
  const QUERY_URL = getQueryUrl(query)
  const DATA = await (await (await fetch(QUERY_URL)).json()).result
  return DATA
}

export const getRssData = async () => {
  return getData(RSS_FEED)
}

export const getAllArticles = async () => {
  return getData(ALL_POSTS)
}

export const getAllCheeps = async () => {
  return getData(ORDERED_CHEEPS)
}

export const getAllAuthors = async () => {
  return getData(ALL_AUTHORS)
}

export const getGuestbook = async () => {
  return getData(ALL_GUESTBOOK_ENTRIES)
}

export const getContent = async () => {
  return getData(ALL_CONTENT)
}

export const getWriting = async () => {
  return getData(ALL_WRITING)
}

export const getRssCheeps = async () => {
  return getData(RSS_CHEEPS)
}

export const getSiteConfig = async () => {
  return getData(SITE_CONFIG)
}

export const getTags = async () => {
  return getData(ALL_TAGS)
}

export const getSitePosts = async () => {
  return getData(ALL_SITE_POSTS)
}

export const getAllData = async () => {
  return getData(ALL_PAGE_DATA)
}