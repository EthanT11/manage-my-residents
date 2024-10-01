import { useEffect, useState } from 'react';
import TopNavBar from '../Common/TopNavBar';
import { ResidentCardSideBar } from '../ResidentCardSidebar';
import { InformationPanel } from '../InformationPanel';
import { Resident } from '@/hooks/useResidents';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';

export default function MainPage() {
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const { fetchUser } = useSupabase();
  const navigate = useNavigate();
  
  const handleResidentSelect = (resident: Resident) => {
    setSelectedResident(resident);
  }

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
      <TopNavBar />
      <div className="flex flex-1 shadow-lg h-full overflow-auto"> {/* Container for entire dashboard under main nav bar */}
        <div className='flex-1 w-1/3 h-full overflow-auto'> {/* Container for ResidentSideBar */}
          <ResidentCardSideBar onSelectResident={handleResidentSelect} />
        </div>
        <div className='w-2/3 flex flex-col p-4'> {/* Container for right side of dashboard */}
            <InformationPanel resident={selectedResident}/>
          <div className='bg-slate-400 flex-1'>
            <p>Some other content</p>
          </div>
        </div>
      </div>
    </div>
  );
};