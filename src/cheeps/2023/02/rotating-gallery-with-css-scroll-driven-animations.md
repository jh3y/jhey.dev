---
_id: DgQFRrSeZMmDYuP4eCwOTE # Production ID
# _id: FuJyiSPoBy5dqTgGctHuWV # Development ID
title: Rotating gallery with CSS scroll-driven animations
description: Driving CSS animations with page scroll with the CSS scroll-driven animations API
slug: rotating-gallery-with-css-scroll-driven-animations
og:
  hue: 130
  title: Drive CSS animation with page scroll?
  gradient: 9
# If you can find an author with this title, do it. Else fallback to main. You can change it easily in the CMS.
author: Main
hero:
  demo: https://cdpn.io/pen/debug/poOvyor
  image:
  alt:
  attribution:
tags:
  - CSS
  - HTML
  - JavaScript
publishedAt: 2023-02-04
updatedAt: 2023-02-04
---
Saw this [neat gallery effect](https://twitter.com/austin_malerba/status/1618380647541932032) concept over on Twitter. It's built with [Framer](https://www.framer.com/). It got me thinking about how exciting the CSS scroll-driven animations API is going to be. I couldn't resist [building a version](https://twitter.com/jh3yy/status/1621564942175322112) taking the API for a spin. And now I'm going to show you how to do it!

<CodePen id="VwBgPxP"></CodePen>

<Aside type="note">
Sometimes the polyfill doesn't kick in for these embeds. Hit the "Rerun" button and try again if it animates on load.
</Aside>

If you're not familiar with this API, I introduced it in "[Building Chrometober](https://web.dev/building-chrometober/)". It allows you to drive CSS animations with scroll. The magic part is that this will all happen off the main thread. That means performant scroll-driven animations where JavaScript is optional.

It's currently experimental in Chrome. But, there is a polyfill that you can use. That's what powers today's demo.

<BrowserSupport property="css.properties.animation-timeline"></BrowserSupport>

The API has been through many changes. The compatibility data from [MDN is a little inaccurate](https://caniuse.com/mdn-css_properties_animation-timeline) currently (That's what powers the `<BrowserSupport>` widget above). I'd recommend keeping an eye on [the spec](https://drafts.csswg.org/scroll-animations-1/) or the [polyfill repo](https://github.com/flackr/scroll-timeline) if you're interested in keeping up to date with things. Or [keep in touch](https://twitter.com/jh3yy) with me!

## Drive type
At a high level, scroll-driven animations fall into two categories:

1. Those driven by scroll position using `scroll-timeline`.
2. Those driven by an element's position within its scroll container (scrollport) using `view-timeline`.

Today, we're concerned with the first of those. Driving animations based on scroll position.

<Aside type="note">
Triggering animations on scroll is currently out of scope. For now, using an IntersectionObserver or a package like ScrollOut is a good option. You could also use GreenSock, more on this later.
</Aside>

## Building this demo
First things first, we need that polyfill. Import this in a way that works for you. Here it is in a `script` tag.

```html
<script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
```

Up next, you need some elements to animate. A list with some images will work for what we want. For this demo, I've used [picsum.photos](https://picsum.photos/) for placeholder images:

```html
<main>
  <ul>
    <li style="--x1: 2; --x2: 6; --y1: 1; --y2: 4;">
      <img src="https://picsum.photos/600/600?random=1" alt="">
    </li>
    <li style="--x1: 6; --x2: 8; --y1: 2; --y2: 4;">
      <img src="https://picsum.photos/600/600?random=2" alt="">
    </li>
    <!-- Obfuscated items -->
  </ul>
</main>
```

<Aside type="tip">

Using something like [emmett](https://www.emmet.io/) makes generating markup for images a breeze. To get random images in a list:
<code>main>ul>li*10>img[src="https://picsum.photos/600/600?random=$" alt=""]</code>.

</Aside>

Now to lay them out in this grid-like manner. You have options here. You could use `grid-template-areas` and draw the layout in your CSS.

```css
ul {
  grid-template-areas: ". a a a a . . . . ."
                       ". a a a a c c . ."
                       ". a a a a c c . .";
}
li:nth-of-type(1) {
  grid-area: a;
}

```
I'm not a huge fan of [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) though. They sometimes [don't play nice](https://github.com/sass/sass/issues/216).

You may have noticed the inline styles in the markup above:

```html
<li style="--x1: 2; --x2: 6; --y1: 1; --y2: 4;">
  <img src="https://picsum.photos/600/600?random=1" alt="">
</li>
```

They define the coordinates for grid position. It might seem verbose to write these out. But, I like to lean into the use of custom property scope here. You can likely get away with positioning the main items and then rely on [`grid-auto-flow: dense`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) too. Another approach would be having these coordinates in a JavaScript object. Then you can use whatever templating language you like to generate the markup and inline styles.

Anyway, back to the styles. Taking the custom property approach, you can scope the styles for the items:

```css
ul {
  --big-tile-size: 50vmin;
  --rotation: 270deg;
  --scale: 0.4;
  --tile-size: calc(var(--big-tile-size) / 3);
  display: grid;
  grid-template: repeat(9, var(--tile-size)) / repeat(9, var(--tile-size));
  gap: 1vmin;
  transform:
    translate(-50%, -50%)
    scale(var(--scale))
    rotate(0deg);
}
li {
  grid-column: var(--x1, auto) / var(--x2, auto);
  grid-row: var(--y1, auto) / var(--y2, auto);
}
```

<CodePen id="BaOyjgj"></CodePen>

Now the grid is starting to take shape. There are custom properties to define the behavior of the grid and it's time for animation. This is where the `--scale` and `--rotation` properties are going to come into play.

You need to animate two things:

1. The layout's scale and rotation.
2. The image rotation to counter the layout rotation.

But, you don't need two keyframes for that. You can share one set using custom properties.

``` css
@keyframes scale-up {
  0% {
    transform:
      translate(-50%, -50%)
      scale(var(--scale))
      rotate(0deg);
  }
  100% {
    transform:
      translate(-50%, -50%)
      scale(1)
      rotate(var(--rotation));
  }
}
```

The images set their direction to counter the layout rotation and use the same keyframes:

```css
img {
  --rotation: -270deg;
  --scale: 1;
}
```

<Aside type="note">
You could refactor this to reduce some of the code but we're building to understand how the idea comes to life.
</Aside>

Now you can apply the animation. Let's set the iteration count to infinite to see it on loop.

```css
ul, img {
  animation: scale-up 10s infinite ease-in-out alternate;
}
```

<CodePen id="poOvyor"></CodePen>

Ready for the last piece of the puzzle? Let's drive it with the body's scroll position.

``` css
ul, img {
  animation-timeline: scroll(root);
  animation: 1s scale-up both ease-in;
}
```

Yep. That's all you need for a scroll timeline. Remove the iteration count from our animation and set the `animation-fill-mode` to `both`. The `animation-timeline` property is set to `scroll(root)`. This defines that the animation will get driven by the scroll of the root scroller. In this case, that's the `body`. To tie it all together, we fix the position of our layout and set the body height to the amount we'd like to scroll.

``` css
body { height: 300vh; }
```

And we get the end result!

<CodePen id="VwBgPxP"></CodePen>

Driving CSS animation with scroll and no JavaScript is an exciting prospect. I'm excited for it to make its way into browsers. Let's hope future versions of the spec include the ability to trigger or ease the animations.

## Bonus (GSAP Solution)

The scroll-driven animations API is in its early stages. Someone did reach out asking if you could ease the scroll. If it were me, I'd be reaching for [GreenSock](https://greensock.com/). The [ScrollTrigger plugin](https://greensock.com/scrolltrigger/) handles this use case well with the `scrub` property.

You have to adjust your implementation a little. But, you can power the whole thing with this block of JavaScript:

``` javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  duration: 2,
  ease: "power1.inOut"
});

const rotate = 270

gsap
  .timeline({
    scrollTrigger: {
      scrub: 1, // smooth scrubbing catch up duration
    }
  })
  .to("ul", {
    scale: 1,
    rotate,
  })
  .to(
    "img",
    {
      rotate: -rotate
    },
    0
  );
```

<CodePen id="yLxyOJp"></CodePen>

---

That's it! The [CSS scroll-driven animation API](https://drafts.csswg.org/scroll-animations-1/) is an exciting one. I've been [playing](https://twitter.com/jh3yy/status/1621564942175322112) with it a [bunch](https://twitter.com/jh3yy/status/1615815314087837696) seeing what kind of [things](https://twitter.com/jh3yy/status/1590450608620044288) you can do with it. I'm excited to see it in your hands! Until that API matures though, solutions like [GreenSock's ScrollTrigger](https://greensock.com/scrolltrigger/) are fantastic.

__Stay awesome!__

<Signature></Signature>
## Further reading

- [Building Chrometober](https://web.dev/building-chrometober/): web.dev
- [Scroll Animations Spec](https://drafts.csswg.org/scroll-animations-1/): CSSWG
- [Animation Timeline Browser Support](https://caniuse.com/mdn-css_properties_animation-timeline): caniuse.com
- [Demo tweet](https://twitter.com/jh3yy/status/1621564942175322112): Twitter
- [Demo link](https://codepen.io/jh3y/pen/VwBgPxP): CodePen
- [Demo Collection](https://codepen.io/collection/qOobRy): CodePen
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/): GreenSock