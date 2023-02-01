import { visit } from 'unist-util-visit'
import slugify from 'slugify'

const remarkToc = () => {
  return (tree, file) => {
    let headers = []
    visit(tree, 'heading', (node) => {
      headers.push(node)
    })
    visit(tree, 'html', (node) => {
      if (node.value.indexOf('<TableOfContents') !== -1) {
        node.type = 'html'
        const children = headers
          .map((h) => {
            if (h.depth < 2) return null
            const id = slugify(h.children[0].value.toLowerCase(), {
              remove: /[*+~.()'"!:@?]/g,
            })
            return `
              <li class="uppercase text-fluid--1 pl-1 ${
                h.depth > 2 ? 'ml-6' : 'ml-2'
              }">
                <a href="#${id}" className="text-text-1 block w-full decoration-brand-stroke">${
              h.children[0].value
            }</a>
              </li>`
          })
          .join('')
        node.value = `
          <aside type="tableofcontents">
            <details data-toc="true" role="navigation" className="bg-surface-2">
              <summary data-toc-summary="true" class="flex justify-between cursor-pointer p-4">
                <span class="uppercase text-fluid--1 font-bold">Table of Contents</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-brand-stroke">
                  <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 pt-0">
                <ul className="mb-0 pl-4 list-disc grid gap-y-1">
                  ${children}
                </ul>
              </div>
            </details>
          </aside>
        `
      }
    })
  }
}

export default remarkToc