import { useEffect } from 'react';
import { InformationPanel } from '../InformationPanel';
import { SideManager } from '../SideManager';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';
import { SidebarProvider } from "@/components/ui/sidebar"
import { InformationPanelHeader } from '../InformationPanel';

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
  }, [fetchUser, navigate]);

  return (
    <>
      <SidebarProvider>
        <SideManager />
          <main className="flex flex-col font-roboto h-screen w-screen bg-gray-100 dark:bg-gray-900 overflow-auto">
            <div className='flex flex-col overflow-auto p-4'>
              <InformationPanelHeader />
              <InformationPanel />
            </div>         
          </main>
        </SidebarProvider>
    </>
  );
};