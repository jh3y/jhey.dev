const TOGGLE_FORM = document.querySelector('#theme-toggle')
const TOGGLE_BUTTON = TOGGLE_FORM.querySelector('button')
const TOGGLE_LABEL = TOGGLE_FORM.querySelector('#theme-toggle-label')
const makeRequest = async () => {
  const res = await (
    await fetch(
      `/theme-toggle?${new URLSearchParams({
        client: true,
      })}`
    )
  ).json()
  document.documentElement.dataset.theme = res.theme
  const label = `Set theme to ${res.nextTheme}`
  TOGGLE_LABEL.innerHTML = label
  TOGGLE_BUTTON.title = label
}
const onSubmit = (e) => {
  e.preventDefault()
  makeRequest()
}
TOGGLE_FORM.addEventListener('submit', onSubmit)