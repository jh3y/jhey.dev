import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Used for the page description/OG images',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'draft',
      title: 'Draft',
      description: 'Whether this article should be built for production',
      type: 'boolean',
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
          type: 'number',
        }),
        defineField({
          name: 'gradient',
          title: 'Gradient',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      description: 'Use a 3:1 aspect ratio for banner images and point to a URL for a demo',
      type: 'object',
      fields: [
        defineField({
          name: 'demo',
          title: 'Hero embedded demo',
          description: 'Point at a demo to embed',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Hero demo image',
          description: 'Backup image in case demo has motion',
          type: 'string',
        }),
        defineField({
          name: 'alt',
          title: 'Image alt',
          type: 'string',
        }),
        defineField({
          name: 'attribution',
          title: 'Image attribution',
          type: 'markdown',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'This is body of the article',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
