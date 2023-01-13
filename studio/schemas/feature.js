import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
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
              name: 'url',
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