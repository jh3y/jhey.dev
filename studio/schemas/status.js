import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'status',
  title: 'Status',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare(value) {
      const {title, icon} = value
      return {
        title: `${icon} ${title}`,
      }
    },
  },
})
