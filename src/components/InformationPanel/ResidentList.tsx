import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { AddResDialog } from "../ResidentCardSidebar/AddResDialog";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { Search } from "lucide-react";

interface ResidentListProps {
	residents: (Resident & ResidentAdditional)[],
	selectedResident?: (Resident & ResidentAdditional) | null
	setSelectedResident: Dispatch<SetStateAction<(Resident & ResidentAdditional) | null>>
	clearSelectedResident?: () => void
}
interface ResidentTagProps {
	resident: Resident & ResidentAdditional
	setSelectedResident: Dispatch<SetStateAction<(Resident & ResidentAdditional) | null>>
}

function getInitials(name: [string, string]) {
	return name.map(n => n[0]).join('');
}

function handleAddRes( newResident: Omit<Resident, 'id'> ) {
	const { addResident } = useSupabase();
	console.log(`Adding Resident: ${newResident.first_name} ${newResident.last_name}`);
	addResident(newResident);
}


function ResidentTag( {resident, setSelectedResident}: ResidentTagProps ) {
	const residentName = [resident.first_name, resident.last_name];

	const handleSetResident = () => {
		setSelectedResident(resident as Resident & ResidentAdditional);
	}

	return (
		<Card 
			key={resident.id} 
			className="cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:shadow-lg w-72 border border-blue-100"
			onClick={handleSetResident}
		>
			<CardContent className="flex items-center p-4 space-x-4">
				<Avatar className="h-14 w-14 ring-2 ring-blue-100">
					<AvatarImage src={resident.profile_picture_url} alt={residentName[0] + " " + residentName[1]} />
					<AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
						{getInitials([resident.first_name, resident.last_name])}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-blue-900 truncate">
						{resident.first_name + " " + resident.last_name}
					</h3>
					<div className="flex items-center mt-1 space-x-2">
						<span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
							Room {resident.room}
						</span>
						<span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
							{resident.wing} Wing
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default function ResidentList( {residents, setSelectedResident, selectedResident, clearSelectedResident}: ResidentListProps ) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredResidents = useMemo(() => {
		return residents.filter(resident => {
			const searchLower = searchQuery.toLowerCase();
			return (
				resident.first_name.toLowerCase().includes(searchLower) ||
				resident.last_name.toLowerCase().includes(searchLower) ||
				resident.room.toLowerCase().includes(searchLower) ||
				resident.wing.toLowerCase().includes(searchLower)
			);
		});
	}, [residents, searchQuery]);

	return (
		<Card className="mt-6 border-blue-100">
			<CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-blue-100">
				<div className="flex items-center space-x-2">
					<CardTitle 
						className={`text-blue-900 ${selectedResident ? 'cursor-pointer hover:text-blue-700 transition-colors' : ''}`} 
						onClick={clearSelectedResident}
					>
						Resident List
					</CardTitle>
					<span className="px-2 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
						{searchQuery ? `${filteredResidents.length}/${residents.length}` : residents.length}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="relative">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search residents..."
							className="pl-9 pr-4 py-2 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
							>
								×
							</button>
						)}
					</div>
					<AddResDialog addResident={handleAddRes}/>
				</div>
			</CardHeader>
			{!selectedResident ? (
				<CardContent className="pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
						{filteredResidents.map((resident, index) => (
							<ResidentTag key={index} resident={resident} setSelectedResident={setSelectedResident} />
						))}
					</div>
					{filteredResidents.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							No residents found matching "{searchQuery}"
						</div>
					)}
				</CardContent>
			) : null}
		</Card>
	)
}