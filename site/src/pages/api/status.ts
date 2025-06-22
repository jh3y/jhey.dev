export const prerender = false; // Not needed in 'server' mode
import { getSecret } from 'astro:env/server'
import type { APIRoute } from 'astro'

const WEATHER_API_KEY = getSecret('WEATHER_API_KEY')
const STEAM_API_KEY = getSecret('STEAM_API_KEY')
const STEAM_USER_ID = getSecret('STEAM_USER_ID') // Steam User ID (not vanity URL)
const BEDFORD_LOCATION = 'Bedford,UK'

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
    localtime_epoch: number
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

export const GET: APIRoute = async () => {
  try {
    // Fetch weather data
    let weatherData = null
    if (WEATHER_API_KEY) {
      const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${BEDFORD_LOCATION}&aqi=no`
      
      const weatherResponse = await fetch(weatherUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (weatherResponse.ok) {
        const rawWeatherData: WeatherData = await weatherResponse.json()
        
        weatherData = {
          location: {
            name: rawWeatherData.location.name,
            region: rawWeatherData.location.region,
            country: rawWeatherData.location.country,
            localtime: rawWeatherData.location.localtime,
            timezone: 'Europe/London' // Bedford is in UK timezone
          },
          weather: {
            temperature: {
              celsius: rawWeatherData.current.temp_c,
              fahrenheit: rawWeatherData.current.temp_f,
              feels_like_celsius: rawWeatherData.current.feelslike_c,
              feels_like_fahrenheit: rawWeatherData.current.feelslike_f
            },
            condition: {
              text: rawWeatherData.current.condition.text,
              icon: rawWeatherData.current.condition.icon
            },
            details: {
              humidity: rawWeatherData.current.humidity,
              wind_speed_kph: rawWeatherData.current.wind_kph,
              wind_speed_mph: rawWeatherData.current.wind_mph,
              wind_direction: rawWeatherData.current.wind_dir,
              pressure_mb: rawWeatherData.current.pressure_mb,
              precipitation_mm: rawWeatherData.current.precip_mm,
              cloud_cover: rawWeatherData.current.cloud,
              uv_index: rawWeatherData.current.uv,
              is_day: rawWeatherData.current.is_day === 1
            }
          }
        }
      } else {
        console.error('Weather API error:', weatherResponse.status)
      }
    } else {
      console.error('Weather API key not configured')
    }

    // Fetch Steam data
    let steamData = null
    if (STEAM_API_KEY && STEAM_USER_ID) {
      try {
        console.log('Fetching Steam recently played games for user:', STEAM_USER_ID)
        
        // Get recently played games
        const gamesUrl = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=1`
        console.log('Games URL:', gamesUrl)
        
        const gamesResponse = await fetch(gamesUrl)
        console.log('Games response status:', gamesResponse.status)
        
        if (gamesResponse.ok) {
          const gamesData: SteamGameData = await gamesResponse.json()
          console.log('Games data response:', JSON.stringify(gamesData, null, 2))
          
          if (gamesData.response.games && gamesData.response.games.length > 0) {
            const game = gamesData.response.games[0]
            
            steamData = {
              last_game: {
                name: game.name,
                app_id: game.appid,
                playtime_forever: game.playtime_forever,
                last_played: game.rtime_last_played || 0,
                icon_url: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              }
            }
            
            console.log('Final steam data:', JSON.stringify(steamData, null, 2))
          } else {
            console.log('No recently played games found')
            steamData = { last_game: null }
          }
        } else {
          const errorText = await gamesResponse.text()
          console.error('Games API error response:', errorText)
          steamData = { last_game: null }
        }
      } catch (steamError) {
        console.error('Steam API error:', steamError)
        steamData = { last_game: null }
      }
    } else {
      console.error('Steam API key or user ID not configured')
      console.log('STEAM_API_KEY exists:', !!STEAM_API_KEY)
      console.log('STEAM_USER_ID exists:', !!STEAM_USER_ID)
      steamData = { last_game: null }
    }

    // Format the response with all data
    const formattedData = {
      weather: weatherData,
      steam: steamData,
      timestamp: new Date().toISOString()
    }

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    })

  } catch (err) {
    console.error('Unexpected error fetching data:', err)
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        error: err instanceof Error ? err.message : String(err)
      }),
      { status: 500 }
    )
  }
} 