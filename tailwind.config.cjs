/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
// Set up spacing extension from Utopia variables.
const sizes = [
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
]
const spacing = {}
sizes.forEach((size, index) => {
  spacing[`fluid-size-${index - 2}`] = `var(--step-${index - 2})`
  spacing[`fluid-space-${index - 2}`] = `var(--space-${size})`
  if (size !== sizes.at(sizes.length - 1))
    spacing[
      `fluid-space-${index - 2}-${index - 1}`
    ] = `var(--space-${size}-${sizes.at(index + 1)})`
})

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
      },
      spacing,
      fontSize,
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        'surface-4': 'var(--surface-4)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
      },
    },
  },
}
