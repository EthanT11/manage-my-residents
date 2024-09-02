import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import pic from '../assets/test-stock-img.jpg' 

export default function ResidentCard( {name, age, info} : {name: string, age: string, info: [string, string]} ) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Resident Name: {name}</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Age: {age}</p>
				<img src={pic} width={150} height={100} alt="profilepic" />;
			</CardContent>
			<CardFooter>
				<p>Wing - {info[0]} | Room - {info[1]}</p>
			</CardFooter>
		</Card>
	)
}