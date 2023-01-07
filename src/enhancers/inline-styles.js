const fs = require('fs')
module.exports = (document) => {
  const inlineCSS = [...document.querySelectorAll('head > link[rel="stylesheet"][href^="/"]')]

  if (inlineCSS.length) {
    inlineCSS.forEach((css) => {
      const path = css.getAttribute("href")
      const stylePath = `${process.cwd()}/public${path}`
      let styles = fs.readFileSync(stylePath, 'utf-8')
      const head = css.parentNode
      const style = document.createElement('style')
      // Absolute JetBrainsMono
      styles = styles.replace(/url\(JetBrainsMono/g, 'url(/JetBrainsMono')
      // Absolute Inter
      styles = styles.replace(/url\(Inter/g, 'url(/Inter')
      // Why does ParcelJS not absolute these URLs...
      style.innerHTML = styles
      // Need to do a magic replace here...
      head.appendChild(style)
      css.remove()
    })
  }
}