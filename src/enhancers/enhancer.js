import fs from 'fs'
import {JSDOM} from 'jsdom'
import styleInliner from './inline-styles.js'
import htmlMinifier from './html-minifier.js'
import scriptInliner from './inline-scripts.js'
import { enhanceImages, imageEnhancer } from './image-processor.js'
const BASE = `${process.cwd()}/dist`

const getFiles = dir => {
  let result = []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const p = `${dir}/${file}`
    if (fs.statSync(p).isDirectory()) {
      const files = getFiles(p)
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

let docs = []
// Create an Array of documents and their paths for reuse
HTML.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8')
  const {
    window: { document }
  } = new JSDOM(content)
  docs.push({file, document})
})

// Enhance the images before optimizing the HTML
await enhanceImages(docs)

docs.forEach(async ({document, file}) => {

  const inlined = styleInliner(document)
  // Do an if file.includes(/demos/) here and ignore demo pages
  const scripty = !file.includes('/demos/') ? scriptInliner(inlined) : inlined
  const pictured = await imageEnhancer(scripty)
  const minified = htmlMinifier(pictured.documentElement.outerHTML)

  fs.writeFileSync(file, "<!DOCTYPE html>\r\n" + minified)
  // For debugging
  // fs.writeFileSync(file + '--amended.html', "<!DOCTYPE html>\r\n" + minified)
})