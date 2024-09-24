import { useState } from 'react';
import TopNavBar from '../Common/TopNavBar';
import { ResidentCardSideBar } from '../ResidentCardSidebar';
import { InformationPanel } from '../InformationPanel';
import useResidents, { Resident } from '@/hooks/useResidents';

export default function MainPage() {
  const { residents } = useResidents();
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  
  const handleResidentSelect = (resident: Resident) => {
    setSelectedResident(resident);
  }

  return (
    <div className="flex flex-col font-roboto h-screen"> {/* Container for the entire page */}
      <TopNavBar />
      <div className="flex flex-1 shadow-lg"> {/* Container for entire dashboard under main nav bar */}
        <div className='flex-1 w-1/3 bg-white'> {/* Container for ResidentSideBar */}
          <ResidentCardSideBar onSelectResident={handleResidentSelect}/>
        </div>
        <div className='w-2/3 flex flex-col p-4'> {/* Container for right side of dashboard */}
          <div className='bg-slate-500 flex-1'>
            <InformationPanel resident={selectedResident}/>
          </div>
          <div className='bg-slate-400 flex-1'>
            <p>Some other content</p>
          </div>
        </div>
      </div>
    </div>
  );
};