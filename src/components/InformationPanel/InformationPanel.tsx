import { useState, useEffect } from 'react';
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';
import ResidentDetails from './ResidentDetails';


// TODO: Add transition for the different types of opens and closes for the dash board, eg: select/deselect resident and move panels up and down
// TODO: Maybe have a minimize button for the resident list
// TODO: Remove default scrollbar for the resident list
// TODO: Add a loading state for the resident list
export default function InformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
	const [selectedResident, setSelectedResident] = useState<Resident & ResidentAdditional | null>(null);
	
    const { getResidents } = useSupabase();
	
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

	// conditions for the panel cards
	const totalResidents = residents ? residents.length : 0;
	const averageAge = residents ? Math.round(
		residents.reduce((sum, resident) => {
			const birthDate = new Date(resident.dob);
			const today = new Date();
			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();
			
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return sum + age;
		}, 0) / residents.length
	) : 0;

    // Calculate days until next birthday
    const calculateDaysUntilBirthday = (dob: string) => {
        const today = new Date();
        const birthDate = new Date(dob);
        
        // Set this year's birthday
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        // If birthday has passed this year, calculate for next year
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        // Calculate difference in days
        const diffTime = nextBirthday.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    };
    return (
        <div className="flex-1 overflow-auto no-scrollbar bg-infopanel-bg border-l border-infopanel-border">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'> {/* Container for the panel cards */}
						{!selectedResident ? (
							<>
								<PanelCard title="Home Overview" condition={totalResidents} subTitle='Total Residents'/>
								<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>
							</>
						) : (
							<>
							{/* Hardcoded information for now | TODO: Add dynamic information from database */}
								<PanelCard 
									title={`Important Information`} 
									condition={"Allergies: Peanuts"} 
									subTitle='EpiPen stored in - Medicine Cabinet'
								/>
								<PanelCard 
									title="Birthday Countdown" 
									condition={calculateDaysUntilBirthday(selectedResident.dob)} 
										subTitle='Days'
								/>
							</>
						)
					}
					</div>

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