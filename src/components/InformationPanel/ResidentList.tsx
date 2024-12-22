import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { AddResDialog } from "../Dialogs";
import { Dispatch, SetStateAction, useState, useMemo, ReactNode } from "react";
import { Search, ChevronDown } from "lucide-react";
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
	const [isExpanded, setIsExpanded] = useState(true);

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

	const toggleExpanded = () => {
		if (selectedResident) {
			clearSelectedResident?.();
			setIsExpanded(true);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	return (
		<Card className={`mt-6 border-resident-list-border bg-resident-list-bg
						 transition-all duration-500 ease-in-out
						 ${selectedResident ? 'max-h-[64px]' : 'max-h-[800px]'}`}>
			<CardHeader className="flex flex-row items-center justify-between pb-2 
								border-b border-resident-list-border">
				<div 
					className="flex items-center space-x-2 cursor-pointer group"
					onClick={toggleExpanded}
				>
					<ChevronDown 
						className={`h-5 w-5 text-resident-tag-text transition-transform duration-200 
								${!isExpanded || selectedResident ? '-rotate-90' : ''} 
								group-hover:text-resident-tag-hover`}
					/>
					<CardTitle 
						className={`text-resident-tag-text group-hover:text-resident-tag-hover 
								transition-colors`}
					>
						Resident List
					</CardTitle>
					<span className="px-2 py-1 text-sm font-medium text-resident-tag-text 
								bg-resident-tag-hover rounded-full">
						{searchQuery ? `${filteredResidents.length}/${residents.length}` : residents.length}
					</span>
				</div>
				{!selectedResident && isExpanded ? 
					<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
						<AddResDialog addResident={handleAddRes}/>
					</SearchBar> 
				: null}
			</CardHeader>
			<div className={`transition-all duration-500 ease-in-out overflow-hidden
							${isExpanded && !selectedResident ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
				{!selectedResident && (
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2">
							{filteredResidents.map((resident, index) => (
								<ResidentTag 
									key={index} 
									resident={resident} 
									setSelectedResident={setSelectedResident} 
								/>
							))}
						</div>
						{filteredResidents.length === 0 && (
							<div className="text-center py-8 text-resident-tag-text/50">
								No residents found matching "{searchQuery}"
							</div>
						)}
					</CardContent>
				)}
			</div>
		</Card>
	)
}