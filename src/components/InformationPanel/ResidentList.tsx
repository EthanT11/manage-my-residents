import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testStockImage from '@/assets/test-stock-img.jpg';
import { Resident } from '@/hooks/useSupabase';

interface ResidentListProps {
	residents: Resident[],
	setSelectedResident: (resident: Resident) => void
	selectedResident?: Resident | null
	clearSelectedResident?: () => void
}

function getInitials(name: [string, string]) {
	return name.map(n => n[0]).join('');
}

function handleSetResident({ resident, setSelectedResident }: { resident: Resident, setSelectedResident: (resident: Resident) => void }) {
	setSelectedResident(resident);
}

function ResidentTag( {resident, setSelectedResident}: {resident: Resident, setSelectedResident: (resident: Resident) => void} ) {
	const residentName = [resident.first_name, resident.last_name];
	return (
		<Card key={resident.id} className="cursor-pointer hover:bg-blue-50" onClick={() => handleSetResident({resident, setSelectedResident})}>
			<CardContent className="flex items-center p-4">
			<Avatar className="h-12 w-12 mr-4">
				<AvatarImage src={testStockImage} alt={residentName[0] + " " + residentName[1]} />
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

export default function ResidentList( {residents, setSelectedResident, selectedResident, clearSelectedResident}: ResidentListProps ) {
	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle 
					className={`text-blue-700 ${selectedResident ? 'cursor-pointer' : ''} `} 
					onClick={clearSelectedResident}
				>Resident List
				</CardTitle>
			</CardHeader>
			{!selectedResident ? (
				<CardContent>
					<div className="grid grid-flow-col sm:grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4 overflow-auto">
						{residents?.map((resident, index) => (
							<ResidentTag key={index} resident={resident} setSelectedResident={setSelectedResident} />
							// <p key={index}>{resident.first_name + " " + resident.last_name}</p>
						))}
					</div>
				</CardContent>
			) : (
				<div>

				</div>
			)}
		</Card>
	)
}