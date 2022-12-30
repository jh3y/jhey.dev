# Developer Notes

## Setting up Sanity.io
- Kap's video was a good intro.
- Install/Create inside the repo for the actual site, etc.
- Dupe postcss config so that Sanity isn't looking for Tailwind.
- Create an `.env` file with your Sanity project ID and studio name in it for use to access data via the API.
- Learning to GROQ and expand projections: `*[_type == "post"]{author->}`
- Pull in `sanity-plugin-markdown` and put it config
- Super easy to pull in posts via query in Astro
- Use that to create some different schemas and posts in order to mock out card designs
- Create new schema entries via https://www.sanity.io/docs/

## Setting up Tailwind && Utopia
- Tinkering with different type scale to find something that fits my breakpoints in a suitable manner.

## Setting up Astro && Storybook
- Straight forward. Need JSX/React to use Storybook though :sad:.
- Gotta set up slug pages that make a request based on the slug or ID of the sanity post? Should be slug. But that feels a little brittle for some reason...

## DONE::
- ~~Social footer icons [ Mastodon, Twitter, Instagram, etc. from current ]~~
- Use Hero Icons
- Fix sizing scales for fonts etc. Need step-0 to be around 14px not --1. Could we use prose plugin for blog posts?
- posts/[page]
- posts/[topic]/[page]
- / === posts/
- post/[slug]
- Pagination Component
- Lazy load a banner demo iframe...
- Fix up and remove spacing properties from Tailwind..
- Way to differentiate between ContentBlock in post/article? Pass a "type" prop into the Card and use exception objects for the components map
- Dropping an embed iframe into CodePen and then styling that as a private pen and linking it via the theme. Grab the theme ID from the embed generator
- Export/Import dataset data with Sanity CLI... Why don't ENV variables work with the CLI config???

## TODO::
- Sort out the pinned posts sorting
- Tabs
- Set up SEO for each page inside Sanity
- Deploy CMS
- Cards
- Pages
  - RSS
  - about - Include sig and some way to show demos?
  - 404
  - RSS
  - Testimonials
  - Links
- Timeline items [ Article, Newsletter feature, YouTube appearance, Life thing, Random Misc, Smashing person of week, Did a thing, etc. Drop an icon type if needed that can be mapped? ]
- Filter details/view by categories...

- Web Mentions?
- Serverless likes with Xata
- Serverless hit counter?