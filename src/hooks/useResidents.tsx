import { useState } from 'react';

export interface Resident { // Exporting the interface so that it can be used in other files and stop redefining it
	id: number;
	name: string;
	age: string;
	wing: string;
	room: string;
}


const data: Resident[] = [
{
	id: 1,
	name: "Bill Billson",
	age: "30",
	wing: "Left",
	room: "101",
}, 
{
	id: 2,
	name: "Jill Jillson",
	age: "25",
	wing: "Right",
	room: "102",
}
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 
const useResidents = () => {
	const [residents, setResidents] = useState<Resident[]>(data);
	const [nextId, setNextId] = useState<number>(data.length > 0 ? Math.max(...data.map(resident => resident.id)) + 1 : 1);

	const addResident = (resident: Omit<Resident, 'id'>) => {
		const newResident = { ...resident, id: nextId }; // add the id to the resident
		setResidents([...residents, newResident]);
		setNextId(nextId + 1);
		console.log("Added: ", resident);
	};

	const deleteResident = (id: number) => {
		setResidents(residents.filter((resident) => resident.id !== id));
		console.log("Deleted: ", id);
	}

  	return { residents, addResident, deleteResident };
};

export default useResidents;