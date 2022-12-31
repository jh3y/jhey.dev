const setUpCopyCats = () => {
  const COPY_CATS = document.querySelectorAll('[data-code-copy="true"]')

  console.info({ COPY_CATS })

  const COPY = e => {
    const el = document.createElement('textarea')
    // Grab the contents
    el.value = e.target.parentNode.parentNode.lastChild.textContent
    el.height = el.width = 0
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    // Swotch out the stuff
    e.target.textContent = 'Copied!'
    setTimeout(() => e.target.textContent = 'Copy', 500)
  }
  COPY_CATS.forEach(b => {
    b.addEventListener('click', COPY)
  })
}

document.addEventListener('DOMContentLoaded', setUpCopyCats)
