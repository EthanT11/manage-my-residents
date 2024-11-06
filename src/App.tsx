import './App.css'
import { useState, useEffect } from 'react'
import { supabase, Session } from './supabaseClient' // bring in Session type | Note: look into the other different types from index.ts in the supabaseClient folder
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

// TODO: move session
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideManager } from './components/SideManager'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: Session) => { // fetch current session and set in state
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event: any, session: Session) => { // listen for auth state changes
      setSession(session)
    })
  }, [])

  return (
    <>
      <SidebarProvider >
        <RouterProvider router={router} />
        <SideManager />
      </SidebarProvider>
    </>
    // <div>
    //   {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
    //   {!session ? <Auth /> : <MainPage />}
    // </div>
  )
}

export default App
