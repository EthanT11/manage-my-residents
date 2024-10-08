import  SideBarHeader  from "./SidebarHeader"
import ResidentCard from "./ResidentCard"
import { useState, useEffect } from "react"
import useResidents, { Resident } from "@/hooks/useResidents"

interface ResidentCardSideBarProps {
	onSelectResident: (resident: Resident) => void;
}

export default function ResidentCardSideBar( { onSelectResident }: ResidentCardSideBarProps ) {
	const { residents, addResident, deleteResident } = useResidents() // get the addResident function from the useResidents hook
	const [leftWingResidents, setLeftWingResidents] = useState<Resident[]>([]) // set up state for left wing residents
	const [rightWingResidents, setRightWingResidents] = useState<Resident[]>([]) // set up state for right wing residents
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

	useEffect(() => {
		setLeftWingResidents(residents.filter((resident: Resident) => resident.wing === "Left"));
		setRightWingResidents(residents.filter((resident: Resident) => resident.wing === "Right"));
	}, [residents]);

	const handleCardSelection = (id: number) => {
		setSelectedCardId(prevSelectedCardId => prevSelectedCardId === id ? null : id);
		onSelectResident(residents.find(resident => resident.id === id) as Resident);
	}

	const listResidents = (residents: Resident[]) => { 
		return residents.map(({ id, name, wing, room }) => (							  
			<ResidentCard key={id} id={id} name={name} info={[wing, room]}
						  isSelected={selectedCardId === id} setisSelected={handleCardSelection} 
				          deleteCard={() => deleteResident(id)} 
			/>							   
		))	                                                                             
	}
																				
	return (
		<div className="flex flex-col p-4 h-full overflow-auto">
			<SideBarHeader addResident={addResident}/>
			<div className="flex flex-1 bg-slate-500 justify-center overflow-auto">
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