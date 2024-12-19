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
			// Page colors
			'page': {
				'light': 'hsl(var(--light-page-bg))',
				'dark': 'hsl(var(--dark-page-bg))'
			},

  			'sidebar': {
  				'bg': 'var(--sidebar-bg)',
  				'border': 'var(--sidebar-border)',
  				'text': 'var(--sidebar-text)',
  				'text-secondary': 'var(--sidebar-text-secondary)',
  				'hover': 'var(--sidebar-hover)',
  			},

  			// Information Panel Header colors
  			'infoheader': {
  				'bg': 'var(--infoheader-bg)',
  				'border': 'var(--infoheader-border)',
  				'text': 'var(--infoheader-text)',
  				'text-secondary': 'var(--infoheader-text-secondary)',
  			},

  			// Information Panel colors
  			'infopanel': {
  				'bg': 'var(--infopanel-bg)',
  				'border': 'var(--infopanel-border)',
  				'text': 'var(--infopanel-text)',
  				'text-secondary': 'var(--infopanel-text-secondary)',
  				'card': {
  					'bg': 'var(--infopanel-card-bg)',
  					'border': 'var(--infopanel-card-border)',
  					'title': 'var(--infopanel-card-title)',
  					'text': 'var(--infopanel-card-text)',
  				},
			},

  			// Resident List/Tag colors
  			'resident-list': {
  				'bg': 'var(--resident-list-bg)',
  				'border': 'var(--resident-list-border)',
  			},
  			'resident-tag': {
  				'bg': 'var(--resident-tag-bg)',
  				'border': 'var(--resident-tag-border)',
  				'text': 'var(--resident-tag-text)',
  				'hover': 'var(--resident-tag-hover)',
  				'selected': 'var(--resident-tag-selected)',
  			},

  			// Search Bar colors
  			'search': {
  				'bg': 'var(--search-bg)',
  				'border': 'var(--search-border)',
  				'text': 'var(--search-text)',
  				'placeholder': 'var(--search-placeholder)',
  				'icon': 'var(--search-icon)',
  				'ring': 'var(--search-ring)',
  			},

  			// Custom Button colors
  			'button': {
  				'bg': 'var(--button-bg)',
  				'border': 'var(--button-border)',
  				'text': 'var(--button-text)',
  				'hover': 'var(--button-hover)',
  				'active': 'var(--button-active)',
  			},

  			// Dropdown colors
  			'dropdown': {
  				'bg': 'var(--dropdown-bg)',
  				'border': 'var(--dropdown-border)',
  				'text': 'var(--dropdown-text)',
  				'hover': 'var(--dropdown-hover)',
  				'ring': 'var(--dropdown-ring)',
  			},

			// TODO: Calendar colors

			// Resident Details colors
			'resident-details': {
				'bg': 'var(--resident-details-bg)',
				'border': 'var(--resident-details-border)',
				'title': 'var(--resident-details-title)',
				'text': 'var(--resident-details-text)',
				'section-title': 'var(--resident-details-section-title)',
				'section-bg': 'var(--resident-details-section-bg)',
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

