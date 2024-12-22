import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { AddResDialog } from "../Dialogs";
import { Dispatch, SetStateAction, useState, useMemo, ReactNode } from "react";
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

function SearchBar( {searchQuery, setSearchQuery, children}: {searchQuery: string, setSearchQuery: Dispatch<SetStateAction<string>>, children: ReactNode} ) {
	return (
		<div className="flex items-center space-x-2">
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search residents..."
					className="pl-9 pr-4 py-2 border border-search-border rounded-lg text-sm 
							 focus:outline-none focus:ring-2 focus:ring-search-ring 
							 bg-search-bg text-search-text w-64
							 placeholder:text-search-placeholder"
				/>
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-search-icon" />
				{searchQuery && (
					<button
						onClick={() => setSearchQuery("")}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 
								 text-search-icon hover:text-search-icon/50"
					>
						×
					</button>
				)}
			</div>
			{children}
		</div>
	);
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
		<Card className="mt-6 border-resident-list-border bg-resident-list-bg">
			<CardHeader className="flex flex-row items-center justify-between pb-2 
									border-b border-resident-list-border">
				<div className="flex items-center space-x-2">
					<CardTitle 
						className={`text-resident-tag-text 
									${selectedResident ? 'cursor-pointer hover:text-resident-tag-hover transition-colors' : ''}`} 
						onClick={clearSelectedResident}
					>
						Resident List
					</CardTitle>
					<span className="px-2 py-1 text-sm font-medium text-resident-tag-text bg-resident-tag-hover rounded-full">
						{searchQuery ? `${filteredResidents.length}/${residents.length}` : residents.length}
					</span>
				</div>
				{!selectedResident ? <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
					<AddResDialog addResident={handleAddRes}/>
				</SearchBar> : ""}

			</CardHeader>
			{!selectedResident ? (
				<CardContent className="pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
						{filteredResidents.map((resident, index) => (
							<ResidentTag key={index} resident={resident} setSelectedResident={setSelectedResident} />
						))}
					</div>
					{filteredResidents.length === 0 && (
						<div className="text-center py-8 text-resident-tag-text/50">
							No residents found matching "{searchQuery}"
						</div>
					)}
				</CardContent>
			) : null}
		</Card>
	)
}