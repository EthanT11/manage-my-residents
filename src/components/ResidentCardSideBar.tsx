import SideBarHeader from "./SidebarHeader"
import ResidentCard from "./ResidentCard"
import { useState, useEffect } from "react"
import useResidents from "@/hooks/useResidents"

interface Resident {
	id: number;
	name: string;
	age: string;
	wing: string;
	room: string;
}

export default function ResidentCardSideBar() {
	const { residents, addResident } = useResidents() // get the addResident function from the useResidents hook
	const [leftWingResidents, setLeftWingResidents] = useState<Resident[]>([]) // set up state for left wing residents
	const [rightWingResidents, setRightWingResidents] = useState<Resident[]>([]) // set up state for right wing residents
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
	console.log(selectedCardId)

	useEffect(() => {
		setLeftWingResidents(residents.filter((resident: Resident) => resident.wing === "Left"));
		setRightWingResidents(residents.filter((resident: Resident) => resident.wing === "Right"));
	  }, [residents]);
	
	const deleteCard = () => { // take in id and delete the card with that id
		console.log("Delete card");
	}

	const listResidents = (residents: Resident[]) => { 
		return residents.map(({ id, name, wing, room }) => (							  
			<ResidentCard key={id} id={id} name={name} info={[wing, room]} isSelected={selectedCardId === id} setisSelected={setSelectedCardId} deleteCard={deleteCard} />							   
		))	                                                                             
	}

																							
	return (
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