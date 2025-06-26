const MOCKED_STATUS_DATA = {
  weather: {
    location: {
      name: "Bedford",
      region: "Bedfordshire",
      country: "UK",
      localtime: "2024-06-01T12:00:00",
      timezone: "Europe/London"
    },
    weather: {
      temperature: {
        celsius: 20,
        fahrenheit: 68,
        feels_like_celsius: 19,
        feels_like_fahrenheit: 66
      },
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
      },
      details: {
        humidity: 60,
        wind_speed_kph: 10,
        wind_speed_mph: 6,
        wind_direction: "NE",
        pressure_mb: 1012,
        precipitation_mm: 0,
        cloud_cover: 50,
        uv_index: 5,
        is_day: true
      }
    }
  },
  steam: {
    last_game: {
      name: "Vampire Survivors",
      app_id: 1794680,
      playtime_forever: 1200,
      last_played: 1717238400,
      icon_url: "https://media.steampowered.com/steamcommunity/public/images/apps/1794680/abcdef1234567890.jpg"
    }
  },
  spotify: {
    track: {
      name: "Mock Song",
      artists: "Mock Artist",
      album: "Mock Album",
      album_art: "https://i.scdn.co/image/mockimage",
      spotify_url: "https://open.spotify.com/track/mocktrackid",
      played_at: "2024-06-01T11:50:00Z"
    }
  },
  time: {
    year: 2024,
    month: 6,
    day: 1,
    hour: 12,
    minute: 0,
    seconds: 0,
    milliSeconds: 0,
    dateTime: "2024-06-01T12:00:00",
    date: "2024-06-01",
    time: "12:00:00",
    timeZone: "Europe/London",
    dayOfWeek: "Saturday",
    dstActive: true
  },
  timestamp: "2024-06-01T12:00:00Z",
  demo: {
    "title": "Liquid Glass™",
    "url": "https://codepen.io/jh3y/pen/EajLxJV"
  },
  status: {
    status: 'Chillin',
    location: 'Split, Croatia'
  }
};

export default MOCKED_STATUS_DATA; 