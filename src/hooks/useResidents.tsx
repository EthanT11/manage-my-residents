import { useState } from 'react';

interface Resident {
	name: string;
	age: string;
	wing: string;
	room: string;
}

const useResidents = () => {
	const [residents, setResidents] = useState<Resident[]>([]);

	const addResident = (resident: Resident) => {
		setResidents([...residents, resident]);
		console.log("Added: ", resident);
		console.log("Residents: ", residents);
	};

  	return { residents, addResident };
};

export default useResidents;