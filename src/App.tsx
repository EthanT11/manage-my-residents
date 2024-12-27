import './App.css'
import router from './Routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './contexts/AuthContext'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
