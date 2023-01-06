const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET, PAGINATION_SIZE } = import.meta.env
const pageSize = parseInt(PAGINATION_SIZE, 10)

export const ORDERED_CHEEPS = `
  *[_type == "cheep"]{
    ...,
    status->{...},
    article[]->{
      tags[]->{...}
    },
    tags[]->{...},
    author->{
      "avatar": image.asset->url,
      ...,
      specialty->{...},
    }
  } | order(publishedAt desc) | order(pinned desc)
`
export const RSS_CHEEPS = `
  *[_type == "cheep"]{
    ...,
    status->{...},
    article[]->{
      tags[]->{...}
    },
    tags[]->{...},
    author->{
      "avatar": image.asset->url,
      ...
    }
  } | order(publishedAt desc)
`
export const SITE_CONFIG = `
  *[_type == "siteConfig"][0]{
    ...,
    character->{
      "avatar": image.asset->url,
      ...
    }
  }`
export const ALL_TAGS = `
  *[_type == "tag"]
`
export const ALL_AUTHORS = `
  *[_type == "author"]{
    ...,
    "avatar": image.asset->url,
    specialty->{...}
  }`
export const ALL_POSTS = `
  *[_type == "cheep" || _type == "article"]{
    ...,
    status->{...},
    author->{
      "avatar": image.asset->url,
      ...,
      specialty->{...},
    },
    tags[]->{...}
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

export const getAllCheeps = async () => {
  return getData(ORDERED_CHEEPS)
}

export const getAllAuthors = async () => {
  return getData(ALL_AUTHORS)
}

export const getRssCheeps = async () => {
  return getData(RSS_CHEEPS)
}

export const getSiteConfig = async () => {
  return getData(SITE_CONFIG)
}

export const getAllTags = async () => {
  return getData(ALL_TAGS)
}

export const getAllPosts = async () => {
  return getData(ALL_POSTS)
}