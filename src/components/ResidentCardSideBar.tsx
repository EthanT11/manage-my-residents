import SideBarHeader from "./SidebarHeader"
import ResidentCard from "./ResidentCard"

interface ResidentCardSideBarProps { // type of the data prop
	data: {
		residents: {
			name: string,
			wing: string,
			room: string
		}[]
	},
	handleAddResident: () => void,
}

export default function ResidentCardSideBar({data, handleAddResident}: ResidentCardSideBarProps) {
	const leftWingResidents = data.residents.filter((resident) => resident.wing === "Left") // filter residents by wing
	const rightWingResidents = data.residents.filter((resident) => resident.wing === "Right")

	const listResidents = (residents: { name: string; wing: string; room: string }[]) => { // NOTE FOR ME: This started to look confusing the more i built on it, just remember to break it down
		return residents.map(({ name, wing, room }) => (							   // Takes in a list of residents and maps them to a ResidentCard component.
			<ResidentCard key={room} name={name} info={[wing, room]} />							   // { name: string; wing: string; room: string }[] is the type of the residents parameter
		))	                                                                               // square brackets at the end tell typescript that it is an array
	}

	const handleAddRes = () => { 
		console.log("Add Resident button clicked");
	}

	const handleEdit = () => {
		console.log("Edit button clicked");
	}


		// TODO: Add check for screen size so the cards go to one column
	return (																			   // TODO: Add check for screen size so the cards go to one column											                       // ask if there is a better way to sort them by wing or something else
		<div className="flex flex-col p-4">
			<SideBarHeader handleAddResident={handleAddRes}/>
			<div className="flex flex-1 bg-slate-500 justify-center">
				<div className="flex flex-col">
					{listResidents(leftWingResidents)}
				</div>
				<div className="flex flex-col">
					{listResidents(rightWingResidents)}
				</div>
			</div>
		</div>
	)
}