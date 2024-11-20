import { useEffect } from 'react';
import { InformationPanel } from '../InformationPanel';
import { SideManager } from '../SideManager';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function MainPage() {
  const { fetchUser } = useSupabase();
  const navigate = useNavigate();

  // TODO: Reenable when i have internet lol...
  // useEffect(() => {
  //   fetchUser().then(({ user }) => {
  //     if (!user) {
  //       console.log('User not found');
  //       navigate('/sign-in');
  //     }
  //   });
  // }, [fetchUser, navigate]);

  return (
    <>
      <SidebarProvider>
        <SideManager />
          <main className="flex flex-col font-roboto h-screen w-screen bg-gray-100 overflow-auto">
            <div className='flex flex-col overflow-auto p-4'>
              <header className="bg-white shadow-sm">
                  <div className="max-w-7xl py-4 px-4 sm:px-6 lg:px-8 flex items-center">
                    <div className='flex flex-1'>
                      <SidebarTrigger className='hover:bg-gray-200'/>
                    </div>
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">Home name here Dashboard</h2>
                  </div>
              </header>
              <InformationPanel />
            </div>         
          </main>
        </SidebarProvider>
    </>
  );
};