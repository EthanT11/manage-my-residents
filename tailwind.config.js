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

			'error-page': {
				'bg': 'hsl(var(--error-page-bg))',
				'text': 'hsl(var(--error-page-text))'
			},

			'auth-page': {
				'bg': 'hsl(var(--auth-page-bg))',
				'text': 'hsl(var(--auth-page-text))',
				'text-secondary': 'hsl(var(--auth-page-text-secondary))'
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
				'destructive': {
					'bg': 'var(--button-destructive-bg)',
					'border': 'var(--button-destructive-border)',
					'text': 'var(--button-destructive-text)',
					'hover': 'var(--button-destructive-hover)',
					'active': 'var(--button-destructive-active)',
				},
				'submit': {
					'bg': 'var(--button-submit-bg)',
					'border': 'var(--button-submit-border)',
					'text': 'var(--button-submit-text)',
					'hover': 'var(--button-submit-hover)',
					'active': 'var(--button-submit-active)',
				}
  			},

  			// Dropdown colors
  			'dropdown': {
  				'bg': 'var(--dropdown-bg)',
  				'border': 'var(--dropdown-border)',
  				'text': 'var(--dropdown-text)',
  				'hover': 'var(--dropdown-hover)',
  				'ring': 'var(--dropdown-ring)',
  			},

			// Calendar colors
			'calendar': {
				'bg': 'var(--calendar-bg)',
				'border': 'var(--calendar-border)',
				'text': 'var(--calendar-text)',
				'cell-disabled': 'var(--calendar-cell-disabled)',
				'dropdown': {
					'bg': 'var(--calendar-dropdown-bg)',
					'border': 'var(--calendar-dropdown-border)',
					'text': 'var(--calendar-dropdown-text)',
				},
			},

			// Resident Details colors
			'resident-details': {
				'bg': 'var(--resident-details-bg)',
				'border': 'var(--resident-details-border)',
				'title': 'var(--resident-details-title)',
				'text': 'var(--resident-details-text)',
				'section-title': 'var(--resident-details-section-title)',
				'section-bg': 'var(--resident-details-section-bg)',
			},

			// Profile colors
			'profile': {
				'bg': 'var(--profile-bg)',
				'border': 'var(--profile-border)',
				'title': 'var(--profile-title)',
				'text': 'var(--profile-text)',
			},

			// Dialog colors
			'dialog': {
				'bg': 'var(--dialog-bg)',
				'border': 'var(--dialog-border)',
				'title': 'var(--dialog-title)',
				'text': 'var(--dialog-text)',
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

