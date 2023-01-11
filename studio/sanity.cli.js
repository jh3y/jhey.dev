import dotenv from 'dotenv'
dotenv.config()
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_PROJECT_DATASET,
  },
  project: {
    basePath: '/studio',
  },
})
