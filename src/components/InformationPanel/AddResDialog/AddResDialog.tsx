import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CustomButton } from "@/components/Common";
import FormField from "./FormField";
import { Resident } from "@/hooks/useSupabase";

export default function AddResDialog({ addResident }: {addResident: (resident: Omit<Resident, 'id'>) => void}) {
	const [resForm, setResForm] = useState({
		first_name: "",
		last_name: "",
		dob: "",
		gender: "",
		hair: "",
		eye: "",
		wing: "",
		room: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		console.log(name, value);
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
			dob: resForm.dob,
			gender: resForm.gender,
			hair: resForm.hair,
			eye: resForm.eye,
			wing: resForm.wing,
			room: resForm.room
		}
		addResident(newResident);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<CustomButton text="Add Resident" variant="outline" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-blue-500">
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
						placeholder="Enter Last Name" 
						value={resForm.last_name}
						onChange={handleChange}
					/>
					<FormField 
						name="dob" 
						label="Date of Birth" 
						type="text" 
						placeholder="Enter Date of Birth" 
						value={resForm.dob}
						onChange={handleChange}
						fieldType="calendar"
					/>
					<FormField
						name="gender"
						label="Gender Identity"
						type="text"
						placeholder="How do you identify?"
						value={resForm.gender}
						options={["Male", "Female", "Non-Binary", "Prefer not to say"]}
						onChange={handleChange}
						fieldType="dropdown"
					/>
					<FormField 
						name="hair" 
						label="Hair Color" 
						type="string" 
						placeholder="Enter Hair Color" 
						value={resForm.hair}
						onChange={handleChange}
					/>
					<FormField 
						name="eye" 
						label="Eye Color" 
						type="string" 
						placeholder="Enter Eye Color" 
						value={resForm.eye}
						onChange={handleChange}
					/>
					<FormField 
						name="room" 
						label="Room" 
						type="string" 
						placeholder="Enter Room #" 
						value={resForm.room}
						onChange={handleChange}
					/>
					<FormField 
						name="wing" 
						label="Wing" 
						type="string" 
						placeholder="Enter Wing" 
						value={resForm.wing}
						onChange={handleChange}
					/>
					
					<div className="flex justify-end space-x-4 ">
						<CustomButton type="submit" text="Save" variant="outline" /> 
					</div>
				</form>
			</DialogContent>
		</Dialog>
  )
} 