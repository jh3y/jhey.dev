import fs from 'fs'

const BASE = `${process.cwd()}/dist`

// const files = fs.readdirSync(BASE)
// const filesToRemove = files.filter((f) => f.includes(".critical.css"))
// Iterate through critical CSS files and remove them
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

console.info({ files: files.filter(f => f.endsWith('.html')) })



// module.exports = function (content, outputPath) {
//   if (outputPath.endsWith && outputPath.endsWith(".html")) {
//     const {
//       window: { document },
//     } = new JSDOM(content)
//     enhanceInlineStyles(document)
//     return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML
//   }
//   return content
// }