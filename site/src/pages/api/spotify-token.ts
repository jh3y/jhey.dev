import { getSecret } from 'astro:env/server'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const { code, redirect_uri } = await request.json()
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Authorization code is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const SPOTIFY_CLIENT_ID = getSecret('SPOTIFY_CLIENT_ID')
    const SPOTIFY_CLIENT_SECRET = getSecret('SPOTIFY_CLIENT_SECRET')

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Spotify credentials not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || 'http://127.0.0.1:4321/callback'
      })
    })

    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json()
      return new Response(
        JSON.stringify({ 
          refresh_token: tokenData.refresh_token,
          access_token: tokenData.access_token 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      const errorData = await tokenResponse.json()
      console.error('Spotify token exchange failed:', errorData)
      return new Response(
        JSON.stringify({ 
          error: errorData.error_description || errorData.error || 'Token exchange failed' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error in spotify-token endpoint:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
} 