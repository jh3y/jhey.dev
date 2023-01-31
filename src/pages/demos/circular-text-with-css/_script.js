const canTrig = CSS.supports('(top: calc(sin(1) * 1px))')
const HEADING = document.querySelector('h1')

const OPTIONS = {
  SPACING: 1,
  SIZE: 1,
  TEXT: 'Made by Jhey with CSS Trig functions • ',
}

const onUpdate = () => {
  // Make the ring text
  const text = OPTIONS.TEXT
  // 1. Take the text and split it into spans...
  const chars = text.split('')
  HEADING.innerHTML = ''
  HEADING.style.setProperty('--char-count', chars.length)

  for (let c = 0; c < chars.length; c++) {
    HEADING.innerHTML += `<span aria-hidden="true" class="char" style="--char-index: ${c};">${chars[c]}</span>`
  }
  HEADING.innerHTML += `<span class="sr-only">${OPTIONS.TEXT}</span>`
  // Set the styles
  HEADING.style.setProperty('--font-size', OPTIONS.SIZE)
  HEADING.style.setProperty('--character-width', OPTIONS.SPACING)
  HEADING.style.setProperty(
    '--radius',
    canTrig
      ? 'calc((var(--character-width) / sin(var(--inner-angle))) * -1ch'
      : `calc(
      (${OPTIONS.SPACING} / ${Math.sin(
          360 / HEADING.children.length / (180 / Math.PI)
        )})
      * -1ch
    )`
  )
}

onUpdate()
