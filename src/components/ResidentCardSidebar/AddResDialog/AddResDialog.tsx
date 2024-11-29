import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CardHeaderButton from "../CardHeaderButton";
import FormField from "./FormField";
import { Resident } from "@/hooks/useSupabase";


export default function AddResDialog({ addResident }: {addResident: (resident: Omit<Resident, 'id'>) => void}) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState(0); // change to calender input
	const [gender, setGender] = useState("");
	const [hair, setHair] = useState("");
	const [eye, setEye] = useState("");
	const [wing, setWing] = useState("");
	const [room, setRoom] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newResident = {
			first_name: firstName,
			last_name: lastName,
			age: age,
			gender_identity: gender,
			hair: hair,
			eye: eye,
			wing: wing,
			room: room
		}
		addResident(newResident);
	}

	// TODO: Add validation for the form
	return (
		<Dialog>
			<DialogTrigger asChild>
				<CardHeaderButton text="Add Resident" variant="outline" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-blue-500"> {/* sm for small but behind : which deals with viewport */}
				<DialogHeader>
					<DialogTitle className="text-white text-center">New Resident</DialogTitle>
					<DialogDescription className="text-white text-center">
						Fill in the form below to add a new resident.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-blue-300 rounded-lg">
					<FormField 
						name="first_name" 
						label="First Name" 
						type="text" 
						placeholder="Enter First Name" 
						value={firstName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
					/>
					<FormField 
						name="last_name" 
						label="Last Name" 
						type="text" 
						placeholder="Enter First Name" 
						value={lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
					/>
					<FormField 
						name="age" 
						label="Age" 
						type="number" 
						placeholder="Enter Age" 
						value={age}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value))}
					/>
					<FormField
						name="gender_identity"
						label="Gender Identity"
						type="text"
						placeholder="How do you identify?"
						value={gender}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
					/>
					<FormField 
						name="hair" 
						label="Hair Color" 
						type="string" 
						placeholder="Select" 
						value={hair}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHair(e.target.value)}
					/>
					<FormField 
						name="eye" 
						label="Eye Color" 
						type="string" 
						placeholder="Select" 
						value={eye}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEye(e.target.value)}
					/>
					<FormField 
						name="room" 
						label="Room" 
						type="number" 
						placeholder="Enter Room #" 
						value={room}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
					/>
					<FormField 
						name="wing" 
						label="Wing" 
						type="string" 
						placeholder="Select Wing" 
						value={wing}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWing(e.target.value)}
					/>
					
					<div className="flex justify-end space-x-4 ">
						<CardHeaderButton type="submit" text="Save" variant="outline" /> 
						{/* <CardHeaderButton text="Cancel" variant="secondary" /> */}
					</div>
				</form>
			</DialogContent>
		</Dialog>
  )
}