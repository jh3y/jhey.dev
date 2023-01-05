import { create } from '@storybook/theming/create'
import { addons } from '@storybook/addons'

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  theme: create({
    base: 'dark',
    brandTitle: 'jhey.dev',
    fontBase: 'monospace',
  }),
})