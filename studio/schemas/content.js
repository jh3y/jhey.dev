import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'content',
  title: 'Content',
  type: 'document',
  initialValue: {
    feature: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'feature',
      title: 'Feature',
      description: 'Gets this feature to the top of its pile',
      type: 'boolean',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Appearance', value: 'appearance'},
          {title: 'Speaking', value: 'speaking'},
          {title: 'Feature', value: 'feature'},
          {title: 'Video', value: 'video'},
          {title: 'Demo', value: 'demo'},
        ],
      },
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'URL',
              type: 'url',
            }),
          ]
        }
      ]
    }),
    defineField({
      name: 'when',
      title: 'When',
      type: 'date',
    }),
    defineField({
      name: 'where',
      title: 'Where',
      type: 'string',
    })
  ],
})
