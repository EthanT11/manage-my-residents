import {
  Card,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import pic from '../assets/test-stock-img.jpg' // stock image
import { useEffect, useState } from "react"

interface ResidentCardProps {
	id: number;
	name: string;
	info: [string, string];
	isSelected: boolean;
	setisSelected: (id: number) => void;
	deleteCard: () => void;
}

export default function ResidentCard( { id, name, info, isSelected, setisSelected, deleteCard} : ResidentCardProps ) {
	const [isCollapsed, setIsCollapsed] = useState(isSelected);

	useEffect(() => {
		setIsCollapsed(!isSelected);
	}, [isSelected]);

	const handleClick = () => { // function to toggle the card expansion
		setisSelected(id);
	}

	return (
		<Card className={`grow-0 shadow-lg rounded-lg m-2
			${isCollapsed ? 'bg-white' : 'bg-sky-200'}
		`}>
			<CardHeader className="text-center items-center" onClick={handleClick}>
				<CardTitle className={`hover:bg-sky-600 hover:text-white cursor-pointer width-auto p-2 rounded-lg border-2
					${isCollapsed ? 'text-blue-600' : 'bg-sky-600 text-white'}
				`}>
					{name} {isCollapsed ? '▼' : '▲'}
				</CardTitle>
			</CardHeader>
			{!isCollapsed && (
				<CardContent className="flex items-center justify-center">
					<img src={pic} width={150} height={100} alt="profilepic" />;
				</CardContent>
			)}
			<CardFooter>
				<p>Wing - {info[0]} | Room - {info[1]}</p>
				{isSelected && (
                    <button onClick={deleteCard} className="ml-4 bg-red-500 text-white p-2 rounded-lg">
                        Delete
                    </button>)}
			</CardFooter>
		</Card>
	)
	
}