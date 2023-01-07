import fs from 'fs'

const BASE = `${process.cwd()}/dist`

const scriptInliner = document => {
  const inlineScripts = [...document.querySelectorAll('head > script[src^="/"]')]

  const chunks = {}

  if (inlineScripts.length) {
    inlineScripts.forEach((script) => {
      const path = script.getAttribute("src")
      const scriptPath = `${BASE}${path}`
      let scripts = fs.readFileSync(scriptPath, 'utf-8')

      const lines = scripts.split(';')

      const requiredChunks = []

      for (const line of lines) {
        if (line.startsWith('import')) {
          // Need to extract the file path...
          /**
           * Note:: Issue here if you put multiple files together.
           * You get conflicting minification. Better to put chunk
           * in its own <script> tag at the end.
           * */
          const chunk = line.slice(line.indexOf('"') + 2, line.lastIndexOf('"'))
          if (!chunks[chunk]) chunks[chunk] = fs.readFileSync(`${BASE}${chunk}`, 'utf-8')
          // Remove the chunk reference
          scripts = scripts.replace(`${line};`, '')
          // Push the chunk refernce to the required Array
          requiredChunks.push(chunks[chunk])
        }
      }
      for (const dep of requiredChunks) {
        const inlineDep = Object.assign(document.createElement('script'), {
          innerHTML: `;(function(){${dep}})()`
        })
        document.body.appendChild(inlineDep)
      }
      const inlineScript = Object.assign(document.createElement('script'), {
        innerHTML: `;(function(){${scripts}})()`
      })
      document.body.appendChild(inlineScript)
      // Remove the original script
      script.remove()
    })
  }
  return document
}

export default scriptInliner