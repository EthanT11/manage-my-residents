import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Session } from '@supabase/supabase-js'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

// TODO: implement authentication
function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { // fetch current session and set in state
      console.log('session: ', session)
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event: any, session: Session | null) => { // listen for auth state changes
      setSession(session)
    })
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
    // <div>
    //   {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
    //   {!session ? <Auth /> : <MainPage />}
    // </div>
  )
}

export default App
