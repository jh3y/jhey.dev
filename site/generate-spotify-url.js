#!/usr/bin/env node

/**
 * Generate Spotify Authorization URL
 * 
 * This script generates the authorization URL for Spotify OAuth using the live site callback.
 * 
 * Usage:
 * 1. Make sure your .env file has SPOTIFY_CLIENT_ID
 * 2. Run: node generate-spotify-url.js
 * 3. Open the URL in your browser
 * 4. You'll be redirected to https://jhey.dev/callback with your refresh token
 */

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadEnvFile() {
  // Check for .env files in order of priority
  const envFiles = [
    '.env.local',
    '.env.development.local', 
    '.env.development',
    '.env'
  ]
  
  let loadedFile = null
  
  for (const file of envFiles) {
    const envPath = path.join(__dirname, file)
    if (fs.existsSync(envPath)) {
      const result = dotenv.config({ path: envPath })
      if (!result.error) {
        loadedFile = file
        console.log(`📁 Loading environment from: ${file}`)
        break
      }
    }
  }
  
  if (!loadedFile) {
    console.error('❌ No .env file found!')
    process.exit(1)
  }
  
  return loadedFile
}

loadEnvFile()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = 'http://127.0.0.1:4321/callback'

// Scopes needed for recently played tracks
const SCOPES = [
  'user-read-recently-played',
  'user-read-private',
  'user-read-email'
].join(' ')

function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

if (!CLIENT_ID) {
  console.error('❌ SPOTIFY_CLIENT_ID not found in environment variables!')
  process.exit(1)
}

const state = generateRandomString(16)

// Generate authorization URL
const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.searchParams.append('client_id', CLIENT_ID)
authUrl.searchParams.append('response_type', 'code')
authUrl.searchParams.append('redirect_uri', REDIRECT_URI)
authUrl.searchParams.append('state', state)
authUrl.searchParams.append('scope', SCOPES)

console.log('\n🔗 Spotify Authorization URL:')
console.log(authUrl.toString())
console.log('\n📋 Instructions:')
console.log('1. Open this URL in your browser')
console.log('2. Authorize the app with your Spotify account')
console.log(`3. You'll be redirected to ${REDIRECT_URI}`)
console.log('4. Copy the refresh token from the page')
console.log('5. Add it to your .env file as SPOTIFY_REFRESH_TOKEN')
console.log('\n⚠️  Make sure your Spotify app has this redirect URI:')
console.log(REDIRECT_URI) 