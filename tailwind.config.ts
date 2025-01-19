import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#1a1a1a',
					dark: '#fbbf24' // Dark mode'da primary renk
				},
				gray: {
					900: '#171717',
					800: '#262626',
					200: '#f3f4f6'
				}
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio],
	darkMode: 'class'
} satisfies Config;
