import { GUI } from 'dat.gui'

const RING = document.querySelector('.text-ring')

const OPTIONS = {
  text: 'Your text here! • ',
  size: 2,
  radius: 5,
}

const CTRL = new GUI()

const onUpdate = () => {
  RING.innerHTML = ''
  const CHARS = OPTIONS.text.split('')
  RING.style.setProperty('--total', CHARS.length)
  RING.style.setProperty('--radius', OPTIONS.radius)
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
CTRL.add(OPTIONS, 'size', 1, 10, 0.1).name('Font size (rem)').onChange(onUpdate)
CTRL.add(OPTIONS, 'radius', 1, 10, 0.1).name('Radius (ch)').onChange(onUpdate)

onUpdate()