const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			...colors,
			'b-blue': '#BBE1FA',
			'b-blue-dark': '#1B262C',
			'b-mint': '#E1FFEE',
			'b-yellow': '#FFD966',
			'b-dark-gray': '#222222',
			'b-lavender': '#E6E6FA',
		},

		screens: {
			// prettier-ignore
			'xs': "475px",
			...defaultTheme.screens,
		},
		extend: {
			animation: {
				floater: 'floater 7s infinite',
			},
			keyframes: {
				floater: {
					'0%': {
						transform: 'translate(0px,0px) scale(1)',
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)',
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)',
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
				},
			},
		},
	},
	plugins: [require('daisyui')],
}
