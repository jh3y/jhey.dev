---
_id: WjMyb82JvaZH7Th5BN0vit # Production ID
# _id: 882j5943xKO7x9UDiC2Klt # Production ID
# _id: z2uAtY26VYglFQT423Dfxp # Development ID
draft: true
title: Dynamic open graph images for your site with React and serverless
description: How to create dynamic open graph images for your website using serverless edge functions and React
slug: dynamic-open-graph-images-for-your-site
og:
  hue: 130
  title: Dynamic OG images for your site with React and serverless!
  gradient: 7
# If you can find an author with this title, do it. Else fallback to main. You can change it easily in the CMS.
author: Main
hero:
  demo:
  image: /media/image/2023/02/dynamic-open-graph-images-for-your-site/dummy-banner.png
  alt:
  attribution:
tags:
  - HTML
  - JavaScript
  - React
  - Netlify
  - Serverless
publishedAt: 2023-02-26
updatedAt: 2023-02-26
---
Have you ever wanted to lay out some text in a circle but it felt like a lot of prodding in the dark? How might you do it today? Could you do it with CSS alone in an accurate way? Let's take a look at a new way 👀

<TableOfContents></TableOfContents>


Ever wondered how people get those nice image cards to show up when they share a link to their site? These images are part of the Open Graph protocol (https://ogp.me/). You add some metadata to your page in the form of `meta` tags and that's it.

``` html
```

Today, let's look at how you could deal with that image value.

<TableOfContents></TableOfContents>

## Other solutions
Before going into how they're generated for jhey.dev, there are other ways you could do it. This list isn't exhaustive.

- Host and curate images yourself for pages. Create your image and point the meta tag at its hosted location.
- Generate the images at build time with Node using packages like Puppeteer and Sharp.
- Use an image CDN with clever customization tools like those on offer from Cloudinary.
- Something like Vercel's `@vercel/og` if you're using Vercel as your hosting provider.

These are all good solutions. I'm sure there are others. It kinda comes down to what's going to suit your design and setup.

Before, jhey.dev used the second of those to create images like this.

<ArticleImage src="/media/image/2023/02/dynamic-open-graph-images-for-your-site/old-open-graph.png" alt="Image of an old open graph image used on jhey.dev. It reads 'Get started with React by building a Whac-a-mole game'. There is cartoon bear head wearing a baseball cap and sunglasses. An image is reflected in the sunglasses. The bear is clipped in half by the image bounds." width="576" height="301" caption="Previous open graph image for jhey.dev"></ArticleImage>

It can be quite a weighty solution. I wanted to reflect the article hero image in the bear's sunglasses at the time. The idea is that you create some HTML and use Puppeteer to open it and take a screenshot of it. Then save that and host it. This all happens in a node script that could get run post-build.

The use of an image CDN is quite appealing. Jason Lengstorf has a good write-up on using Cloudinary to auto-generate social images. This was the first time I recall seeing it done with generated URLs. It's a neat solution.

Then Vercel announced `@vercel/og` built upon `satori`. This is the one that excited me. It's a balance between the URL solution and the control of HTML. I got a quick taste by integrating it into the Codu community site. And after seeing how good it was, I wanted it for my own site. But, I don't use Vercel. And switching hosting providers for social images seemed extreme. So, how can you do it?

<ArticleImage src="/media/image/2023/02/dynamic-open-graph-images-for-your-site/codu-banner.png" alt="Image of a test open graph image for the Codú community." width="600" height="315" caption="Test image for codu.co"></ArticleImage>

https://www.learnwithjason.dev/blog/auto-generate-social-image/

https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation

https://github.com/codu-code/codu/pull/92


## Build your own

Dislcaimer:

This is what I use. But, the general idea _should_ scale and if you've got links to how you've done it, please share and I'll list them here.

Getting started. WASM, DENO, Reverse Engineering, JSX, SVG, Satori limitations.

That's it! Deploy and have fun using the Netlify CLI.

---

That's it! It's wild to think how the web platform is evolving. All these new features and tools that are knocking down hurdles we've faced for some time.

__Until next time, stay awesome!__

<Signature></Signature>

## Further reading
- [An Intro to Trigonometric CSS Functions](https://blog.stephaniestimac.com/posts/2023/1/css-trigonometric-functions/): Stephanie Stimac
- [The Power (and fun) of Scope with Custom CSS Properties](https://css-tricks.com/the-power-and-fun-of-scope-with-css-custom-properties/): CSS Tricks
- [textPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath): MDN
- [textLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/textLength): MDN
- [SVG circle decomposition to paths](https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/): Smashing Magazine
