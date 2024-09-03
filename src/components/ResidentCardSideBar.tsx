import CardHeader from "./CardHeader"
import ResidentCard from "./ResidentCard"

// TODO: ask if there is a better way to do this?
interface ResidentCardSideBarProps {
	data: {
		residents: {
			name: string,
			wing: string,
			room: string
		}[]
	}
}

export default function ResidentCardSideBar({data}: ResidentCardSideBarProps) {
	const listDummyCards = data.residents.map((resident) => 
		<ResidentCard name={resident.name} info={[resident.wing, resident.room]}/>
	)
	return (
		<div className="flex flex-col p-4">
				<CardHeader />
				<div className="grid grid-cols-2">
					{listDummyCards}
				</div>
		</div>
	)
}