import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { AddResDialog } from "../ResidentCardSidebar/AddResDialog";
import { Dispatch, SetStateAction } from "react";
// import testStockImage from '@/assets/test-stock-img.jpg';

interface ResidentListProps {
	residents: (Resident & ResidentAdditional)[],
	selectedResident?: (Resident & ResidentAdditional) | null
	setSelectedResident: Dispatch<SetStateAction<(Resident & ResidentAdditional) | null>>
	clearSelectedResident?: () => void
}

function getInitials(name: [string, string]) {
	return name.map(n => n[0]).join('');
}

function handleAddRes( newResident: Omit<Resident, 'id'> ) {
	const { addResident } = useSupabase();
	console.log(`Adding Resident: ${newResident.first_name} ${newResident.last_name}`);
	addResident(newResident);
	// TODO: Will have to setup bucket for images for residents
	// Probably keep in the same one as "users"
}

interface ResidentTagProps {
	resident: Resident & ResidentAdditional
	setSelectedResident: Dispatch<SetStateAction<(Resident & ResidentAdditional) | null>>
}

function ResidentTag( {resident, setSelectedResident}: ResidentTagProps ) {
	const residentName = [resident.first_name, resident.last_name];

	const handleSetResident = () => {
		setSelectedResident(resident as Resident & ResidentAdditional);
	}

	return (
		<Card key={resident.id} className="cursor-pointer hover:bg-blue-50 w-64" onClick={handleSetResident}>
			<CardContent className="flex items-center p-4">
				<Avatar className="h-12 w-12 mr-4">
					<AvatarImage src={resident.profile_picture_url} alt={residentName[0] + " " + residentName[1]} />
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


// TODO: Add way to change resident list for number of rows | filter
export default function ResidentList( {residents, setSelectedResident, selectedResident, clearSelectedResident}: ResidentListProps ) {
	

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle 
					className={`text-blue-700 ${selectedResident ? 'cursor-pointer' : ''} `} 
					onClick={clearSelectedResident}
					>
					Resident List
				</CardTitle>
				<div>
				<AddResDialog addResident={handleAddRes}/>
				{/* <button>Filter</button> */}
				</div>
			</CardHeader>
			{!selectedResident ? (
				<CardContent>
					<div className="grid grid-flow-col sm:grid-rows-1 md:grid-rows-2 lg:grid-rows-2 gap-4 overflow-auto">
						{residents?.map((resident, index) => (
							<ResidentTag key={index} resident={resident} setSelectedResident={setSelectedResident} />
						))}
					</div>
				</CardContent>
			) : (
				<div></div>
			)}
		</Card>
	)
}