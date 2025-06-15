export const prerender = false // Not needed in 'server' mode
import { getSecret } from 'astro:env/server'
import type { APIRoute } from 'astro'

const KIT_KEY = getSecret('KIT_KEY')
const KIT_FORM = '4960194'
const URL = `https://api.convertkit.com/v3/forms/${KIT_FORM}/subscribe`

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()

    // Validate inputs
    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields: name or email.' }),
        { status: 400 },
      )
    }

    console.info({ n: name === '' ? undefined : name })
    const data = {
      api_key: KIT_KEY,
      email,
      first_name: name === '' ? undefined : name,
    }

    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    await new Promise((res) => setTimeout(res, Math.random() * 1_000))

    if (!res.ok) {
      console.error('Kit API error:', result)
      return new Response(
        JSON.stringify({
          message: 'There was an error processing your subscription.',
          error: result,
        }),
        { status: res.status || 502 },
      )
    }

    console.info('Kit API success:', result)
    return new Response(JSON.stringify({ message: 'Success!', name }), {
      status: 200,
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({
        message: 'Internal server error.',
        error: err instanceof Error ? err.message : String(err),
      }),
      { status: 500 },
    )
  }
}
