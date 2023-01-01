/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

const spacing = {}
const minHeight = {}
const avatarIndex = 9

spacing.avatar = `var(--step-${avatarIndex})`
minHeight['half-avatar'] = `calc(var(--step-${avatarIndex}) * 0.5)`

// Set up typography scales
const fontSize = {}
for (let i = -2; i < 10; i++) {
  fontSize[`fluid-${i}`] = `var(--step-${i})`
}

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      width: {
        'main-content': '60ch',
        'article': '66ch',
      },
      minHeight,
      spacing,
      fontSize,
      // fontFamily: {
      //   sans: ['Inter', ...defaultTheme.fontFamily.sans],
      //   mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      // },
      colors: {
        'brand-fill': 'var(--brand-fill)',
        'brand-stroke': 'var(--brand-stroke)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        'surface-4': 'var(--surface-4)',
        'surface-alpha': 'var(--surface-alpha)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        'text-4': 'var(--text-4)',
      },
    },
  },
}
