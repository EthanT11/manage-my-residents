import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CardHeaderButton from "./CardHeaderButton";
import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";
 
export default function AddResDialog() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [wing, setWing] = useState("");
	const [roomNumber, setRoomNumber] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(name);
		console.log(age);
		console.log(wing)
		console.log(roomNumber)
	}


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
			<form onSubmit={handleSubmit}>
				<div className="flex items-center space-x-4"> {/*space-x-4 for spacing between the label and input*/}
					<AddResLabel htmlFor="name">Name</AddResLabel>
					<AddResInput 
						name="name" type="text" placeholder="Enter Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex items-center space-x-4"> {/*space-x-4 for spacing between the label and input*/}
					<AddResLabel htmlFor="age">Age</AddResLabel>
					<AddResInput 
						name="age" type="number" placeholder="Enter Age"
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div className="flex items-center space-x-4"> {/*space-x-4 for spacing between the label and input*/}
					<AddResLabel htmlFor="wing">Wing</AddResLabel>
					<AddResInput 
						name="wing" type="string" placeholder="Select Wing"
						onChange={(e) => setWing(e.target.value)}
					/>
				</div>
				<div className="flex items-center space-x-4"> {/*space-x-4 for spacing between the label and input*/}
					<AddResLabel htmlFor="room">Room</AddResLabel>
					<AddResInput 
						name="room" type="number" placeholder="Enter Room #"
						onChange={(e) => setRoomNumber(e.target.value)}
					/>
				</div>
				
				<div className="flex space-x-4 ">
					<CardHeaderButton type="submit" text="Save" variant="outline" /> 
					{/* <CardHeaderButton text="Cancel" variant="secondary" /> */}
				</div>
			</form>
		</DialogContent>
    </Dialog>
  )
}