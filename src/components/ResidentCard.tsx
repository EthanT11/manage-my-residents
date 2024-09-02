// TODO: think of a cool way to display the resident card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import pic from '../assets/test-stock-img.jpg' 
import { useState } from "react"

export default function ResidentCard( {name, info} : {name: string, info: [string, string]} ) {
	const [isCollapsed, setIsCollapsed] = useState(true)

	const handleClick = () => {
		setIsCollapsed(!isCollapsed)
		console.log(isCollapsed)
	}

	return (
		<Card>
			<CardHeader className="text-center" onClick={handleClick}>
				<CardTitle>{name}</CardTitle>
				{/* <CardDescription>Card Description</CardDescription> */}
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