// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/static'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-sans',
      },
      {
        provider: fontProviders.google(),
        name: 'DM Serif Text',
        cssVariable: '--font-serif',
      },
    ],
  },
  integrations: [mdx(), react()],
})
