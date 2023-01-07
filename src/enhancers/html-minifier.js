import htmlmin from 'html-minifier'

const htmlMinifier = document => {
  let minified = htmlmin.minify(document, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  })
  return minified
}

export default htmlMinifier