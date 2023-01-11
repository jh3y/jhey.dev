const setUpCopyCats = () => {
  const COPY_CATS = document.querySelectorAll('[data-copy-code="true"]')
  const COPY = e => {
    const BUTTON = e.currentTarget
    const el = Object.assign(document.createElement('textarea'), {
      value: BUTTON.previousElementSibling.firstChild.textContent,
      className: 'sr-only',
    })
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    const LABEL = BUTTON.querySelector('.sr-only')
    BUTTON.dataset.copied = true
    LABEL.textContent = 'Copied!'
    setTimeout(() => {
      LABEL.textContent = 'Copy to clipboard'
      BUTTON.dataset.copied = false
    }, 500)
  }
  COPY_CATS.forEach(b => {
    b.addEventListener('click', COPY)
  })
}
document.addEventListener('DOMContentLoaded', setUpCopyCats)
