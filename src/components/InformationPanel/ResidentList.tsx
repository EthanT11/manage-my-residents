import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddResDialog } from "../Dialogs";
import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import ResidentTag from "./ResidentTag";
import { useResidents } from "@/contexts/ResidentContext";
import LoadingSpinner from "../Common/LoadingSpinner";

function SearchBar({ searchQuery, setSearchQuery, children }: { 
	searchQuery: string, 
	setSearchQuery: (query: string) => void, 
	children: React.ReactNode 
}) {
	return (
		<div className="flex items-center space-x-2 theme-transition">
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search residents..."
					className="pl-9 pr-4 py-2 border border-search-border rounded-lg text-sm 
							 focus:outline-none focus:ring-2 focus:ring-search-ring 
							 bg-search-bg text-search-text w-64
							 placeholder:text-search-placeholder
							 theme-transition"
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

export default function ResidentList() {
	const { residents, selectedResident, setSelectedResident, addResident, isLoading } = useResidents();
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
			setSelectedResident(null);
			setIsExpanded(true);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	return (
		<Card className={`mt-6 border-resident-list-border bg-resident-list-bg
						 resident-list-transition
						 ${selectedResident ? 'max-h-[64px]' : 'max-h-[800px]'}`}>
			<CardHeader className="flex flex-row items-center justify-between pb-2 
								border-b border-resident-list-border">
				<div className="flex items-center space-x-2 cursor-pointer group"
					onClick={toggleExpanded}
				>
					<ChevronDown 
						className={`h-5 w-5 text-resident-tag-text theme-transition 
								${!isExpanded || selectedResident ? '-rotate-90' : ''} 
								group-hover:text-resident-tag-hover`}
					/>
					<CardTitle 
						className={`text-resident-tag-text group-hover:text-resident-tag-hover 
								theme-transition`}
					>
						Resident List
					</CardTitle>
					<span className="px-2 py-1 text-sm font-medium text-resident-tag-text 
								bg-resident-tag-hover rounded-full theme-transition">
						{searchQuery ? `${filteredResidents.length}/${residents.length}` : residents.length}
					</span>
				</div>
				{!selectedResident && (
					<> 	
						<p className="flex-1 text-center text-infopanel-text-secondary text-sm font-medium theme-transition">
							Select a resident to view their details
						</p>
						<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
							<AddResDialog addResident={addResident}/>
						</SearchBar> 
					</>
				)}
			</CardHeader>
			<div className={`resident-list-transition overflow-y-auto
							${isExpanded && !selectedResident ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
				{!selectedResident && (
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2">
							{filteredResidents.map((resident, index) => (
								<ResidentTag 
									key={index} 
									resident={resident} 
								/>
							))}
						</div>
						{filteredResidents.length === 0 && (
							<div className="text-center py-8 text-resident-tag-text">
								No residents found matching "{searchQuery}"
							</div>
						)}
						{isLoading && (
							<div className="text-center py-8 text-resident-tag-text">
								<LoadingSpinner size="lg" />
							</div>
						)}
					</CardContent>
				)}
			</div>
		</Card>
	);
}