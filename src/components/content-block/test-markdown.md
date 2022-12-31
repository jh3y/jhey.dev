# Test Post

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> "One of Jhey’s main mantras is to make learning fun. In this article, he shows you ways to level up your skills by bringing your ideas to life, and not forgetting that [you can be playful with code](https://www.smashingmagazine.com/2020/11/playfulness-code-supercharge-fun-learning/). With that mindset, every idea is bound to become an opportunity to try something new." – Vitaly Friedman

<TableOfContents></TableOfContents>

Naming things is hard, right? "Flippy Snaps" was the best thing I could come up with 😂  I saw an effect like this on TV one evening and made a note to myself to make something similar. Although this isn't something I'd look to drop on a website any time soon, it's a neat little challenge to make. It fits in with my whole stance on "[Playfulness in Code](https://www.smashingmagazine.com/2020/11/playfulness-code-supercharge-fun-learning/)" to learn. Anyway, a few days later, I sat down at the keyboard, and a couple of hours later I had this.

<Tweet id="1457830342413455369"></Tweet>

My final demo is a React app, but we don't need to dig into using React to explain the mechanics of making this work. We will create the React app once we’ve established how to make things work.

## Audio

![Test Audio](/media/audio/test-audio.mp3)

Oh. And here's an unordered list:

- Cool
- Beans
- For

And how about numbered lists:

1. Cool thing
2. Awesome thing
3. Nice thing
4. Ended things

Check lists?

- [ ] Cool
- [ ] Cool
- [x] Cool
- [ ] Cool

<aside>
  Before we get started. It’s worth noting that performance of this demo is affected by the grid size and the demos are best viewed in Chromium based browsers.
</aside>

Let's start by creating a grid. Let's say we want a 10 by 10 grid. That's 100 cells (This is why React is handy for something like this). Each cell is going to consist of an element that contains the front and back for a flippable card.

```html
<div class="flippy-snap">
  <!-- 100 of these -->
  <div class="flippy-snap__card flippy-card">
    <div class="flippy-card__front"></div>
    <div class="flippy-card__rear"></div>
  </div>
</div>
```

The styles for our grid are quite straightforward. We can use `display: grid` and use a custom property for the grid size. Here we are defaulting to `10`.

```javascript
console.info(true === true)
```

<aside data-type="note">
  Before we get started. It’s worth noting that performance of this demo is affected by the grid size and the demos are best viewed in Chromium based browsers.
</aside>

<aside data-type="warning">
  Before we get started. It’s worth noting that performance of this demo is affected by the grid size and the demos are best viewed in Chromium based browsers.
</aside>


```css
.flippy-snap {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(var(--grid-size, 10), 1fr);
  grid-template-rows: repeat(var(--grid-size, 10), 1fr);
}
```

We won’t use `grid-gap` in the final demo, but, it’s good for seeing the cells easier whilst developing.

<CodePen id="XWayzVK" title="Some random pen"></CodePen>


Next, we need to style the sides to our cards and display images. We can do this by leveraging inline CSS custom properties. Let's start by updating the markup. We need each card to know its `x` and `y` position in the grid.

```html
<div class="flippy-snap">
  <div class="flippy-snap__card flippy-card" style="--x: 0; --y: 0;">
    <div class="flippy-card__front"></div>
    <div class="flippy-card__rear"></div>
  </div>
  <div class="flippy-snap__card flippy-card" style="--x: 1; --y: 0;">
    <div class="flippy-card__front"></div>
    <div class="flippy-card__rear"></div>
  </div>
  <!-- Other cards -->
</div>
```

For the demo, I'm using `Pug` to generate this for me. You can see the compiled HTML by clicking “View Compiled HTML” in the demo.

```pug
- const GRID_SIZE = 10
- const COUNT = Math.pow(GRID_SIZE, 2)
.flippy-snap
  - for(let f = 0; f < COUNT; f++)
    - const x = f % GRID_SIZE
    - const y = Math.floor(f / GRID_SIZE)
    .flippy-snap__card.flippy-card(style=`--x: ${x}; --y: ${y};`)
      .flippy-card__front
      .flippy-card__rear
```

