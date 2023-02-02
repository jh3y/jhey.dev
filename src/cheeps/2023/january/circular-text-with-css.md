---
_id: 882j5943xKO7x9UDiC2Klt # Production ID
# _id: z2uAtY26VYglFQT423Dfxp # Development ID
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
  demo: /demos/circular-text-with-css/result/index.html
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

<Aside type="note">
  The SVG generated in Figma, creates a path for each letter individually based on their position.
</Aside>

Or you could use an inline SVG. SVG has a `textPath` element. For the most part, it's pretty good. You give it some text and a path to lay that text on.

```html
<svg
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    id="circlePath"
    d="
      M 10, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -80,0
    "
  />
  <text>
    <textPath href="#circlePath">
      Your text here!
    </textPath>
  </text>
</svg>
```

This route does pose a couple of hurdles. First, you need a `path`. You can't pass reference to a `circle`. That means converting a `circle` to a `path`.

```html
<path
  d="
    M (CENTER_X - RADIUS),CENTER_Y
    a RADIUS,RADIUS 0 1,1 (2 * RADIUS),0
    RADIUS,RADIUS 0 1,1 (-2 * RADIUS),0
  "
/>
```

Next, you need to choose whether you use the `textLength` attribute of `textPath`. This can spread the text around the path. The value of this will be the circumference.

```jsx
<textPath
  href="#circularPath"
  textLength={Math.floor(Math.PI * 2 * RADIUS)}
>
  Your text here!
</textPath>
```

Put everything together and you'll get something like this.

<Demo src="/demos/circular-text-with-css/using-textpath/index.html" title="Using textPath to create circular text"></Demo>

In this demo, you can change the text and see how the use of `textLength` plays a part. You can also change the radius and font size. A neat part of using SVG is that we have something scalable. Another cool feature is that the text will follow the path direction. That makes it easy to flip whether the text is inside or outside of the path. You can do that by changing the [sweep flag of an arc](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs) between `1` and `0`.

So SVG can do the job, right? Well, kinda. But, if you try punching in some longer text, that radius will need adjusting. And, at this point, you're prodding in the dark.

---

For the most part, working in code, we're somewhat wired to assume some degree of accuracy. That is, minus some rounding and other JavaScript quirks. So for me, punching numbers in until it "looks right", sometimes doesn't sit quite well with me.

Could you be more accurate with CSS? A rudimentary approach could go like this:

1. Split text into span elements for each character.
2. Set an inline custom property for the character index.
3. Set an inline custom property on the parent for total characters.
4. Using CSS calc, transform each span by rotating and then translating it using its index.
5. If this will be visible to screenreaders, hide all the characters with `aria-hidden`. Then create a visually hidden span with the full text inside it.

Here's how the HTML might look:

```html
<span
  class="text-ring"
  style="--total: 15;"
>
  <span aria-hidden="true">
    <span style="--index: 0">Y</span>
    <span style="--index: 1">o</span>
    <span style="--index: 2">u</span>
    <!-- Obfuscated markup -->
  </span>
  <span class="sr-only">
    Your text here!
  </span>
</span>
```

And the CSS could go a little like this:

```css
.text-ring {
  position: relative;
}
.text-ring [style*=--index] {
  font-size: calc(var(--font-size, 2) * 1rem);
  position: absolute;
  top: 50%;
  left: 50%;
  transform:
    translate(-50%, -50%)
    rotate(calc(360deg / var(--total) * var(--index)))
    translateY(calc(var(--radius, 5) * -1ch));
}
```

How do you calculate that radius though? We're still prodding in the dark. Try adjusting things until they "look right" in this demo.

<Demo src="/demos/circular-text-with-css/rudimentary-css/index.html" title="A rudimentary attempt with CSS"></Demo>

## Enter trigonometric functions
Try not to fear the word "trigonometric". I know, I know. When I hear it, I start thinking of "Differential equations", "Mechanics", and so on. But, some Math and leaning into font behavior is going to get us a solution.

<img src="/media/image/2023/january/cheeps/circular-text-with-css/math-lady-meme.jpeg" alt="Math lady meme" width="645" height="430" />

You may have noticed the demos above use a monospace font. The benefit of doing so is that you know every character will be the same width. Think about the circle in a different way. It's actually lots of triangles around a point. A monospace font means every "side" of our circle is the same width. If you have the width of a side and the inner angle, you can calculate the hypoteneuse. That hypoteneuse is our radius!

