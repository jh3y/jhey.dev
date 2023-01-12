const LABEL = document.querySelector('[data-jiggle-label]')
const JIGGLERS = document.querySelector('[data-jigglers]')
LABEL.innerText = `"${window.location.pathname}" not found`

let jiggles = ''

const getRandom = () => Math.floor(Math.random() * 200) - 100
for (const letter of window.location.pathname.split('')) {
  jiggles += `<span aria-hidden="true" style="--mx:${getRandom()};--my:${getRandom()}" class="text-brand-stroke font-bold" data-jiggle="true">${letter}</span>`
}

JIGGLERS.innerHTML = `${jiggles}<br>${LABEL.parentNode.innerHTML}`

const update = ({ x, y }) => {
  document.documentElement.style.setProperty(
    '--px',
    (x / window.innerWidth - 0.5) * 2
  )
  document.documentElement.style.setProperty(
    '--py',
    (y / window.innerHeight - 0.5) * 2
  )
}

window.addEventListener('pointermove', update)