Then we need some styles.

```css
.flippy-card {
  --current-image: url("https://random-image.com/768");
  --next-image: url("https://random-image.com/124");
  height: 100%;
  width: 100%;
  position: relative;
}
.flippy-card__front,
.flippy-card__rear {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-image: var(--current-image);
  background-position: calc(var(--x, 0) * -100%) calc(var(--y, 0) * -100%);
  background-size: calc(var(--grid-size, 10) * 100%);
}
.flippy-card__rear {
  background-image: var(--next-image);
  transform: rotateY(180deg) rotate(180deg);
}
```

The rear of the card gets its position using a combination of rotations via `transform`. But, the interesting part is how we show the image part for each card. In this demo, we are using a custom property to define the URLs for two images. And then we set those as the `background-image` for each card face. But the trick is how we define the `background-size` and `background-position`. Using the custom properties `--x` and `--y` we multiply the value by `-100%`. And then we set the `background-size` to `--grid-size` multiplied by `100%`. This gives displays the correct part of the image for a given card.

<CodePen id="YzxBKLP" title="Some pen"></CodePen>

You may have noticed that we had `--current-image` and `--next-image`. But, currently, there is no way to see the next image. For that, we need a way to flip our cards. We can use another custom property for this. Let's introduce a `--count` property and set a `transform` for our cards.

```css
.flippy-snap {
  --count: 0;
  perspective: 50vmin;
}
.flippy-card {
  transform: rotateX(calc(var(--count) * -180deg));
  transition: transform 0.25s;
  transform-style: preserve-3d;
}
```

We can set the `--count` property on the containing element. Scoping means all the cards can pick up that value and use it to `transform` their rotation on the x-axis. We also need to set `transform-style: preserve-3d` so that we see the back of the cards. Setting a `perspective` gives us that 3D perspective.

This demo lets you update the `--count` property value so you can see the effect it has.


<CodePen id="YzxBKLP" title="Some pen"></CodePen>

## What next?

At this point, you could wrap it up there and set a simple click handler that increments `--count` by one on each click.

```javascript
const SNAP = document.querySelector('.flippy-snap')
let count = 0
const UPDATE = () => SNAP.style.setProperty('--count', count++)
SNAP.addEventListener('click', UPDATE)
```

Remove the `grid-gap` and you'd get this. Click the snap to flip it.


<CodePen id="YzxBKLP" title="Some pen"></CodePen>

----------

Now we have the basic mechanics worked out, it's time to turn this into a React app. There's a bit to break down here.

```jsx
const App = () => {
  const [snaps, setSnaps] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [gridSize, setGridSize] = useState(9)
  const snapRef = useRef(null)

  const grabPic = async () => {
    const pic = await fetch('https://source.unsplash.com/random/1000x1000')
    return pic.url
  }

  useEffect(() => {
    const setup = async () => {
      const url = await grabPic()
      const nextUrl = await grabPic()
      setSnaps([url, nextUrl])
      setDisabled(false)
    }
    setup()
  }, [])

  const setNewImage = async count => {
    const newSnap = await grabPic()
    setSnaps(
      count.current % 2 !== 0 ? [newSnap, snaps[1]] : [snaps[0], newSnap]
    )
    setDisabled(false)
  }

  const onFlip = async count => {
    setDisabled(true)
    setNewImage(count)
  }

  if (snaps.length !== 2) return <h1 className="loader">Loading...</h1>

  return (
    <FlippySnap
      gridSize={gridSize}
      disabled={disabled}
      snaps={snaps}
      onFlip={onFlip}
      snapRef={snapRef}
    />
  )
}
```

Our `App` component handles grabbing images and passing them to our `FlippySnap` component. That's the bulk of what's happening here.  For this demo, we're grabbing images from Unsplash.

