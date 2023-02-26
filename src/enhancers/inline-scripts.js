import fs from 'fs'

const BASE = `${process.cwd()}/dist`

const scriptInliner = document => {
  const inlineScripts = [...document.querySelectorAll('head > script[src^="/"]')]

  const chunks = {}

  if (inlineScripts.length) {
    inlineScripts.forEach((script) => {
      const path = script.getAttribute("src")
      const scriptPath = `${BASE}${path}`
      console.info({ path, scriptPath })
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
          console.info({ chunk })
          /**
           * Note:: You could check if doing a named import here.
           * And then change the text in the chunk to replace the export with a variable name.
           * Then replace every instance of "new i" with the right variable.
           *
           * But, this will introduce issues when you start doing other things like React, etc.
           * Instead just attack at a level above and only inline non-demo pages.
           */
          if (!chunks[chunk]) chunks[chunk] = fs.readFileSync(`${BASE}/_astro${chunk}`, 'utf-8')
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