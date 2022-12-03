/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
// Set up spacing extension from Utopia variables.
const sizes = ["3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
const spacing = {};
sizes.forEach((size, index) => {
	spacing[`fluid-${size}`] = `var(--space-${size})`;
	if (size !== sizes.at(sizes.length - 1))
		spacing[
			`fluid-${size}-${sizes.at(index + 1)}`
		] = `var(--space-${size}-${sizes.at(index + 1)})`;
});

// Set up typography scales
const fontSize = {}
for (let i = -2; i < 9; i++) {
	fontSize[i] = `var(--step-${i})`
}

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			spacing,
			fontSize,
		},
	},
	plugins: [
		plugin(function({ addBase, theme }) {
			addBase({
				'h1': { fontSize: theme('fontSize.6')}
			})
		})
	],
};
