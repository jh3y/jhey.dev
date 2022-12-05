import { create } from "@storybook/theming/create"
import { addons } from "@storybook/addons"

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "jhey.dev",
    fontBase: "monospace",
  }),
})