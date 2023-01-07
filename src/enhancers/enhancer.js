import fs from 'fs'
import {JSDOM} from 'jsdom'
import styleInliner from './inline-styles.js'
import htmlMinifier from './html-minifier.js'
const BASE = `${process.cwd()}/dist`

const getFiles = dir => {
  let result = []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const p = `${dir}/${file}`
    if (fs.statSync(p).isDirectory()) {
      const files = getFiles(p)
      // console.info({ files })
      result.push(getFiles(p))
    }
    else {
      result.push(p)
    }
  }
  return result.flat()
}

const files = getFiles(BASE)
const HTML = files.filter(f => f.endsWith('.html'))

HTML.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8')

  const {
    window: { document }
  } = new JSDOM(content)

  const inlined = styleInliner(document)
  const minified = htmlMinifier(inlined.documentElement.outerHTML)

  // return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML
  fs.writeFileSync(file, "<!DOCTYPE html>\r\n" + minified)
})