import {defineField, defineType} from 'sanity'
import {v4 as uuidv4} from 'uuid'

export default defineType({
  name: 'cheep',
  title: 'Cheep',
  type: 'document',
  initialValue: () => ({
    pinned: false,
    slug: {
      _type: 'slug',
      current: uuidv4(),
    },
  }),
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pinned',
      title: 'Pinned',
      description: 'Whether the post is pinned in the feed',
      type: 'boolean',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'reference',
      to:{type: 'status'},
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of:[{type: 'reference', to: { type: 'tag' }}],
    }),
    defineField({
      name: 'og',
      title: 'Open Graph',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'hue',
          title: 'Hue',
          type: 'string',
        }),
        defineField({
          name: 'gradient',
          title: 'Gradient',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'cheep',
      title: 'Cheep',
      description: 'This is the "cheep"!',
      type: 'markdown',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'article',
      title: 'Related Article',
      type: 'array',
      of: [{type: 'reference', to: {type: 'article'}}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'author.image',
      date: 'publishedAt'
    },
    prepare(value) {
      const {title, author, date} = value
      return {
        ...value,
        subtitle: author && `by ${author.split(' ')[0]} - ${date}`
      }
    },
  },
})