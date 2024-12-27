import './App.css'
import router from './Routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './contexts/AuthContext'
import { UserProvider } from './contexts/UserContext'
import { ResidentProvider } from './contexts/ResidentContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ResidentProvider>
            <RouterProvider router={router} />
          </ResidentProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
