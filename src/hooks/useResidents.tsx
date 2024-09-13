import { useState } from 'react';

interface Resident {
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
	room: "101"
}, 
{
	id: 2,
	name: "Jill Jillson",
	age: "25",
	wing: "Right",
	room: "102"
}
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 
const useResidents = () => {
	const [residents, setResidents] = useState<Resident[]>(data);

	const addResident = (resident: Resident) => {
		const nextId = residents.reduce((max, resident) => (resident.id > max ? resident.id : max), 0) + 1; // get the next id
		console.log(nextId)
		const newResident = { ...resident, id: nextId }; // add the id to the resident
		setResidents([...residents, newResident]);
		console.log("Added: ", resident);
	};

  	return { residents, addResident };
};

export default useResidents;