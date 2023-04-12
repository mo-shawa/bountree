const { black, white, gray, green, blue } = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			transparent: "transparent",
			black,
			white,
			gray,
			green,
			blue,
			current: "currentColor",
			"b-blue": "#BBE1FA",
			"b-blue-dark": "#1B262C",
			"b-mint": "#E1FFEE",
			"b-yellow": "#FFD966",
			"b-dark-gray": "#222222",
		},
		extend: {},
	},
	plugins: [],
}
