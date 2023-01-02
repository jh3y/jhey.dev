import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  initialValue: () => ({
    verified: false,
  }),
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'reference',
      to: {type: 'tag'},
    }),
    defineField({
      name: 'verified',
      title: 'Verified',
      type: 'boolean',
      description: 'Whether poster is verified',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'markdown'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
