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
    })
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
