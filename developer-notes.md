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
- Related post tags aren't being picked up...
- Fix meta tags for open graph cards...
- Fix the aside with emmett link for scrolling rotation gallery...
- Fix up banner floating to use CSS grid...

## Web Mentions
1. Sign up for brid.gy
2. IndieAuth for webmention.io
3. Make static builds
4. Fetch stats on page load
5. Profit...

## TODO::
- Only generate "Cheeps" pages for tags that are actually used in a cheep...
- Writing page filtering and tags for articles based on publications, etc. Ordered by amount.
- /AMA, /Uses, /Now
- Test out some interval based DOM changing scripts in Prod

- Don't forget that Konami code Easter egg...
- Ranking posts by page views???
- Xata serverless view counter
- Edge functions for "New items in feed?"
- Edge functions for "Web mentions"???
- Serverless likes with Xata
- Serverless hit counter?



<!-- Weird debugging with masks and stuff -->
Debugging transitions
```html
<meta name="view-transition" content="same-origin" />
```
``` css
.wrapper {
  background: lightblue;
  display: inline-block;
}
.box {
  --position: 50%;
  height: 100vmin;
  aspect-ratio: 1;
  background: red;
  --size: 4vmin;
  mask:
    linear-gradient(transparent 50%, black 50%),
    radial-gradient(var(--size) at 25% 0%, transparent 99%, black),
    radial-gradient(var(--size) at 50%, black 99%, transparent);
  mask-size:
    100% 200%,
    calc(4 * var(--size)) calc(2 * var(--size)),
    calc(4 * var(--size)) 200%;
  mask-repeat:
    repeat-x,
    repeat-x,
    repeat-x;
  mask-position:
    0 0%,
    calc(50% - var(--size)) calc(0% - (2 * var(--size))),
    50% calc(50% - var(--size));
  animation: sludge 6s infinite ease-in;
}

@keyframes sludge {
  0% {
    mask-position:
      0 100%,
      calc(50% - var(--size)) calc(0% - (2 * var(--size))),
      50% calc(100% - (2 * var(--size)));
  }
  100% {
    mask-position:
      0 calc(0% + (var(--size) * 1.9)),
      calc(50% - var(--size)) calc(100% - (-3 * var(--size))),
      50% calc(0% + (1 * var(--size)));
  }
}
```
View transitions for splodges
```css
@supports(view-transition-name: transition) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    contain: layout;
    mix-blend-mode: normal;
    display: block;
  }
  ::view-transition-new(root) {
    animation: splodge-in 1.5s both ease-in-out;
  }
  ::view-transition-old(root) {
    animation: splodge-out 1.5s both ease-in-out;
    --size: 8vmin;
    -webkit-mask:
      linear-gradient(transparent 50%, black 50%),
      radial-gradient(var(--size) at 25% 0%, transparent 99%, black),
      radial-gradient(var(--size) at 50%, black 99%, transparent);
    -webkit-mask-size:
      100% 200%,
      calc(4 * var(--size)) calc(2 * var(--size)),
      calc(4 * var(--size)) 200%;
    -webkit-mask-repeat:
      repeat-x,
      repeat-x,
      repeat-x;
    -webkit-mask-position:
      0 100%,
      calc(50% - var(--size)) calc(0% - (2 * var(--size))),
      50% calc(100% - (2 * var(--size)));
  }

  ::view-transition-image-pair(root) {
    isolation: auto;
  }

  @keyframes splodge-in {
    0% {
      filter: brightness(0);
      clip-path: circle(0);
      z-index: 2;
    }
    50% {
      filter: brightness(0);
      clip-path: circle(200%);
      z-index: 2;
    }
    50.1%, 100% {
      z-index: -1;
      filter: brightness(1);
      clip-path: circle(200%);
    }
  }

  @keyframes splodge-out {
    0%, 49% {
      filter: brightness(1);
      z-index: 1;
      -webkit-mask: none;
    }
    50% {
      filter: brightness(0);
      z-index: 2;
      -webkit-mask:
        linear-gradient(transparent 50%, black 50%),
        radial-gradient(var(--size) at 25% 0%, transparent 99%, black),
        radial-gradient(var(--size) at 50%, black 99%, transparent);
      -webkit-mask-size:
        100% 200%,
        calc(4 * var(--size)) calc(2 * var(--size)),
        calc(4 * var(--size)) 200%;
      -webkit-mask-repeat:
        repeat-x,
        repeat-x,
        repeat-x;
      -webkit-mask-position:
        0 100%,
        calc(50% - var(--size)) calc(0% - (2 * var(--size))),
        50% calc(100% - (2 * var(--size)));
    }
    100% {
      z-index: 2;
      filter: brightness(0);
      -webkit-mask-position:
        0 calc(0% + (var(--size) * 1.9)),
        calc(50% - var(--size)) calc(100% - (-3 * var(--size))),
        50% calc(0% + (1 * var(--size)));
      /* transform: rotate(180deg) scale(1.1) translate(0, -150%); */
    }
  }
}
```
``` css
  @supports (view-transition-name: foo) {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    ::view-transition-new(root) {
      z-index: -1;
    }

    ::view-transition-old(root) {
      z-index: 2;
      animation: clip-out 1s both ease-in;
    }

    @keyframes clip-out {
        0% { clip-path: inset(0 0 0 0); }
      100% { clip-path: inset(100% 0 0 0); }
    }
  }
```