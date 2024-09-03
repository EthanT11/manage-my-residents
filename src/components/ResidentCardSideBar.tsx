import CardHeader from "./CardHeader"
import ResidentCard from "./ResidentCard"

interface ResidentCardSideBarProps { // type of the data prop
	data: {
		residents: {
			name: string,
			wing: string,
			room: string
		}[]
	}
}

export default function ResidentCardSideBar({data}: ResidentCardSideBarProps) {
	const leftWingResidents = data.residents.filter((resident) => resident.wing === "Left") // filter residents by wing
	const rightWingResidents = data.residents.filter((resident) => resident.wing === "Right")

	const listResidents = (residents: { name: string; wing: string; room: string }[]) => { // NOTE FOR ME: This started to look confusing the more i built on it, just remember to break it down
		return residents.map(({ name, wing, room }) => (								   // Takes in a list of residents and maps them to a ResidentCard component.
			<ResidentCard name={name} info={[wing, room]} />							   // { name: string; wing: string; room: string }[] is the type of the residents parameter
		))	                                                                               // square brackets at the end tell typescript that it is an array
	}
	return (									// TODO: Add check for screen size so the cards go to one column											                       // ask if there is a better way to sort them by wing or something else
		<div className="flex flex-col p-4">
			<CardHeader />
			<div className="flex bg-slate-500">
				<div className="flex flex-col">
					{listResidents(leftWingResidents)}
				</div>
				<div className="flex flex-col">
					{/* {listResidents(rightWingResidents)} */}
				</div>
			</div>
		</div>
	)
}