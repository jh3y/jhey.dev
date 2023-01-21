import {defineField, defineType} from 'sanity'

import content from './content'
import guestEntry from './guestEntry'
import siteConfig from './siteConfig'
import status from './status'
import tag from './tag'
import post from './post'
import cheep from './cheep'
import author from './author'
import article from './article'
import demo from './demo'
import video from './video'
import talk from './talk'
import feature from './feature'
import appearance from './appearance'

const contentTypes = ['article', 'talk', 'video', 'demo', 'appearance', 'feature']
const contentDefinitions = contentTypes.map((contentType) => {
  return defineType({
    name: contentType,
    title: `${contentType.charAt(0).toUpperCase()}${contentType.slice(1)}`,
    type: 'document',
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
        name: 'link',
        title: 'Link',
        type: 'url',
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
      }),
    ],
  })
})

export const schemaTypes = [
  cheep,
  post,
  guestEntry,
  siteConfig,
  ...contentDefinitions,
  // article,
  // talk,
  // appearance,
  // feature,
  // demo,
  // video,
  content,
  author,
  status,
  tag,
]
