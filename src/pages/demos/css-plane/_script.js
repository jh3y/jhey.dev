const BOUNDS = 50

const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
  const INPUT_RANGE = inputUpper - inputLower
  const OUTPUT_RANGE = outputUpper - outputLower
  return (value) =>
    outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
}

document.addEventListener('pointermove', ({ x, y }) => {
  const newX = mapRange(0, window.innerWidth, -BOUNDS, BOUNDS)(x)
  const newY = mapRange(0, window.innerHeight, BOUNDS, -BOUNDS)(y)
  document.documentElement.style.setProperty('--rotate-x', newY)
  document.documentElement.style.setProperty('--rotate-y', newX)
})

let CHECKED = false
document.addEventListener('pointerdown', (e) => {
  CHECKED = !CHECKED
  document.documentElement.style.setProperty('--dark', CHECKED ? 1 : 0)
})
