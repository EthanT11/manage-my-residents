import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ResidentCard( {name, age, info} : {name: string, age: string, info: [string, string]} ) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Resident Name: {name}</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Age</p>
				<p>{age}</p>
			</CardContent>
			<CardFooter>
				<p>Wing - {info[0]} | Room - {info[1]}</p>
				
			</CardFooter>
		</Card>
	)
}