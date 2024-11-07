import { useEffect } from 'react';
import { NewInformationPanel } from '../InformationPanel';
import { SideManager } from '../SideManager';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// TODO: Factor out the header into a separate component
// Make header opaque and sticky when scrolling down and maybe move the sidebar trigger from button to rail

export default function MainPage() {
  const { fetchUser } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then(({ user }) => {
      if (!user) {
        console.log('User not found');
        navigate('/sign-in');
      }
    });
  }, []);

  return (
    <>
      <SidebarProvider>
        <SideManager />
          <main className="flex flex-col font-roboto h-screen bg-gray-100">
            <div className='flex flex-col overflow-auto p-4'>
              <header className="bg-white shadow-sm">
                  <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <SidebarTrigger />
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">Home name here Dashboard</h2>
                  </div>
              </header>
              <NewInformationPanel />
            </div>         
          </main>
        </SidebarProvider>
    </>
  );
};