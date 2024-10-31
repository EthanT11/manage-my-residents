import { useState, useEffect } from 'react';
import  useSupabase, { Resident }  from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';

export default function NewInformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
	const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
    const { getResidents } = useSupabase();
	// conditions for the panel cards
	const totalResidents = residents ? residents.length : 0;
	const averageAge = residents ? residents.reduce((acc, curr) => acc + curr.age, 0) / residents.length : 0;
	
    useEffect(() => {
		async function fetchResidents() {
			const residentsData = await getResidents();
            setResidents(residentsData);
        }
        fetchResidents();
    }, []); // add getResidents to the dependency array | removed for now to stop all the calls


    return (
        <div className="flex-1 overflow-auto">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">
                        Information Panel
                    </h2>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> {/* Container for the main content */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'> {/* Container for the panel cards */}
					<PanelCard title="Resident Overview" condition={totalResidents} subTitle='Total Residents'/>
					<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>		
                </div>
				<div>
                    <ResidentList residents={residents || []} setSelectedResident={setSelectedResident}/>
				</div>
            </main>
        </div>
    );
}


// NOTES: 
// - max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 is a tailwindcss class that sets the max width of the container to 80rem, centers it, adds padding on the y-axis, and sets the padding on the x-axis for small and large screens