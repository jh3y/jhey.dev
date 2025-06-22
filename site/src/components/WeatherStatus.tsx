import { useState, useEffect } from 'react'

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    localtime: string
    timezone: string
  }
  weather: {
    temperature: {
      celsius: number
      fahrenheit: number
      feels_like_celsius: number
      feels_like_fahrenheit: number
    }
    condition: {
      text: string
      icon: string
    }
    details: {
      humidity: number
      wind_speed_kph: number
      wind_speed_mph: number
      wind_direction: string
      pressure_mb: number
      precipitation_mm: number
      cloud_cover: number
      uv_index: number
      is_day: boolean
    }
  }
}

interface SteamData {
  player: {
    name: string
    avatar: string
    profile_url: string
    online: boolean
    last_logoff: number
  }
  last_game: {
    name: string
    app_id: number
    playtime_forever: number
    last_played: number
    icon_url: string
  } | null
}

interface ApiResponse {
  weather: WeatherData | null
  steam: SteamData | null
  timestamp: string
}

export default function WeatherStatus() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [bedfordLocalTime, setBedfordLocalTime] = useState<Date | null>(null)
  const [fetchTime, setFetchTime] = useState<Date | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/status')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.info({ data })
        setApiData(data)
        
        // Create Bedford local time using API hour but current minute
        if (data.weather?.location?.localtime) {
          const bedfordApiTime = new Date(data.weather.location.localtime)
          const now = new Date()
          
          // Use the hour from Bedford API but current minute and second
          const bedfordTime = new Date()
          bedfordTime.setHours(bedfordApiTime.getHours())
          bedfordTime.setMinutes(now.getMinutes())
          bedfordTime.setSeconds(now.getSeconds())
          bedfordTime.setMilliseconds(0) // Reset milliseconds for consistency
          
          const fetchTimestamp = new Date()
          
          setBedfordLocalTime(bedfordTime)
          setFetchTime(fetchTimestamp)
          setCurrentTime(bedfordTime)
        }
        
        setError(null)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update current time every minute based on Bedford local time
  useEffect(() => {
    if (!bedfordLocalTime || !fetchTime) return

    const updateTime = () => {
      const now = new Date()
      const timeDiff = now.getTime() - fetchTime.getTime()
      const updatedBedfordTime = new Date(bedfordLocalTime.getTime() + timeDiff)
      setCurrentTime(updatedBedfordTime)
    }

    // Update immediately
    updateTime()
    
    // Then update every minute
    const interval = setInterval(updateTime, 60 * 1000)
    
    return () => clearInterval(interval)
  }, [bedfordLocalTime, fetchTime])

  if (loading) {
    return (
      <div className="text-center text-sm opacity-60">
        <div className="inline-flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Loading weather...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-sm opacity-60">
        <span title={error}>Weather unavailable</span>
      </div>
    )
  }

  if (!apiData?.weather || !currentTime) {
    return null
  }

  const weatherData = apiData.weather

  // Additional safety check for weather data structure
  if (!weatherData?.weather?.condition?.icon || !weatherData?.weather?.temperature?.celsius) {
    return (
      <div className="text-center text-sm opacity-60">
        <span>Weather data incomplete</span>
      </div>
    )
  }

  // Format the current Bedford local time (updates every minute)
  const timeString = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  // Format the current Bedford local date
  const dateString = currentTime.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  })

  return (
    <div className="text-center text-sm opacity-80">
      <div className="flex items-center justify-center gap-3">
        {/* Weather icon */}
        <div className="flex items-center gap-1">
          <img 
            src={weatherData.weather.condition.icon} 
            alt={weatherData.weather.condition.text || 'Weather condition'}
            className="w-6 h-6"
          />
          <span className="font-medium">
            {Math.round(weatherData.weather.temperature.celsius)}°C
          </span>
        </div>
        
        {/* Location and time */}
        <div className="flex flex-col items-start">
          <span className="font-medium">{weatherData.location?.name || 'Unknown'}</span>
          <span className="text-xs opacity-70">
            {timeString} • {dateString}
          </span>
        </div>
      </div>
      
      {/* Weather condition */}
      <div className="mt-1 text-xs opacity-70">
        {weatherData.weather.condition.text || 'Unknown condition'}
      </div>
    </div>
  )
} 