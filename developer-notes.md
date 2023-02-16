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

## Astro and RSS is a PitA if you have Markdown on a CMS...
- Do it with Node???
- Trick is to use something like posts.xml.js but use ReactDom and React.createElement to reuse your other Markdown processing techniques...
- Use the sanitizer to make things happy
- Go through the spec
- Check against a validator
- Remove all the garbage people don't need – We can't assume everyone uses Feedly

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
- Filter details/view by categories... [Backburner... Think about where this could even fit in?]
- Fix the horizontal padding...
- Fix the font weights being pulled
- Cards
- Tags by relation
- Banner backup image for motion...
- Set up SEO for each page inside Sanity - Meta Descriptions in schema and fix title inside Layout
- Post footers...
- RSS
- Card Status/Pinned
- Sort out the pinned posts sorting
- Refactor and keep all your queries in one place to make your life easier
- Links
- Using the multi-purpose <ContentBlock/>
- Had issues after a machine upgrade with `storybook`. But, this gave me the opp to try the Vite builder `npx sb@next upgrade --prerelease`
- Persona authors for the different tag pages... Define a specialty. Make those topic pages discoverable.
- Tabs
- Inline stylesheets and make CSS only pull in where it's needed.
- Move script tags?
- Sanity plugin Cloudinary
- Easy way to eject from the JavaScript tags is to check against the current route in Feed and remove the JavaScript for tabs. Set a debug variable in the Feed.astro file for optional scripts, etc.
- Blockquote author citeation?
- Guestbook && Testimonials (Tie these together somehow)
- Timeline items [ Article, Newsletter feature, YouTube appearance, Life thing, Random Misc, Smashing person of week, Did a thing, etc. Drop an icon type if needed that can be mapped? ]
- Image optimisation with sharp
- Some interesting quirks here where you need to do some async stuff and make sure you have width/height set etc.
- Deploy CMS
- Dedicated articles page
- Pages
- 404
- Roll your own image optimisation with Sharp like you did on jhey.dev
- article-component – Convert image to figure if it has an alt with the alt as the figcaption and bleed.
- https://improvmx.com/guides/send-emails-using-gmail/

- Sort content into type categories instead [ This required a CMS shuffle on content types and more thinking ]
- Better handle showcasing featured content [ A curated document type where you pick an Array of things ]
- about - Include sig and some way to show demos? Photo collage on the tilt perhaps?
- Add permalink header sup for panels...
- Change content links to singular links...
- Add your egghead.io content d'uh!
- Start writing some production posts
- Be mindful of locally hosted demos in RSS and also for how you export to say Dev.To, Medium, etc.
- Convert video posters to webp

## Web Mentions
1. Sign up for brid.gy
2. IndieAuth for webmention.io
3. Make static builds
4. Fetch stats on page load
5. Profit...

## TODO::
- Related post tags aren't being picked up...
- /AMA, /Uses, /Now
- Test out some interval based DOM changing scripts in Prod

- Don't forget that Konami code Easter egg...
- Ranking posts by page views???
- Xata serverless view counter
- Edge functions for "New items in feed?"
- Edge functions for "Web mentions"???
- Serverless likes with Xata
- Serverless hit counter?