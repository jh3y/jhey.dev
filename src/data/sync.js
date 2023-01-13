
/**
 * A little util for pushing things into Sanity CMS or syncing locally to a file
 * Run this to make sure everything is in sync.
 * 
 * 1. Run through local and push up anything that doesn't have an "_id"
 * 2. Pull everything down and make that the new file content
 * */
import {v4 as uuidv4} from 'uuid'
import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import sanityClient from '@sanity/client'

const {
  SANITY_STUDIO_PROJECT_ID: projectId,
  SANITY_STUDIO_PROJECT_DATASET: dataset,
  SANITY_STUDIO_PROJECT_TOKEN: token,
} = process.env

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

// const CONTENT_QUERY = '*[_type == "content"] {...}'
// const CONTENT_PATH = `${process.cwd()}/src/data/content.json`

const TYPES = ['video', 'demo', 'talk', 'article', 'feature', 'appearance']

const GUESTBOOK_QUERY = '*[_type == "guestEntry"] {...}'
const GUESTBOOK_PATH = `${process.cwd()}/src/data/guestbook.json`

const sync = async (query, filePath, key, defaultProperties ) => {  
  const newData = []
  const currentFile = fs.readFileSync(filePath, 'utf-8')
  const currentData = JSON.parse(currentFile)
  console.info({ currentData })
  const docsToCreate = currentData?.[key].filter(a => !a.hasOwnProperty("_id"))
  if (docsToCreate.length > 0) {
    for (const doc of docsToCreate) {
      const docToCreate = {
        ...doc,
        _type: key,
        ...defaultProperties,
      }
      const res = await client.create(docToCreate, {autoGenerateArrayKeys: true})
      console.log(`${key} was created, document ID is ${res._id}`)
      newData.push(res)
    }
  }
  // Once new docs are created, pull down the current and sync to local
  const fetchedData = await client.fetch(query)
  for (const data of fetchedData) {
    if (!newData.find(f => f._id === data._id)) {
      newData.push(data)
    }
  }

  fs.writeFileSync(filePath, JSON.stringify({
    [key]: newData
  }, undefined, 2))
  console.info(`${key} synced with CMS!`)
}

for (const CONTENT_TYPE of TYPES) {
  console.info({ CONTENT_TYPE })
  const CONTENT_QUERY = `*[_type == "${CONTENT_TYPE}"] {...}`
  const CONTENT_PATH = `${process.cwd()}/src/data/${CONTENT_TYPE}.json`
  await sync(CONTENT_QUERY, CONTENT_PATH, CONTENT_TYPE)
}
await sync(GUESTBOOK_QUERY, GUESTBOOK_PATH, 'guestEntry', { visible: true, slug: { current: uuidv4(), type: '_slug' }})