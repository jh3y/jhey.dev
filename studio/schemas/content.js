import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'content',
  title: 'Curated Content',
  description: 'Curated content for the content tab',
  type: 'document',
  fields: ['post', 'article', 'talk', 'video', 'demo', 'appearance', 'feature'].map((contentType) =>
    defineField({
      name: `${contentType}s`,
      title: `${contentType.charAt(0).toUpperCase()}${contentType.slice(1)}s`,
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'active',
          title: 'Active',
          type: 'boolean',
        }),
        defineField({
          name: 'intro',
          title: 'Intro',
          type: 'markdown',
        }),
        defineField({
          name: 'selection',
          title: 'Selection',
          type: 'array',
          of: [{type: 'reference', to: [{type: contentType}]}],
        }),
      ],
    })
  ),
})