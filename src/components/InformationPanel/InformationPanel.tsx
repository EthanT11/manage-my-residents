import { useState, useEffect } from 'react';
import  useSupabase, { Resident, ResidentAdditional }  from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';
import ResidentDetails from './ResidentDetails';

// import testStockImage from '@/assets/test-stock-img.jpg';

// TODO: Add transition for the different types of opens and closes for the dash board, eg: select/deselect resident and move panels up and down
// TODO: Maybe have a minimize button for the resident list
// TODO: find a way to get stock images for new resident cards
// TODO: Remove default scrollbar for the resident list

export default function InformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
	const [selectedResident, setSelectedResident] = useState<Resident & ResidentAdditional | null>(null);
    const { getResidents } = useSupabase();
	// conditions for the panel cards
	const totalResidents = residents ? residents.length : 0;
	const averageAge = 0 // residents ? residents.reduce((acc, curr) => acc + curr.age, 0) / residents.length : 0; // fix this since will be using dob yyyy/mm/dd
	
    useEffect(() => {
		async function fetchResidents() {
			const residentsData = await getResidents();
            setResidents(residentsData || null);
        }
        fetchResidents();
    }, []);

	function clearSelectedResident() {
		setSelectedResident(null);
	}

    return (
        <div className="
			flex-1 overflow-auto no-scrollbar 
			bg-infopanel-bg border-l border-infopanel-border
		">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 "> {/* Container for the main content */}
				{!selectedResident ? (
					<>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'> {/* Container for the panel cards */}
							<PanelCard title="Home Overview" condition={totalResidents} subTitle='Total Residents'/>
							<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>
						</div>
					</>
				) : (
					<>
					{/* TODO: Add Panel Cards for selected Resident*/}
					</>
				)}
					<div>
						<ResidentList 
							residents={residents || ([] as (Resident & ResidentAdditional)[])} 
							setSelectedResident={setSelectedResident} 
							selectedResident={selectedResident} 
							clearSelectedResident={clearSelectedResident}
						/>
					</div>
				<ResidentDetails selectedResident={selectedResident} />
            </div>
        </div>
    );
}