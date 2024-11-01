import { useState, useEffect } from 'react';
import  useSupabase, { Resident }  from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testStockImage from '@/assets/test-stock-img.jpg';

// TODO: Add transition for the different types of opens and closes for the dash board, eg: select/deselect resident and move panels up and down
// TODO: Maybe have a minimize button for the resident list
// TODO: find a way to get stock images for new resident cards


export default function NewInformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
	const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
	const selectedResidentName = selectedResident ? selectedResident.first_name + " " + selectedResident.last_name : '';
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

	function clearSelectedResident() {
		setSelectedResident(null);
	}

    return (
        <div className="flex-1 overflow-auto">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">
                        Information Panel
                    </h2>
					<button onClick={clearSelectedResident}>
						*Deselect*
					</button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> {/* Container for the main content */}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'> {/* Container for the panel cards */}
					<PanelCard title="Resident Overview" condition={totalResidents} subTitle='Total Residents'/>
					<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>		
				</div>
				<div>
					<ResidentList residents={residents || []} setSelectedResident={setSelectedResident} selectedResident={selectedResident} clearSelectedResident={clearSelectedResident}/>
				</div>
	
				{/* Selected Resident Information */}
				{selectedResident ? (
					<div>
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="text-blue-700">Resident Details</CardTitle>
							</CardHeader>
							<CardContent className="flex items-start">
								<Avatar className="h-24 w-24 mr-6">
								 <AvatarImage src={testStockImage} alt={selectedResident.first_name} />
								<AvatarFallback>{}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-2xl font-semibold mb-2 text-blue-900">{selectedResidentName}</h3>
									<p className="mb-1 text-blue-700">Age: {selectedResident.age}</p>
									<p className="mb-1 text-blue-700">Room: {selectedResident.room}</p>
									<p className="mb-1 text-blue-700">Room: {selectedResident.wing}</p>
								 </div>
							</CardContent>
						</Card>
					</div>
				) : (
					<div>

					</div>
				)}
            </main>
        </div>
    );
}


// NOTES: 
// - max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 is a tailwindcss class that sets the max width of the container to 80rem, centers it, adds padding on the y-axis, and sets the padding on the x-axis for small and large screens