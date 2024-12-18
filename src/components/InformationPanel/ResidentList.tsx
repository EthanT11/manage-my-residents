import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { AddResDialog } from "./AddResDialog";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { Search } from "lucide-react";
import ResidentTag from "./ResidentTag";

interface ResidentListProps {
	residents: (Resident & ResidentAdditional)[],
	selectedResident?: (Resident & ResidentAdditional) | null
	setSelectedResident: Dispatch<SetStateAction<(Resident & ResidentAdditional) | null>>
	clearSelectedResident?: () => void
}

function handleAddRes( newResident: Omit<Resident, 'id'> ) {
	const { addResident } = useSupabase();
	console.log(`Adding Resident: ${newResident.first_name} ${newResident.last_name}`);
	addResident(newResident);
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