import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'
import { ThemeProvider } from './hooks/useTheme'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
