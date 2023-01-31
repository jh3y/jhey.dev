/**
 * Util for syncing a local cheep to the CMS
 *
 * 1. Take a src file.
 * 2. If it has an _id in the frontmatter then use it.
 * 3. Grab the posts and authors.
 * 4. If the post has an _id, try to update it.
 * 5. Else create it
 * 6. Loop through the fetched ones and make sure they're saved locally.
 * */
import {v4 as uuidv4} from 'uuid'
import * as dotenv from 'dotenv'
import fm from 'front-matter'
dotenv.config()
import fs from 'fs'
import sanityClient from '@sanity/client'

const {
  SANITY_STUDIO_PROJECT_ID: projectId,
  SANITY_STUDIO_PROJECT_DATASET: dataset,
  SANITY_STUDIO_PROJECT_TOKEN: token,
} = process.env

const cheepSrc = process.argv.slice(2)[0]

if (!cheepSrc) {
  console.info('jhey.dev: No cheep src provided')
  process.exit(1)
}

const postFile = fs.readFileSync(`${process.cwd()}/${cheepSrc}`, 'utf-8')
const frontMatter = fm(postFile)

const META_QUERY = `{
  "authors": *[_type=="author"]{...,specialty->{...}},
  "tags": *[_type=="tag"],
  "currentPosts": *[_type=="post"]{..., author->{...}, tags[]->{...}},
}`

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

const CURRENT_DATA = await client.fetch(META_QUERY)

const generateFrontMatter = (object, indent = 0) => {
  let contentString = indent === 0 ? '---\n' : ''
  let indentString = new Array(indent).fill(' ').join('').toString()
  for (const key of Object.keys(object)) {
    if (key !== 'body' && key !== 'author' && key !== 'tags') {
      if (typeof object[key] === 'object' && object[key] !== null) {
        console.info({ object, key })
        contentString += `${indentString}${key}:\n`
        contentString += `${generateFrontMatter(object[key], indent + 2)}\n`
      } else {
        contentString += `${indentString}${key}: ${object[key]}\n`
      }
    }
  }
  if (indent === 0) contentString += '---'
  return contentString
}


const updateObject = async docToUse => {
  for (let t = 0; t < docToUse.tags.length; t++) {
    const listedTag = docToUse.tags[t]
    if (typeof listedTag === 'string') {
      const EXISTING_TAG = CURRENT_DATA.tags.find(tag => tag.title === listedTag)
      if (EXISTING_TAG) {
        docToUse.tags[t] = {
          _type: 'reference',
          _ref: EXISTING_TAG._id
        }
      } else {
        // Create a tag if it doesn't exist
        const newTag = await client.create({_type: 'tag', title: listedTag })
        console.log(`${listedTag} was created, document ID is ${newTag._id}`)
        docToUse.tags[t] = {
          _type: 'reference',
          _ref: newTag._id,
        }
      }
    }
  }
  if (typeof docToUse.slug === 'string') {
    docToUse.slug = {
      _type: 'slug',
      current: docToUse.slug,
    }
  }
  // If the author is of type string, we need to grab it, else revert to main.
  // Loop over the authors, if one with the specialty exists, use it, else revert to "Main"
  if (typeof docToUse.author === 'string') {
    const AUTHOR =
      CURRENT_DATA.authors.find(author => author.specialty?.title === docToUse.author) ||
      CURRENT_DATA.authors.find(author => author.title.toLowerCase() === 'main')
    docToUse.author = {
      _type: 'reference',
      _ref: AUTHOR._id,
    }
  }
}

if (!frontMatter.attributes._id) {
  // Creating a file
  const docToCreate = {
    _type: "post",
    ...frontMatter.attributes,
    body: frontMatter.body,
  }
  // Loop over the frontmatter tags...
  // If one doesn't exist, create it and add else just add it.
  await updateObject(docToCreate)
  // Now we have the doc to create, let's sync it locally like a backup.
  let content = generateFrontMatter(docToCreate)
  content += '\n'
  content += docToCreate.body
  // fs.writeFileSync(, content)
  const res = await client.create(docToCreate, {autoGenerateArrayKeys: true})
  console.log(`"${docToCreate.title}" post was created, document ID is ${res._id}`)

  const currentContent = postFile.split('\n')
  currentContent[0] = `---\n_id: ${res._id}`
  fs.writeFileSync(`${process.cwd()}/${cheepSrc}`, currentContent.join('\n'))

} else {
  // Grab the file and update it
  const docToUpdate = { ...frontMatter.attributes }
  await updateObject(docToUpdate)
  const res = await client
    .patch(frontMatter.attributes._id) // Document ID to patch
    .set({
      ...docToUpdate,
      body: frontMatter.body
    }) // Shallow merge
    .commit({ autoGenerateArrayKeys: true})
  console.info(`Post "${res.title}" has been updated`)
}