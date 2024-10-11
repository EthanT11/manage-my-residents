import  SideBarHeader  from "./SidebarHeader"
import ResidentCard from "./ResidentCard"
import { useState, useEffect } from "react"
// import useResidents, { Resident } from "@/hooks/useResidents"
import useSupabase, { Resident } from "@/hooks/useSupabase"

interface ResidentCardSideBarProps {
	onSelectResident: (resident: Resident) => void;
}

export default function ResidentCardSideBar( { onSelectResident }: ResidentCardSideBarProps ) {
	// const { residents, addResident, deleteResident } = useResidents() // get the addResident function from the useResidents hook
	const [leftWingResidents, setLeftWingResidents] = useState<Resident[]>([]) // set up state for left wing residents
	const [rightWingResidents, setRightWingResidents] = useState<Resident[]>([]) // set up state for right wing residents
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
	const { getResidents, addResident, removeResident } = useSupabase()
	
	useEffect(() => {
		const fetchData = async () => {
			const resData = await getResidents()
			if (resData) {
				setLeftWingResidents(resData.filter((resident: Resident) => resident.wing === "Left"));
				setRightWingResidents(resData.filter((resident: Resident) => resident.wing === "Right"));
			};
		};
		fetchData();

	}, []);
	
	const handleCardSelection = (id: string) => {
		setSelectedCardId((prevSelectedCardId) => (prevSelectedCardId === id ? null : id)); //
		onSelectResident(leftWingResidents.concat(rightWingResidents).find((resident) => resident.id === id) as Resident);
	}

	const renderResidents = (residents: Resident[]) => {
        return residents.map(({ id, first_name, last_name, wing, room }) => (
            <ResidentCard
                key={id}
                id={id}
                name={[first_name, last_name]}
                info={[wing, room]}
                isSelected={selectedCardId === id}
                setisSelected={handleCardSelection}
				deleteCard={() => id && removeResident(id)}
            />
        ));
    };
																				
	return (
		<div className="flex flex-col p-4 h-full overflow-auto">
			<SideBarHeader addResident={addResident}/>
			<div className="flex flex-1 bg-slate-500 justify-center overflow-auto">
				<div className="flex flex-col">
					{renderResidents(leftWingResidents)}
				</div>
				<div className="flex flex-col">
					{renderResidents(rightWingResidents)}
				</div>
			</div>
		</div>
	)
}