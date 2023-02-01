import { GUI } from 'dat.gui'

const RING = document.querySelector('.text-ring')

const OPTIONS = {
  text: 'Circular text with CSS Trigonometric functions • ',
  size: 1,
  spacing: 1,
}

const CTRL = new GUI()

const onUpdate = () => {
  RING.innerHTML = ''
  const CHARS = OPTIONS.text.split('')
  RING.style.setProperty('--total', CHARS.length)
  RING.style.setProperty('--character-width', OPTIONS.spacing)
  RING.style.setProperty('--font-size', OPTIONS.size)
  const HIDDEN_CHARS = Object.assign(document.createElement('span'), {
    ariaHidden: true,
  })

  for (let c = 0; c < CHARS.length; c++) {
    HIDDEN_CHARS.innerHTML += `<span style="--index: ${c}">${CHARS[c]}</span>`
  }
  RING.appendChild(HIDDEN_CHARS)
  RING.innerHTML += `<span class="sr-only">${OPTIONS.text}</span>`
}

CTRL.add(OPTIONS, 'text').name('Text').onChange(onUpdate)
CTRL.add(OPTIONS, 'size', 1, 2, 0.1).name('Font size (rem)').onChange(onUpdate)
CTRL.add(OPTIONS, 'spacing', 1, 2, 0.1).name('Side (ch)').onChange(onUpdate)

onUpdate()