import { useEffect, useState } from 'react';
import { NewInformationPanel } from '../InformationPanel';
import { SideManager } from '../SideManager';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';
import { SidebarTrigger } from "@/components/ui/sidebar"

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
    <div className="flex flex-col font-roboto h-screen bg-gray-100"> {/* Container for the entire page */}
      <div className="flex flex-1 shadow-lg h-full overflow-auto">
        <div className="flex">
          <SideManager />
        </div>
        <div className='flex flex-col overflow-auto p-4 w-3/4'>
          <NewInformationPanel />
        </div>
      </div>
    </div>
  );
};