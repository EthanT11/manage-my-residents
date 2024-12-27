import { useEffect, useState } from 'react';
import { InformationPanel } from '../InformationPanel';
import { SideManager } from '../SideManager';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';
import { SidebarProvider } from "@/components/ui/sidebar"
import { InformationPanelHeader } from '../InformationPanel';

export default function Dashboard() {
  const { fetchUser } = useSupabase();
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    fetchUser().then(({ user }) => {
      if (!user) {
        console.log('User not found');
        navigate('/sign-in');
      }
    });
  }, [fetchUser, navigate]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    setIsHeaderVisible(currentScrollY === 0);
  };

  return (
    <>
      <SidebarProvider>
        <SideManager />
        <main 
          className="flex flex-col font-roboto h-screen w-screen overflow-auto"
          onScroll={handleScroll}
        >
          <div className='flex flex-col'>
            <InformationPanelHeader isVisible={isHeaderVisible} />
            <InformationPanel />
          </div>         
        </main>
      </SidebarProvider>
    </>
  );
};