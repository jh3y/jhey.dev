import {defineField, defineType} from 'sanity'
import {v4 as uuidv4} from 'uuid'

/**
 * Example from the old jhey.dev
 * 
 * tags: testimonial
 * permalink: false
 * author: Adam Kuhn, The Kong inc.
 * link: https://twitter.com/cobra_winfrey/status/1397193752591179778
 * feature: true
 * body: Absolutely love that Jhey will instantly find the most whimsically impractical use for a new spec.
Consistently making front end more fun!
 * 
 * */

export default defineType({
  name: 'guestEntry',
  title: 'Guestbook Entry',
  type: 'document',
  initialValue: () => ({
    visible: true,
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
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'url',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
    }),
    defineField({
      name: 'when',
      title: 'When',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
    })
  ],
})
