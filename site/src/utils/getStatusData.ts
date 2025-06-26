import { promises as fs } from 'fs';
import path, { format } from 'path';
import { getSecret } from 'astro:env/server';
import MOCKED_STATUS_DATA from './mockStatusData';

const WEATHER_API_KEY = getSecret('WEATHER_API_KEY');
const STEAM_API_KEY = getSecret('STEAM_API_KEY');
const STEAM_USER_ID = getSecret('STEAM_USER_ID');
const SPOTIFY_CLIENT_ID = getSecret('SPOTIFY_CLIENT_ID');
const SPOTIFY_CLIENT_SECRET = getSecret('SPOTIFY_CLIENT_SECRET');
const SPOTIFY_REFRESH_TOKEN = getSecret('SPOTIFY_REFRESH_TOKEN');

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
    localtime_epoch: number;
    tz_id: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    precip_in: number;
    cloud: number;
    uv: number;
    is_day: number;
  };
}

interface TimeApiResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

interface SteamGameData {
  response: {
    game_count: number;
    games: Array<{
      appid: number;
      name: string;
      playtime_forever: number;
      img_icon_url: string;
      img_logo_url: string;
      has_community_visible_stats?: boolean;
      playtime_windows_forever?: number;
      playtime_mac_forever?: number;
      playtime_linux_forever?: number;
      rtime_last_played?: number;
    }>;
  };
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecentlyPlayed {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
}

async function getSpotifyAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.error('Spotify credentials not configured');
    return null;
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
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      const errorData = await response.text();
      console.error('Failed to refresh Spotify token:', response.status, errorData);
      return null;
    }
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    return null;
  }
}

async function getLastPlayedSong(): Promise<any> {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) {
    return null;
  }
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (response.ok) {
      const data: SpotifyRecentlyPlayed = await response.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        return {
          track: {
            name: item.track.name,
            artists: item.track.artists.map(artist => artist.name).join(', '),
            album: item.track.album.name,
            album_art: item.track.album.images[0]?.url || null,
            spotify_url: item.track.external_urls.spotify,
            played_at: item.played_at
          }
        };
      }
    } else {
      console.error('Spotify API error:', response.status);
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
  }
  return null;
}

async function getAccurateTime(timezone: string): Promise<TimeApiResponse | null> {
  try {
    const encodedTimezone = encodeURIComponent(timezone);
    const timeUrl = `https://timeapi.io/api/time/current/zone?timeZone=${encodedTimezone}`;
    const response = await fetch(timeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const timeData: TimeApiResponse = await response.json();
      return timeData;
    } else {
      console.error('Time API error:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching time data:', error);
    return null;
  }
}

export async function getStatusData() {
  if (process.env.NODE_ENV === 'development') {
    return MOCKED_STATUS_DATA;
  }

  // Read demo data from demo.json
  const demoFilePath = path.join(process.cwd(), 'src/data/demo.json');
  const demoFile = await fs.readFile(demoFilePath, 'utf-8');
  const demoData = JSON.parse(demoFile);

  // Read location from status.json
  const statusFilePath = path.join(process.cwd(), 'src/data/status.json');
  const statusFile = await fs.readFile(statusFilePath, 'utf-8');
  const statusData = JSON.parse(statusFile);
  const location = statusData.location || 'Bedford,UK';

  // Fetch weather data
  let weatherData = null;
  let accurateTime = null;
  if (WEATHER_API_KEY) {
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no&current_fields=localtime_epoch`;
    const weatherResponse = await fetch(weatherUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (weatherResponse.ok) {
      const rawWeatherData: WeatherData = await weatherResponse.json();
      if (rawWeatherData.location.tz_id) {
        accurateTime = await getAccurateTime(rawWeatherData.location.tz_id);
      }
      weatherData = {
        location: {
          name: rawWeatherData.location.name,
          region: rawWeatherData.location.region,
          country: rawWeatherData.location.country,
          localtime: accurateTime?.dateTime || rawWeatherData.location.localtime,
          timezone: rawWeatherData.location.tz_id || 'Europe/London'
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
      };
    } else {
      console.error('Weather API error:', weatherResponse.status);
    }
  } else {
    console.error('Weather API key not configured');
  }

  // Fetch Steam data
  let steamData = null;
  if (STEAM_API_KEY && STEAM_USER_ID) {
    try {
      const gamesUrl = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}&count=1`;
      const gamesResponse = await fetch(gamesUrl);
      if (gamesResponse.ok) {
        const gamesData: SteamGameData = await gamesResponse.json();
        if (gamesData.response.games && gamesData.response.games.length > 0) {
          const game = gamesData.response.games[0];
          steamData = {
            last_game: {
              name: game.name,
              app_id: game.appid,
              playtime_forever: game.playtime_forever,
              last_played: game.rtime_last_played || 0,
              icon_url: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
            }
          };
        } else {
          steamData = { last_game: null };
        }
      } else {
        steamData = { last_game: null };
      }
    } catch (steamError) {
      steamData = { last_game: null };
    }
  } else {
    steamData = { last_game: null };
  }

  // Fetch Spotify data
  const spotifyData = await getLastPlayedSong();

  // Format the response with all data
  const formattedData = {
    weather: weatherData,
    steam: steamData,
    spotify: spotifyData,
    time: accurateTime,
    timestamp: new Date().toISOString(),
    demo: demoData,
    status: statusData,
  };
  console.info({ formattedData: JSON.stringify(formattedData, null, 2)})

  return formattedData;
} 