```javascript
const grabPic = async () => {
  const pic = await fetch('https://source.unsplash.com/random/1000x1000')
  return pic.url
}

// Initial effect grabs two snaps to be used by FlippySnap
useEffect(() => {
  const setup = async () => {
    const url = await grabPic()
    const nextUrl = await grabPic()
    setSnaps([url, nextUrl])
    setDisabled(false)
  }
  setup()
}, [])
```

## Cool Beans

If there aren't two snaps to show, then we show a "Loading..." message.

```javascript
if (snaps.length !== 2) return <h1 className="loader">Loading...</h1>
```

If we are grabbing a new image, we need to disable `FlippySnap` so we can't spam click it.

```javascript
<FlippySnap
  gridSize={gridSize}
  disabled={disabled} // Toggle a "disabled" prop to stop spam clicks
  snaps={snaps}
  onFlip={onFlip}
  snapRef={snapRef}
/>
```
We're letting `App` dictate the snaps that get displayed by `FlippySnap` and in which order. On each flip, we grab a new image, and depending on how many times we've flipped, we set the correct snaps. The alternative would be to set the snaps and let the component figure out the order.

```javascript
const setNewImage = async count => {
  const newSnap = await grabPic() // Grab the snap
  setSnaps(
    count.current % 2 !== 0 ? [newSnap, snaps[1]] : [snaps[0], newSnap]
  ) // Set the snaps based on the current "count" which we get from FlippySnap
  setDisabled(false) // Enable clicks again
}

const onFlip = async count => {
  setDisabled(true) // Disable so we can't spam click
  setNewImage(count) // Grab a new snap to display
}
```

### Beanies

How might `FlippySnap` look? There isn’t much to it at all!

```javascript
const FlippySnap = ({ disabled, gridSize, onFlip, snaps }) => {
  const CELL_COUNT = Math.pow(gridSize, 2)
  const count = useRef(0)

  const flip = e => {
    if (disabled) return
    count.current = count.current + 1
    if (onFlip) onFlip(count)
  }

  const buttonStyle = {
    "--grid-size": gridSize,
    "--count": count.current,
    "--current-image": `url('${snaps[0]}')`,
    "--next-image": `url('${snaps[1]}')`,
  }

  return (
    <button
      className="flippy-snap"
      ref={containerRef}
      style={buttonStyle}>
      {new Array(CELL_COUNT).fill().map((cell, index) => {
        const x = index % gridSize
        const y = Math.floor(index / gridSize)
        const cellStyle = {
          "--x": x,
          "--y": y,
        }
        return (
          <span
            key={index}
            className="flippy-card"
            style={cellStyle}>
            <span className="flippy-card__front"></span>
            <span className="flippy-card__rear"></span>
          </span>
        )
      }}
    </button>
  )
}
```

The component handles rendering all the cards and setting the inline custom properties. The `onClick` handler for the container increments the `count`. It also triggers the `onFlip` callback. If the state is currently `disabled`, it does nothing. That flip of the `disabled` state and grabbing a new snap triggers the flip when the component re-renders.


<CodePen id="YzxBKLP" title="Some pen"></CodePen>

----------

We have a React component that will now flip through images for as long as we want to keep requesting new ones. But, that flip transition is a bit boring. To spice it up, we're going to make use of [GreenSock](https://greensock.com/) and it's utilities. In particular, the "[distribute](https://greensock.com/docs/v3/GSAP/UtilityMethods/distribute)" utility. This will allow us to distribute the delay of flipping our cards in a grid like burst from wherever we click. To do this, we're going to use GreenSock to animate the `--count` value on each card.

It's worth noting that we have a choice here. We could opt to apply the styles with GreenSock. Instead of animating the `--count` property value, we could animate `rotateX`. We could do this based on the `count` ref we have. And this also goes for any other things we choose to animate with GreenSock in this article. It's down to preference and use case. You may feel that updating the custom property value makes sense. The benefit being that you don't need to update any JavaScript to get a different styled behavior. We could change the CSS to use `rotateY` for example.

