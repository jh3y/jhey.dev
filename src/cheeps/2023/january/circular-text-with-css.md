---
_id: z2uAtY26VYglFQT423Dfxp
title: Circular text with CSS?
description: Exploring how to lay out text in a circle with new CSS trigonometric functions
slug: circular-text-with-css
og:
  hue: 130
  title: Circular text with CSS?
  gradient: 9
# If you can find an author with this title, do it. Else fallback to main. You can change it easily in the CMS.
author: CSS
hero:
  demo: /demos/circular-text-with-css/index.html
  image:
  alt:
  attribution:
tags:
  - CSS
  - HTML
  - JavaScript
publishedAt: 2023-01-26
updatedAt: 2023-01-26
---
Have you ever wanted to lay out some text in a circle but it felt like a lot of prodding in the dark? How might you do it today? Could you do it with CSS alone in an accurate way? Let's take a look at a new way 👀

<TableOfContents></TableOfContents>

## How you might solve this today
You've definitely got options. Before we go down the CSS route, you could use images. The least maintainable route could be creating an image each time you need to change the text. Make sure to use the `alt` attribute to describe the text that's shown.

<img src="/media/image/2023/january/cheeps/circular-text-with-css/circular-text.png" alt="Circular text generated in Figma" width="250" height="250" />

<Aside data-type="note">
  The SVG generated in Figma, creates a path for each letter individually based on their position.
</Aside>

Or you could use an inline image with SVG. SVG has a `textPath` feature. For the most part, it's pretty good too.

<INSERT SVG DEMO>

Here's a demo using inline SVG and `textPath`. You can change the text and see how it responds. But, you may notice an issue. What's that issue? The radius doesn't scale, it's not content-aware. And this is what I meant when I alluded to "Prodding in the dark" earlier.

For the most part, working in code, we're somewhat wired to assume some degree of accuracy. That is, minus some rounding and other JavaScript quirks. So for me, punching numbers in until it "looks right", sometimes doesn't sit quite well with me.

---

This is also seen when we tackle this with a rudimentary CSS approach. Take a string of text, split it into elements per character, and transform them into a circle.

<INSERT CSS CODE>

## Introducing CSS trigonometric functions

<BrowserSupport></BrowserSupport>

Try not to fear the word "trigonometric". I know, I know. When I hear it, I start thinking of "Differential equations", "Mechanics", and so on.

<Aside>
Small fact. Not meeting the grade in advanced Mathematics in school put me on the programming path. But, that's a story for another day.
</Aside>

