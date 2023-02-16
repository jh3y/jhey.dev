import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter'
const THEMES = ['system', 'light', 'dark']
const COOKIE_KEY = 'jhey-theme'

export default async (request, context) => {
  const res = await context.next()
  const type = res.headers.get('content-type')

  if (!type.startsWith('text/html') || request.url.includes('/demos/')) {
    return res
  }

  // Grab the theme to make sure it's set on the HTML
  const theme = context.cookies.get(COOKIE_KEY) || THEMES[0]
  const currentIndex = THEMES.indexOf(theme)
  const nextTheme = THEMES.at(currentIndex + 1) || THEMES[0]
  const futureTheme = THEMES[THEMES.indexOf(nextTheme) + 1] || THEMES[0]

  // If it's a fetch request, return a response instead
  // Only toggle if you're coming via the theme-toggle action
  if (request.url.indexOf('theme-toggle') !== -1) {
    const url = new URL(request.url)

    const isClient =
      url.searchParams.has('client') &&
      url.searchParams.get('client') === 'true'

    // Setting the cookie

    // Redirect to where you came from
    const path = request.headers.get('referer')

    // Set the cookie for storage
    context.cookies.set({
      name: COOKIE_KEY,
      value: nextTheme,
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: 'Strict',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    // If it's a JavaScript fetch request, return the new value
    if (isClient) {
      const headers = {
        'Content-Type': 'application/json',
      }
      // Return the new theme that's been set in the cookie
      return new Response(JSON.stringify({ theme: nextTheme, nextTheme: futureTheme }), {
        headers,
        status: 200,
      })
    } else {
      // Do a redirect because there's no JavaScript at play
      // The redirect will pick up and set the HTML rewrite
      return new Response('Redirecting...', {
        status: 301,
        headers: {
          Location: path,
          'Cache-Control': 'no-cache',
        },
      })
    }
  }

  // You don't need to import the module unless you're using it.
  // const { HTMLRewriter } = await import('https://ghuc.cc/worker-tools/html-rewriter')
  const label = `Set theme to ${nextTheme}`
  return new HTMLRewriter()
    .on('html', {
      element(element) {
        element.setAttribute('data-theme', theme)
      },
    })
    .on('span[id=theme-toggle-label]', {
      element(element) {
        element.setInnerContent(label)
      }
    })
    .on('.theme-toggle', {
      element(element) {
        element.setAttribute('title', label)
      }
    })
    .transform(res)
}