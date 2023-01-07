const htmlmin = require("html-minifier")

module.exports = (content, outputPath) => {
  // Eleventy 1.0+: use this.inputPath and this.outputPath instead
  if (outputPath.endsWith && outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    })
    return minified
  }

  return content
}