Our updated `flip` function could look like this:

```javascript
const flip = e => {
  if (disabled) return
  const x = parseInt(e.target.parentNode.getAttribute('data-snap-x'), 10)
  const y = parseInt(e.target.parentNode.getAttribute('data-snap-y'), 10)
  count.current = count.current + 1
  gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
    '--count': count.current,
    delay: gsap.utils.distribute({
      from: [x / gridSize, y / gridSize],
      amount: gridSize / 20,
      base: 0,
      grid: [gridSize, gridSize],
      ease: 'power1.inOut',
    }),
    duration: 0.2,
    onComplete: () => {
      // At this point update the images
      if (onFlip) onFlip(count)
    },
  })
}
```

Note how we're getting an `x` and `y` value by reading attributes of the clicked card. For this demo, we've opted for adding some `data` attributes to each card. These attributes communicate a cards position in the grid. We’re also using a new `ref` called `containerRef`. This is so we reference only the cards for a `FlippySnap` instance when using GreenSock.

```javascript
{new Array(CELL_COUNT).fill().map((cell, index) => {
  const x = index % gridSize
  const y = Math.floor(index / gridSize)
  const cellStyle = {
    "--x": x,
    "--y": y,
  }
  return (
    <span
      className="flippy-card"
      data-snap-x={x}
      data-snap-y={y}
      style={cellStyle}>
      <span className="flippy-card__front"></span>
      <span className="flippy-card__rear"></span>
    </span>
  )
})}
```

Once we get those `x` and `y` values, we can make use of them in our animation. Using `gsap.to` we want to animate the `--count` custom property for every `.flippy-card` that's a child of `containerRef`.

To distribute the delay from where we click, we set the value of `delay` to use `gsap.utils.distribute`. The `from` value of the `distribute` function takes an Array containing ratios along the x and y axis. To get this, we divide `x` and `y` by `gridSize`. The `base` value is the initial value. For this, we want `0` delay on the card we click. The `amount` is the largest value. We've gone for `gridSize / 20` but you could experiment with different values. Something based on the `gridSize` is a good idea though. The `grid` value tells GreenSock the grid size to use when calculating distribution. Last but not least, the `ease` defines the ease of the `delay` distribution.

```javascript
gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
  '--count': count.current,
  delay: gsap.utils.distribute({
    from: [x / gridSize, y / gridSize],
    amount: gridSize / 20,
    base: 0,
    grid: [gridSize, gridSize],
    ease: 'power1.inOut',
  }),
  duration: 0.2,
  onComplete: () => {
    // At this point update the images
    if (onFlip) onFlip(count)
  },
})
```

As for the rest of the animation, we are using a flip duration of `0.2` seconds. And we make use of `onComplete` to invoke our callback. We pass the flip `count` to the callback so it can use this to determine snap order. Things like the duration of the flip could get configured by passing in different `props` if we wished.

Putting it all together gives us this:

<CodePen id="YzxBKLP" title="Some pen"></CodePen>

Those that like to push things a bit might have noticed that we can still "spam" click the snap. And that's because we don't disable `FlippySnap` until GreenSock has completed. To fix this, we can use an internal ref that we toggle at the start and end of using GreenSock.

```javascript
const flipping = useRef(false) // New ref to track the flipping state

const flip = e => {
  if (disabled || flipping.current) return
  const x = parseInt(e.target.parentNode.getAttribute('data-snap-x'), 10)
  const y = parseInt(e.target.parentNode.getAttribute('data-snap-y'), 10)
  count.current = count.current + 1
  gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
    '--count': count.current,
    delay: gsap.utils.distribute({
      from: [x / gridSize, y / gridSize],
      amount: gridSize / 20,
      base: 0,
      grid: [gridSize, gridSize],
      ease: 'power1.inOut',
    }),
    duration: 0.2,
    onStart: () => {
      flipping.current = true
    },
    onComplete: () => {
      // At this point update the images
      flipping.current = false
      if (onFlip) onFlip(count)
    },
  })
}
```

