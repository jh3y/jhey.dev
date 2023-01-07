/**
 * A little util for pushing things into Sanity CMS or syncing locally to a file
 * Run this to make sure everything is in sync.
 * 
 * 1. Run through local and push up anything that doesn't have an "_id"
 * 2. Pull everything down and make that the new file content
 * */

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

const query = '*[_type == "activity"] {...}'
const PATH = `${process.cwd()}/src/data/activity.json`
const FILE = fs.readFileSync(PATH, 'utf-8')


const CURRENT_ACTIVITY = JSON.parse(FILE)

const NEW_ACTIVITY = []

const docsToCreate = CURRENT_ACTIVITY?.activity.filter(a => !a.hasOwnProperty("_id"))
if (docsToCreate.length > 0) {
  for (const doc of docsToCreate) {
    const docToCreate = {
      ...doc,
      _type: 'activity',
    }
    const res = await client.create(docToCreate)
    console.log(`Activity was created, document ID is ${res._id}`)
    NEW_ACTIVITY.push(res)
  }
}

const FETCHED_ACTIVITY = await client.fetch(query)

for (const activity of FETCHED_ACTIVITY) {
  if (!NEW_ACTIVITY.find(f => f._id === activity._id)) {
    NEW_ACTIVITY.push(activity)
  }
}

fs.writeFileSync(PATH, JSON.stringify({
  activity: NEW_ACTIVITY
}))
console.info('Activity synced with CMS!')