import { useState, useEffect } from 'react'

interface SteamData {
  last_game: {
    name: string
    app_id: number
    playtime_forever: number
    last_played: number
    icon_url: string
  } | null
}

interface ApiResponse {
  weather: any | null
  steam: SteamData | null
  timestamp: string
}

export default function SteamStatus() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/status')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.info({ steamData: data.steam })
        console.info({ fullApiData: data })
        setApiData(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch Steam data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load Steam data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="text-center text-sm opacity-60">
        <div className="inline-flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Loading Steam data...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-sm opacity-60">
        <span title={error}>Steam data unavailable</span>
      </div>
    )
  }

  if (!apiData?.steam) {
    return null
  }

  const steamData = apiData.steam

  // Format playtime
  const formatPlaytime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60)
      return `${hours}h`
    } else {
      const days = Math.floor(minutes / 1440)
      return `${days}d`
    }
  }

  // Format last played time
  const formatLastPlayed = (timestamp: number) => {
    if (timestamp === 0) return 'Unknown'
    
    const lastPlayed = new Date(timestamp * 1000)
    const now = new Date()
    const diffMs = now.getTime() - lastPlayed.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return lastPlayed.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
      })
    }
  }

  if (!steamData.last_game) {
    return (
      <div className="text-center text-sm opacity-60">
        <span>No recent games</span>
      </div>
    )
  }

  return (
    <div className="text-center text-sm opacity-80">
      <div className="flex items-center justify-center gap-3">
        {/* Game icon */}
        <div className="flex items-center gap-1">
          <img 
            src={steamData.last_game.icon_url} 
            alt={steamData.last_game.name}
            className="w-6 h-6 rounded"
          />
          <span className="font-medium">
            {steamData.last_game.name}
          </span>
        </div>
        
        {/* Game info */}
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-70">
            {formatLastPlayed(steamData.last_game.last_played)} • {formatPlaytime(steamData.last_game.playtime_forever)}
          </span>
        </div>
      </div>
    </div>
  )
} 