import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CardHeaderButton from "./CardHeaderButton";
import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";
 
export default function AddResDialog() {
	const [name, setName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(name);
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
				<div>
					<CardHeaderButton type="submit" text="Save" variant="outline" /> 
					<CardHeaderButton text="Cancel" variant="secondary" />
				</div>
		
			</form>
		</DialogContent>
    </Dialog>
  )
}