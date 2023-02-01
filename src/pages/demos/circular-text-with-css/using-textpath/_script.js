import { GUI } from 'dat.gui'

const CIRCLE_PATH = document.querySelector('#circlePath')
const TEXT_PATH = document.querySelector('#textPath')
const TEXT = document.querySelector('#text')

const OPTIONS = {
  text: 'Your text here! •&nbsp;',
  size: 12,
  radius: 20,
  showPath: true,
  spread: false,
  inside: false,
}

const CTRL = new GUI()

const VIEWBOX = 100

const onUpdate = () => {
  TEXT.setAttribute('font-size', OPTIONS.size)
  const PATH = `
    M ${VIEWBOX * 0.5 - OPTIONS.radius}, ${VIEWBOX * 0.5}
    a ${OPTIONS.radius},${OPTIONS.radius} 0 1,${OPTIONS.inside ? 0 : 1} ${
    OPTIONS.radius * 2
  },0
    ${OPTIONS.radius},${OPTIONS.radius} 0 1,${OPTIONS.inside ? 0 : 1} -${
    OPTIONS.radius * 2
  },0
  `
  if (OPTIONS.spread) TEXT_PATH.setAttribute('textLength', Math.floor(Math.PI * 2 * OPTIONS.radius))
  else TEXT_PATH.removeAttribute('textLength')
  CIRCLE_PATH.setAttribute('d', PATH)
  TEXT_PATH.innerHTML = OPTIONS.text
  CIRCLE_PATH.style.setProperty('--show', OPTIONS.showPath ? 1 : 0)
}

CTRL.add(OPTIONS, 'text').name('Text').onChange(onUpdate)
CTRL.add(OPTIONS, 'size', 6, 16, 1).name('Font size').onChange(onUpdate)
CTRL.add(OPTIONS, 'radius', 20, 50, 1).name('Radius').onChange(onUpdate)
CTRL.add(OPTIONS, 'showPath').name('Show path').onChange(onUpdate)
CTRL.add(OPTIONS, 'spread').name('Spread text').onChange(onUpdate)
CTRL.add(OPTIONS, 'inside').name('Inside').onChange(onUpdate)

onUpdate()

// <circle
//   id="MyPath"
//   fill="none"
//   stroke="red"
//   cx="50"
//   cy="50"
//   r="25"
// />
// <path
//   d="
//     M (CX - R), CY
//     a R,R 0 1,0 (R * 2),0
//     a R,R 0 1,0 -(R * 2),0
//   "
// />
