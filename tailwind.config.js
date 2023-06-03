const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

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
			...colors,
			"b-blue": "#BBE1FA",
			"b-blue-dark": "#1B262C",
			"b-mint": "#E1FFEE",
			"b-yellow": "#FFD966",
			"b-dark-gray": "#222222",
			"b-lavender": "#E6E6FA",
		},

		screens: {
			// prettier-ignore
			'xs': "475px",
			...defaultTheme.screens,
		},
		extend: {
			animation: {
				floater: "floater 7s infinite",
				"gradient-x": "gradient-x 15s ease infinite",
				"gradient-y": "gradient-y 15s ease infinite",
				"gradient-xy": "gradient-xy 15s ease infinite",
			},
			keyframes: {
				floater: {
					"0%": {
						transform: "translate(0px,0px) scale(1)",
					},
					"33%": {
						transform: "translate(30px, -50px) scale(1.1)",
					},
					"66%": {
						transform: "translate(-20px, 20px) scale(0.9)",
					},
					"100%": {
						transform: "translate(0px, 0px) scale(1)",
					},
				},
				"gradient-y": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "center top",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "center center",
					},
				},
				"gradient-x": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
				"gradient-xy": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
		},
	},
	plugins: [require("daisyui")],
}
