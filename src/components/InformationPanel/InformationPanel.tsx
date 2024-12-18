import { useState, useEffect } from 'react';
import  useSupabase, { Resident, ResidentAdditional }  from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import testStockImage from '@/assets/test-stock-img.jpg';

// TODO: Add transition for the different types of opens and closes for the dash board, eg: select/deselect resident and move panels up and down
// TODO: Maybe have a minimize button for the resident list
// TODO: find a way to get stock images for new resident cards

export default function InformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
	const [selectedResident, setSelectedResident] = useState<Resident & ResidentAdditional | null>(null);
	const selectedResidentName = selectedResident ? selectedResident.first_name + " " + selectedResident.last_name : '';
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
			dark:bg-infopanel-bg dark:border-infopanel-border
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
				{/* Selected Resident Information */}
				{selectedResident ? (
					<div className=''>
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="text-blue-700">Resident Details</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col md:flex-row">
									{/* Left side - Avatar and basic info */}
									<div className="flex items-start mb-6 md:mb-0 md:mr-8">
										<Avatar className="h-24 w-24 mr-6">
											<AvatarImage src={selectedResident.profile_picture_url} alt={selectedResident.first_name} />
											<AvatarFallback>{}</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="text-2xl font-semibold mb-2 text-blue-900">{selectedResidentName}</h3>
											<p className="mb-1 text-blue-700">Age: {selectedResident.age}</p>
											<p className="mb-1 text-blue-700">Room: {selectedResident.room}</p>
											<p className="mb-1 text-blue-700">Wing: {selectedResident.wing}</p>
										</div>
									</div>

									{/* Right side - Additional details */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
										<div>
											<h4 className="font-semibold text-blue-900 mb-2">Personal Information</h4>
											<p className="mb-1 text-blue-700">Date of Birth: {selectedResident.dob}</p>
											<p className="mb-1 text-blue-700">Gender: {selectedResident.gender}</p>
											<p className="mb-1 text-blue-700">Marital Status: {selectedResident.marital_status}</p>
											<p className="mb-1 text-blue-700">Diet: {selectedResident.diet}</p>
											<p className="mb-1 text-blue-700">Religion: {selectedResident.religion}</p>
											<p className="mb-1 text-blue-700">Weight: {selectedResident.weight}</p>
											<p className="mb-1 text-blue-700">Height: {selectedResident.height}</p>
											<p className="mb-1 text-blue-700">Hair Color: {selectedResident.hair}</p>
											<p className="mb-1 text-blue-700">Eye Color: {selectedResident.eye}</p>
										</div>
										<div>
											<h4 className="font-semibold text-blue-900 mb-2">Medical Information</h4>
											<p className="mb-1 text-blue-700">Level of Care: {selectedResident.level_of_care}</p>
											<p className="mb-1 text-blue-700">Allergies: {selectedResident.allergies || 'None'}</p>
											<p className="mb-1 text-blue-700">Mobility: {selectedResident.mobility}</p>
											<p className="mb-1 text-blue-700">Blood Type: {selectedResident.blood_type}</p>
											<p className="mb-1 text-blue-700">DNR Status: {selectedResident.dnr ? 'Yes' : 'No'}</p>
											<p className="mb-1 text-blue-700">Medications: {selectedResident.medications || 'None'}</p>
										</div>
										<div>
											<h4 className="font-semibold text-blue-900 mb-2">Emergency Contact</h4>
											<p className="mb-1 text-blue-700">Name: {selectedResident.emergency_contact_name}</p>
											<p className="mb-1 text-blue-700">Phone: {selectedResident.emergency_contact_phone}</p>
											<p className="mb-1 text-blue-700">Relationship: {selectedResident.emergency_contact_relationship}</p>
										</div>
										<div>
											<h4 className="font-semibold text-blue-900 mb-2">Additional Notes</h4>
											<p className="mb-1 text-blue-700 whitespace-pre-wrap">{selectedResident.notes || 'No additional notes'}</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				) : (
					<div>
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="text-blue-700">Resident Details - Select A Resident For Details</CardTitle>
							</CardHeader>
						</Card>
					</div>
				)}
            </div>
        </div>
    );
}