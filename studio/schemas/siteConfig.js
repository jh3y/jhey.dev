import {defineField, defineType} from 'sanity'
import {v4 as uuidv4} from 'uuid'

export default defineType({
  name: 'config',
  title: 'Site Config',
  type: 'document',
  fields: [
    defineField({
      name: 'character',
      title: 'Main Character',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      description: "Use a 3:1 aspect ratio for banner demos and remember to reduce motion",
      type: 'object',
      fields: [
        defineField({
          name: 'bannerDemo',
          title: 'Banner embedded demo',
          description: 'Point at a demo to embed',
          type: 'string',
        }),
        defineField({
          name: 'bannerAlt',
          title: 'Image alt',
          type: 'string',
        }),
      ]
    }),
  ],

  preview: {
    prepare(selection) {
      return {
        title: 'Site config [Dev]',
        media: undefined,
      }
    },
  },
})
