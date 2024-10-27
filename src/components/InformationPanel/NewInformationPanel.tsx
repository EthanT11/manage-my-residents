import { useState, useEffect } from 'react';
import  useSupabase, { Resident }  from '@/hooks/useSupabase';
import PanelCard from './PanelCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testStockImage from '@/assets/test-stock-img.jpg';

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

	function getInitials(name: [string, string]) {
		return name.map(n => n[0]).join('');
	}
	
	function ResidentTag( {resident, setSelectedResident}: {resident: Resident, setSelectedResident: (resident: Resident) => void} ) {
		const residentName = [resident.first_name, resident.last_name];
		return (
				<Card key={resident.id} className="cursor-pointer hover:bg-blue-50" onClick={() => setSelectedResident(resident)}>
                    <CardContent className="flex items-center p-4">
					<Avatar className="h-12 w-12 mr-4">
                        <AvatarImage alt={residentName[0] + " " + residentName[1]} />
                        <AvatarFallback>{getInitials([resident.first_name, resident.last_name])}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-blue-700">{resident.first_name + " " + resident.last_name}</h3>
                        <p className="text-sm text-blue-600">Room {resident.room}</p>
                      </div>
                    </CardContent>
                  </Card>
		)
	}

    return (
        <div className="flex-1 overflow-auto">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">
                        Information Panel
                    </h2>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<PanelCard title="Resident Overview" condition={totalResidents} subTitle='Total Residents'/>
					<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>
					<Card className="mt-6">
						<CardHeader>
							<CardTitle className="text-blue-700">Resident List</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{residents?.map((resident, index) => (
									<ResidentTag key={index} resident={resident} setSelectedResident={setSelectedResident} />
									// <p key={index}>{resident.first_name + " " + resident.last_name}</p>
								))}
							</div>
						</CardContent>
					</Card>
                </div>
            </main>
        </div>
    );
}


// NOTES: 
// - max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 is a tailwindcss class that sets the max width of the container to 80rem, centers it, adds padding on the y-axis, and sets the padding on the x-axis for small and large screens