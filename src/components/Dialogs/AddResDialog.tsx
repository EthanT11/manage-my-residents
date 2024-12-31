import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CustomButton } from "@/components/Common";
import FormField from "./FormField";
import { Resident } from "@/hooks/useSupabase";
import DialogSectionHeader from "./DialogSectionHeader";
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
				<CustomButton text="Add Resident" variant="default" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] bg-dialog-bg border-2 border-dialog-border">
				<DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border">
					<DialogTitle className="text-dialog-title text-xl font-semibold">
						New Resident Registration
					</DialogTitle>
					<DialogDescription className="text-dialog-text">
						Please fill in all required information for the new resident.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-dialog-bg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Personal Information Section */}
						<div className="space-y-4">
							<DialogSectionHeader title="Personal Information" />
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
								placeholder="Select Date" 
								value={resForm.dob}
								onChange={handleChange}
								fieldType="calendar"
							/>
							<FormField
								name="gender"
								label="Gender"
								type="text"
								placeholder="Select Gender"
								value={resForm.gender}
								options={["Male", "Female", "Non-Binary", "Prefer not to say"]}
								onChange={handleChange}
								fieldType="dropdown"
							/>
						</div>

						{/* Physical Description Section */}
						<div className="space-y-4">
							<DialogSectionHeader title="Physical Description" />
							<FormField 
								name="hair" 
								label="Hair Color" 
								type="text" 
								placeholder="Enter Hair Color" 
								value={resForm.hair}
								onChange={handleChange}
							/>
							<FormField 
								name="eye" 
								label="Eye Color" 
								type="text" 
								placeholder="Enter Eye Color" 
								value={resForm.eye}
								onChange={handleChange}
							/>
							<DialogSectionHeader title="Other Information" />
							<FormField 
								name="room" 
								label="Room" 
								type="text" 
								placeholder="Enter Room #" 
								value={resForm.room}
								onChange={handleChange}
							/>
							<FormField 
								name="wing" 
								label="Wing" 
								type="text" 
								placeholder="Enter Wing" 
								value={resForm.wing}
								onChange={handleChange}
							/>
						</div>
					</div>
					
					<div className="flex justify-end space-x-4 pt-4 border-t border-infopanel-border">
						<CustomButton 
							type="submit" 
							text="Register Resident" 
							variant="submit"
							
						/> 
					</div>
				</form>
			</DialogContent>
		</Dialog>
  )
} 