```js
const TOTAL_CHARACTERS = 15
const INNER_ANGLE = 360 / 15
const LENGTH_OF_SIDE = 1 // 1ch
const RADIUS = LENGTH_OF_SIDE /
  Math.sin(INNER_ANGLE / (180 / Math.PI))
```

A neat trick here is to define the side width using the "ch" unit. That's equal to the width of a "0" in our font. And because a monospace font is being used, that'll be the width of every character. That means we'll get a radius in "ch" units. But, changing the `font-size` will behave in a way that scales the text ring. Neat!

That snippet of JavaScript above gets us the radius and now we can set that in our CSS. The bonus is that if you're doing static markup generation, you can pass all the details in as inline styles. Here it is [in a React component](https://codepen.io/jh3y/pen/OJwagZa). You might server-side render this or use it in something like Astro (What this site uses).

```jsx
const TextRing = (text) => {
  const CHARS = text.split('')
  const INNER_ANGLE = 360 / CHARS.length
  return (
    <span
      className="text-ring"
      style={{
        '--total': CHARS.length,
        '--radius': 1 / Math.sin(INNER_ANGLE / (180 / Math.PI))
      }}
    >
      {CHARS.map((char, index) => (
        <span style={{'--index': index }}>
          {char}
        </span>
      ))}
    </span>
  )
}
```

For the most part, this will do the trick. But, what if you don't like the feel of dictating your layout styles in JavaScript? Well, CSS might be able to help with that very soon.

<Aside type="random">
Random fact. Not meeting the grade in advanced Mathematics in school put me on the programming path. But, that's a story for another day.
</Aside>

## Introducing CSS trigonometry
Trigonometric functions are coming to CSS. This will give you access to functions such as `sin`, `cos`, and `tan` within CSS. They're already available in Firefox and Safari. They're poised to ship in Chromium 111. Be sure to check out the ["CSS Values and Units Module Level 4"](https://w3c.github.io/csswg-drafts/css-values/#trig-funcs) spec. The introduction of these functions in CSS opens up some exciting opportunities. For example, you could use them [in layouts](https://twitter.com/jh3yy/status/1611450493129330689) or the timing of [loading animations](https://twitter.com/jh3yy/status/1611475080818851840).

<BrowserSupport language="css" category="types" api="sin"></BrowserSupport>

What does this mean for our circular text? CSS can now do the radius calculation. You no longer need to couple the layout styling to some JavaScript. The `--radius` is now calculated using `sin` in our CSS.

```css
.text-ring {
  --character-width: 1; /* In "ch" units */
  --inner-angle: calc((360 / var(--total)) * 1deg);
  --radius: calc(
    (
      var(--character-width, 1) /
      sin(var(--inner-angle))
    ) * -1ch
  );
}
.text-ring [style*=--index] {
  transform:
    translate(-50%, -50%)
    rotate(calc(var(--inner-angle) * var(--index)))
    translateY(var(--radius, -5ch));
}
```

Plug that into our demo and we get the right radius.

<Demo src="/demos/circular-text-with-css/css-trig/index.html" title="CSS trig demo"></Demo>

If you're not in a supporting browser, you _should_ see a warning message. You can detect CSS trigonometric function support in CSS with:

```css
@supports (top: calc(sin(1) * 1px)) {
  /* Insert styles */
}
```

Or in JavaScript with:

```javascript
const canTrig = CSS.supports('(top: calc(sin(1) * 1px))')
```

For the finishing touches, let's make our text ring spin:

```css
@media (prefers-reduced-motion: no-preference) {
  .text-ring {
  	animation: spin 6s infinite linear;
  }
  @keyframes spin {
    to {
      rotate: -360deg;
    }
  }
}
```

And that'll do it. Putting it all together, we can make a demo like this one.

<CodePen id="LYBdKXE" title="Circular text with CSS Trigonometric functions"></CodePen>

In this demo, CSS trigonometric functions get used if supported. If not, we fall back to setting the `--radius` with JavaScript. For now, you could copy the HTML and CSS you need until CSS trigonometric functions get full support.

---

That's it! It's wild to think how the web platform is evolving. All these new features and tools that are knocking down hurdles we've faced for some time.

__Until next time, stay awesome!__

<Signature></Signature>

## Further reading
- [textPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath): MDN
- [textLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/textLength): MDN
- [SVG circle decomposition to paths](https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/): Smashing Magazine
- [An Intro to Trigonometric CSS Functions](https://blog.stephaniestimac.com/posts/2023/1/css-trigonometric-functions/): Stephanie Stimac
