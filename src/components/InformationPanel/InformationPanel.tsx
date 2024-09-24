import { Resident } from "@/hooks/useResidents"

interface InformationPanelProps {
	resident: Resident | null
}

export default function InformationPanel({ resident }: InformationPanelProps) {
	
	return (
		<div>
			{resident ? (
				<div>
					<h2>{resident.name}</h2>
					<p>{resident.age}</p>
					<p>Wing: {resident.wing}</p>
					<p>Room: {resident.room}</p>
				</div>
			) : (
				<p>Select a resident to view their information</p>
			)}
		</div>
	)
}