import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    // dataset: import.meta.env.SANITY_STUDIO_PROJECT_DATASET,
    projectId: 'qhpo1n9q',
    dataset: 'development',
  },
})
