import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import {deskStructure} from './deskStructure'
import {markdownSchema} from 'sanity-plugin-markdown'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  basePath: '/studio',
  title: import.meta.env.SANITY_STUDIO_PROJECT_NAME,

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_PROJECT_DATASET,

  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool(),
    media(),
    markdownSchema(),
  ],
  schema: {
    types: schemaTypes,
  },
})
