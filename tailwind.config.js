/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	fontFamily: {
  		roboto: ['Roboto', 'sans-serif']
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// Base colors
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',

  			// UI Component colors
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},

  			// Chart colors
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},

  			// Sidebar colors
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			'sidebar-bg': 'var(--sidebar-bg)',
  			'sidebar-border': 'var(--sidebar-border)',
  			'sidebar-text': 'var(--sidebar-text)',
  			'sidebar-text-secondary': 'var(--sidebar-text-secondary)',
  			'sidebar-hover': 'var(--sidebar-hover)',

  			// Information Panel Header colors
  			'infoheader-bg': 'var(--infoheader-bg)',
  			'infoheader-border': 'var(--infoheader-border)',
  			'infoheader-text': 'var(--infoheader-text)',
  			'infoheader-text-secondary': 'var(--infoheader-text-secondary)',

  			// Information Panel colors
  			'infopanel-bg': 'var(--infopanel-bg)',
  			'infopanel-border': 'var(--infopanel-border)',
  			'infopanel-text': 'var(--infopanel-text)',
  			'infopanel-text-secondary': 'var(--infopanel-text-secondary)',
  			'infopanel-card': {
  				'bg': 'var(--infopanel-card-bg)',
  				'border': 'var(--infopanel-card-border)',
  				'title': 'var(--infopanel-card-title)',
  				'text': 'var(--infopanel-card-text)',
  			},
  		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	function ({ addUtilities }) {
		addUtilities({
		  '.no-scrollbar': {
			'-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
			'scrollbar-width': 'none',  /* Firefox */
		  },
		  '.no-scrollbar::-webkit-scrollbar': {
			'display': 'none',  /* Safari and Chrome */
		  },
		});
	  },
  ],
}

