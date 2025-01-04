import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Resident, ResidentAdditional } from "@/contexts/ResidentContext"
import { useResidents } from "@/contexts/ResidentContext"

interface ResidentTagProps {
	resident: Resident & ResidentAdditional;
}

function getInitials(name: [string, string]) {
	return name.map(n => n[0]).join('');
}

export default function ResidentTag({ resident }: ResidentTagProps) {
	const { setSelectedResident } = useResidents();
	const residentName = [resident.first_name, resident.last_name];

	return (
		<Card 
			key={resident.id} 
			className="cursor-pointer w-72
					 hover:bg-resident-tag-hover 
					 border border-resident-tag-border bg-resident-tag-bg
					 theme-transition"
			onClick={() => setSelectedResident(resident)}
		>
			<CardContent className="flex items-center p-4 space-x-4">
				<Avatar className="h-14 w-14 ring-2 ring-resident-tag-border theme-transition">
					<AvatarImage src={resident.profile_picture_url} alt={residentName[0] + " " + residentName[1]} />
					<AvatarFallback className="bg-resident-tag-hover text-resident-tag-text font-medium theme-transition">
						{getInitials([resident.first_name, resident.last_name])}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-resident-tag-text truncate theme-transition">
						{resident.first_name + " " + resident.last_name}
					</h3>
					<div className="flex items-center mt-1 space-x-2 theme-transition">
						<span className="px-2 py-1 text-xs font-medium text-resident-tag-text bg-resident-tag-hover rounded-full theme-transition">
							Room {resident.room}
						</span>
						<span className="px-2 py-1 text-xs font-medium text-resident-tag-text bg-resident-tag-hover rounded-full theme-transition">
							{resident.wing} Wing
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}