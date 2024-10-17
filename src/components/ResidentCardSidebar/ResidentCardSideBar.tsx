import  SideBarHeader  from "./SidebarHeader"
import { useState, useEffect } from "react"
import useSupabase, { Resident } from "@/hooks/useSupabase"
import NewResidentCard from "./NewResidentCard"

interface ResidentCardSideBarProps {
	onSelectResident: (resident: Resident) => void;
}

export default function ResidentCardSideBar( { onSelectResident }: ResidentCardSideBarProps ) {
	const [filter, setFilter] = useState<boolean>(false);
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
            <NewResidentCard
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
		<div className="flex flex-col p-4 h-full overflow-auto bg-gray-800">
			<SideBarHeader toggleFilter={{ filter, setFilter }} addResident={addResident} />
        	<div className="flex flex-1 bg-gray-700 shadow-lg rounded-lg justify-center overflow-auto">
				{filter ?
				<>
            		<div className="flex flex-row justify-between w-full ">
						<div className="flex flex-col m-2 w-1/2 bg-gray-600 p-4 rounded-lg shadow-md">
							{renderResidents(leftWingResidents)}
						</div>
						<div className="flex flex-col m-2 w-1/2 bg-gray-600 p-4 rounded-lg shadow-md">
							{renderResidents(rightWingResidents)}
						</div>
					</div>
				</>
				:
				<>
					<div className="flex flex-row justify-center w-full ">
						<div className="flex flex-col m-2 w-full bg-gray-600 p-4 rounded-lg shadow-md">
							{renderResidents(leftWingResidents.concat(rightWingResidents))}
						</div>
					</div>
				</>
				}
        	</div>
    	</div>
	)
}
// TODO: Fix card when name is too long