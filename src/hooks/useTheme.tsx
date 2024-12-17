import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' // TODO: Maybe add more themes later | Not so much style but more accessibility

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Creates a context for the theme, self explanatory but it's a way to pass the theme state and toggle function to the components that need it
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Creates a provider for the theme, basically a wrapper for the theme context
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as Theme) || 'light'
  })

  // Updates the theme of the app when the theme state changes
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Toggles the theme of the app | Right now it's on the Settings Button on the SideManager
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 