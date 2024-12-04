import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CardHeaderButton from "../CardHeaderButton";
import FormField from "./FormField";
import { Resident } from "@/hooks/useSupabase";


export default function AddResDialog({ addResident }: {addResident: (resident: Omit<Resident, 'id'>) => void}) {
	const [resForm, setResForm] = useState({
		first_name: "",
		last_name: "",
		age: 0,
		gender: "",
		hair: "",
		eye: "",
		wing: "",
		room: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setResForm({
			...resForm,
			[name]: value
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newResident = {
			first_name: resForm.first_name,
			last_name: resForm.last_name,
			age: resForm.age,
			gender: resForm.gender,
			hair: resForm.hair,
			eye: resForm.eye,
			wing: resForm.wing,
			room: resForm.room
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
						value={resForm.first_name}
						onChange={handleChange}
					/>
					<FormField 
						name="last_name" 
						label="Last Name" 
						type="text" 
						placeholder="Enter First Name" 
						value={resForm.last_name}
						onChange={handleChange}
					/>
					<FormField 
						name="age" 
						label="Age" 
						type="number" 
						placeholder="Enter Age" 
						value={resForm.age}
						onChange={handleChange}
					/>
					<FormField
						name="gender"
						label="Gender Identity"
						type="text"
						placeholder="How do you identify?"
						value={resForm.gender}
						onChange={handleChange}
					/>
					<FormField 
						name="hair" 
						label="Hair Color" 
						type="string" 
						placeholder="Select" 
						value={resForm.hair}
						onChange={handleChange}
					/>
					<FormField 
						name="eye" 
						label="Eye Color" 
						type="string" 
						placeholder="Select" 
						value={resForm.eye}
						onChange={handleChange}
					/>
					<FormField 
						name="room" 
						label="Room" 
						type="number" 
						placeholder="Enter Room #" 
						value={resForm.room}
						onChange={handleChange}
					/>
					<FormField 
						name="wing" 
						label="Wing" 
						type="string" 
						placeholder="Select Wing" 
						value={resForm.wing}
						onChange={handleChange}
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