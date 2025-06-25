export const prerender = false; // Not needed in 'server' mode
import { getSecret } from 'astro:env/server'
import type { APIRoute } from 'astro'
import { promises as fs } from 'fs';
import path from 'path';
import { getStatusData } from '../../utils/getStatusData';

const WEATHER_API_KEY = getSecret('WEATHER_API_KEY')
const STEAM_API_KEY = getSecret('STEAM_API_KEY')
const STEAM_USER_ID = getSecret('STEAM_USER_ID') // Steam User ID (not vanity URL)
const SPOTIFY_CLIENT_ID = getSecret('SPOTIFY_CLIENT_ID')
const SPOTIFY_CLIENT_SECRET = getSecret('SPOTIFY_CLIENT_SECRET')
const SPOTIFY_REFRESH_TOKEN = getSecret('SPOTIFY_REFRESH_TOKEN')

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
    localtime_epoch: number
    tz_id: string // Timezone ID from weather API
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    humidity: number
    feelslike_c: number
    feelslike_f: number
    wind_kph: number
    wind_mph: number
    wind_dir: string
    pressure_mb: number
    precip_mm: number
    precip_in: number
    cloud: number
    uv: number
    is_day: number
  }
}

interface TimeApiResponse {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  seconds: number
  milliSeconds: number
  dateTime: string
  date: string
  time: string
  timeZone: string
  dayOfWeek: string
  dstActive: boolean
}

interface SteamGameData {
  response: {
    game_count: number
    games: Array<{
      appid: number
      name: string
      playtime_forever: number
      img_icon_url: string
      img_logo_url: string
      has_community_visible_stats?: boolean
      playtime_windows_forever?: number
      playtime_mac_forever?: number
      playtime_linux_forever?: number
      rtime_last_played?: number
    }>
  }
}

interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{
    id: string
    name: string
  }>
  album: {
    id: string
    name: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyRecentlyPlayed {
  items: Array<{
    track: SpotifyTrack
    played_at: string
  }>
}

async function getSpotifyAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.error('Spotify credentials not configured')
    return null
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.access_token
    } else {
      const errorData = await response.text()
      console.error('Failed to refresh Spotify token:', response.status, errorData)
      return null
    }
  } catch (error) {
    console.error('Error refreshing Spotify token:', error)
    return null
  }
}

async function getLastPlayedSong(): Promise<any> {
  const accessToken = await getSpotifyAccessToken()
  
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
      const data: SpotifyRecentlyPlayed = await response.json()
      
      if (data.items && data.items.length > 0) {
        const item = data.items[0]
        return {
          track: {
            name: item.track.name,
            artists: item.track.artists.map(artist => artist.name).join(', '),
            album: item.track.album.name,
            album_art: item.track.album.images[0]?.url || null,
            spotify_url: item.track.external_urls.spotify,
            played_at: item.played_at
          }
        }
      }
    } else {
      console.error('Spotify API error:', response.status)
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
  }

  return null
}

async function getAccurateTime(timezone: string): Promise<TimeApiResponse | null> {
  try {
    const encodedTimezone = encodeURIComponent(timezone)
    const timeUrl = `https://timeapi.io/api/time/current/zone?timeZone=${encodedTimezone}`
    
    const response = await fetch(timeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const timeData: TimeApiResponse = await response.json()
      return timeData
    } else {
      console.error('Time API error:', response.status)
      return null
    }
  } catch (error) {
    console.error('Error fetching time data:', error)
    return null
  }
}

export const GET: APIRoute = async () => {
  try {
    const formattedData = await getStatusData();
    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (err) {
    console.error('Unexpected error fetching data:', err);
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        error: err instanceof Error ? err.message : String(err)
      }),
      { status: 500 }
    );
  }
}; 