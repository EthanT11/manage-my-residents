import SideBarHeader from "./SidebarHeader"
import ResidentCard from "./ResidentCard"
import { useState, useEffect } from "react"
import useResidents from "@/hooks/useResidents"
import CardHeaderButton from "./CardHeaderButton"

interface Resident {
	name: string;
	age: string;
	wing: string;
	room: string;
}

export default function ResidentCardSideBar() {
	const { residents, addResident } = useResidents() // get the addResident function from the useResidents hook
	const [leftWingResidents, setLeftWingResidents] = useState<Resident[]>([]) // set up state for left wing residents
	const [rightWingResidents, setRightWingResidents] = useState<Resident[]>([]) // set up state for right wing residents

	useEffect(() => {
		console.log("Residents!!!!: ", residents);
		setLeftWingResidents(residents.filter((resident: Resident) => resident.wing === "Left"));
		setRightWingResidents(residents.filter((resident: Resident) => resident.wing === "Right"));
	  }, [residents]);
	
	const listResidents = (residents: { name: string; wing: string; room: string }[]) => { // NOTE FOR ME: This started to look confusing the more i built on it, just remember to break it down
		return residents.map(({ name, wing, room }) => (							   // Takes in a list of residents and maps them to a ResidentCard component.
			<ResidentCard key={room} name={name} info={[wing, room]} />							   // { name: string; wing: string; room: string }[] is the type of the residents parameter
		))	                                                                               // square brackets at the end tell typescript that it is an array
	}
																							// TODO: Add check for screen size so the cards go to one column
	return (																			   // TODO: Add check for screen size so the cards go to one column											                       // ask if there is a better way to sort them by wing or something else
		<div className="flex flex-col p-4">
			<SideBarHeader addResident={addResident}/>
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