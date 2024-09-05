// TODO: think of a cool way to display the resident card
// TODO: make hover effect on the card title better
// TODO: add smoothening effect on the card expansion
// TODO: make it so only one card can be expanded at one time
import {
  Card,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import pic from '../assets/test-stock-img.jpg' // stock image
import { useState } from "react"

export default function ResidentCard( {name, info} : {name: string, info: [string, string]} ) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const handleClick = () => { // function to toggle the card expansion
		setIsCollapsed(!isCollapsed);
	}

	// Ask if there is a better way to do this. Specifically the isCollapsed check
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
			</CardFooter>
		</Card>
	)
}