And now we can no longer spam click our `FlippySnap`!

<CodePen id="YzxBKLP" title="Some pen"></CodePen>

----------

Now it's time for some extra touches. At the moment, there's no visual sign that we can click our `FlippySnap`. What if when we hover, the cards raise towards us? We could use `onPointerOver` and use the "distribute" utility again.

```javascript
const indicate = e => {
  const x = parseInt(e.currentTarget.getAttribute('data-snap-x'), 10)
  const y = parseInt(e.currentTarget.getAttribute('data-snap-y'), 10)
  gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
    '--hovered': gsap.utils.distribute({
      from: [x / gridSize, y / gridSize],
      base: 0,
      amount: 1,
      grid: [gridSize, gridSize],
      ease: 'power1.inOut'
    }),
    duration: 0.1,
  })
}
```

Here, we are setting a new custom property on each card named `--hovered`. This is set to a value from `0` to `1`. Then within our CSS, we are going to update our card styles to watch for the value.

```css
.flippy-card {
  transform: translate3d(0, 0, calc((1 - (var(--hovered, 1))) * 5vmin))
              rotateX(calc(var(--count) * -180deg));
}
```

Here we are saying a card will move on the z-axis at most `5vmin`.

We then apply this to each card using the `onPointerOver` prop.

```javascript
{new Array(CELL_COUNT).fill().map((cell, index) => {
  const x = index % gridSize
  const y = Math.floor(index / gridSize)
  const cellStyle = {
    "--x": x,
    "--y": y,
  }
  return (
    <span
      onPointerOver={indicate}
      className="flippy-card"
      data-snap-x={x}
      data-snap-y={y}
      style={cellStyle}>
      <span className="flippy-card__front"></span>
      <span className="flippy-card__rear"></span>
    </span>
  )
})}
```

And when our pointer leaves our `FlippySnap` we want to reset our card positions.

```javascript
const reset = () => {
  gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
    '--hovered': 1,
    duration: 0.1,
  })
}
```

And we can apply this with the `onPointerLeave` prop.

```jsx
<button
  className="flippy-snap"
  ref={containerRef}
  onPointerLeave={reset}
  style={buttonStyle}
  onClick={flip}>
```

Put that all together and we get something like this. Try moving your pointer over it.

<CodePen id="YzxBKLP" title="Some pen"></CodePen>

What next? How about a loading indicator so we know when we our `App` is grabbing the next image? We can render a loading spinner when our `FlippySnap` is `disabled`.

```javascript
{disabled && <span className='flippy-snap__loader'></span>}
```

The styles for which could make a rotating circle.

```css
.flippy-snap__loader {
  border-radius: 50%;
  border: 6px solid #fff;
  border-left-color: #000;
  border-right-color: #000;
  position: absolute;
  right: 10%;
  bottom: 10%;
  height: 8%;
  width: 8%;
  transform: translate3d(0, 0, 5vmin) rotate(0deg);
  animation: spin 1s infinite;
}
@keyframes spin {
  to {
    transform: translate3d(0, 0, 5vmin) rotate(360deg);
  }
}
```

And this gives us a loading indicator when grabbing a new image.

<CodePen id="YzxBKLP" title="Some pen"></CodePen>

## That's it!

That's how we can create a `FlippySnap` with React and GreenSock. It's fun to make things that we may not create on a day to day basis. Demos like this can pose different challenges and can level up your problem solving game.

I took it a little further and added a slight parallax effect along with some audio. You can also configure the grid size! Big grids affect performance though. It’s also worth noting that this demo works best in Chromium based browsers. Where would you take it next? I'd like to see if I can recreate it with ThreeJS next. That’ll address the performance 😅

<CodePen id="JjyxjMX" title="Some pen"></CodePen>

__Stay Awesome! ʕ •ᴥ•ʔ__