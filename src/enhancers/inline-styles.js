import fs from 'fs'

const BASE = `${process.cwd()}/dist`

const styleInliner = (document) => {
  const inlineCSS = [...document.querySelectorAll('head > link[rel="stylesheet"][href^="/"]')]

  if (inlineCSS.length) {
    inlineCSS.forEach((css) => {
      const path = css.getAttribute("href")
      const stylePath = `${BASE}${path}`
      let styles = fs.readFileSync(stylePath, 'utf-8')
      const head = css.parentNode
      const style = document.createElement('style')
      style.innerHTML = styles
      // Need to do a magic replace here...
      head.appendChild(style)
      css.remove()
    })
  }

  return document
}

export default styleInliner