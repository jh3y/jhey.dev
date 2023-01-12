import { getAllData } from '../../../constants/queries.js'
import { ROUTES } from '../../../constants/routes.js'

const { POSTS_PAGINATION_SIZE, GUESTBOOK_PAGINATION_SIZE, ACTIVITY_PAGINATION_SIZE } = import.meta.env
const postsPageSize = parseInt(POSTS_PAGINATION_SIZE, 10)

export const getTagPageData = async () => {
  // Grab all the data
  const {
    authors: allAuthors,
    tags: allTags,
    posts: allCheeps,
    config: siteConfig,
  } = await getAllData()

  const dataSets = []

  allTags.map((tag) => {
    const tagName = tag.title  
    // Filter out the cheeps by tag
    const filteredCheeps = allCheeps.filter(
      (cheep) => {
        const cheepTags = cheep.tags.filter(t => t !== null)
        let tags = [...cheepTags]
        if (cheep.article) {
          for (const article of cheep.article) {
            // Add related tags from an article
            if (article.tags) {
              for (const tag of article.tags) {
                if(!tags.find(t => t._id === tag._id)) tags.push(tag)
              }
            }
          }
        }
        if (tags.find(tag => tag.title === tagName)) return true
        return false
      }
    )

    // work out if there's a specialty character, show them
    let character = siteConfig.character
    const specialtyIndex = allAuthors.findIndex(author => author?.specialty?.title === tagName )
    if (specialtyIndex !== -1)
      character = allAuthors[specialtyIndex]

    // Push dataset to collection
    dataSets.push({
      id: tagName, 
      data: filteredCheeps,
      params: {
        tag: tagName.toLowerCase()
      },
      props: {
        tagLabel: tagName,
        character,
      },
      pageSize: postsPageSize
    })
  });

  return dataSets

}

