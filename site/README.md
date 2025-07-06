# the craft of ui

oh yeah – i'm making a course...

┬┴┬┴┤•ᴥ•ʔ├┬┴┬┴

## Environment Variables

This site uses several API keys for the status features. You'll need to set these up in your environment:

### Weather API
- `WEATHER_API_KEY`: Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Steam API
- `STEAM_API_KEY`: Get a Steam Web API key from [Steam Community](https://steamcommunity.com/dev/apikey)
- `STEAM_USER_ID`: Your Steam User ID (64-bit Steam ID, not vanity URL)

### How to get your Steam User ID
1. Go to your Steam profile
2. Copy the URL
3. Use a tool like [SteamID.io](https://steamid.io/) to convert your profile URL to a Steam ID
4. Use the 64-bit Steam ID (the long number)

### Setting up environment variables
For local development, create a `.env` file in the `site/` directory:
```
WEATHER_API_KEY=your_weather_api_key_here
STEAM_API_KEY=your_steam_api_key_here
STEAM_USER_ID=your_steam_user_id_here
```

For production (Vercel), add these as environment variables in your Vercel dashboard.
