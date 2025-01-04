import { ResidentAdditional, useResidents } from "@/contexts/ResidentContext";
import { DialogSectionHeader, FormField } from ".";
import { CustomButton } from "../Common";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from "react";

interface EditResDialogProps {
	resident: ResidentAdditional;
}

export default function EditResDialog({ resident }: EditResDialogProps) {
	const { editResident } = useResidents();
	const [residentInfo, setResidentInfo] = useState<ResidentAdditional>({
		...resident,
		marital_status: resident.marital_status ?? '',
		diet: resident.diet ?? '',
		religion: resident.religion ?? '',
		weight: resident.weight ?? '',
		height: resident.height ?? '',
		level_of_care: resident.level_of_care ?? '',
		blood_type: resident.blood_type ?? '',
		allergies: resident.allergies ?? '',
		mobility: resident.mobility ?? '',
		dnr: resident.dnr ?? false,
		medications: resident.medications ?? '',
		emergency_contact_name: resident.emergency_contact_name ?? '',
		emergency_contact_phone: resident.emergency_contact_phone ?? '',
		emergency_contact_relationship: resident.emergency_contact_relationship ?? '',
		notes: resident.notes ?? '',
	});
	const [isOpen, setIsOpen] = useState(false);

	const handleUpdateResident = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!residentInfo.id) {
			console.error('No resident ID found:', residentInfo);
			return;
		}
		console.log('Submitting resident:', residentInfo);
		await editResident(residentInfo);
		setIsOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setResidentInfo({ ...residentInfo, [name]: value });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<CustomButton text="Edit Resident" variant="default" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] h-[85vh] bg-dialog-bg border-2 border-dialog-border flex flex-col">
				<DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border flex-shrink-0">
					<DialogTitle className="text-dialog-title text-xl font-semibold">
						Edit Resident
					</DialogTitle>
					<DialogDescription className="text-dialog-text">
						Edit the resident's details
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto">
					<form onSubmit={handleUpdateResident} className="flex flex-col gap-6 p-6 bg-dialog-bg">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<DialogSectionHeader title="Personal Information" />
								<FormField
									name="first_name"
									label="First Name"
									placeholder="Enter first name"
									value={residentInfo.first_name}
									onChange={handleChange}
								/>
								<FormField
									name="last_name"
									label="Last Name"
									placeholder="Enter last name"
									value={residentInfo.last_name}
									onChange={handleChange}
								/>
								<FormField
									name="dob"
									label="Date of Birth"
									placeholder="Enter date of birth"
									value={residentInfo.dob}
									onChange={handleChange}
									fieldType="calendar"
								/>
								<FormField
									name="gender"
									label="Gender"
									placeholder="Enter gender"
									value={residentInfo.gender}
									onChange={handleChange}
									options={["Male", "Female", "Non-Binary", "Other", "Prefer not to say"]}
									fieldType="dropdown"
								/>
								<FormField
									name="marital_status"
									label="Marital Status"
									placeholder="Enter marital status"
									value={residentInfo.marital_status}
									onChange={handleChange}
									options={["Married", "Divorced", "Widowed", "Separated", "Never Married", "Other"]}
									fieldType="dropdown"
								/>
								<FormField
									name="religion"
									label="Religion"
									placeholder="Enter religion"
									value={residentInfo.religion}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-4">
								<DialogSectionHeader title="Physical Information" />
								<FormField
									name="weight"
									label="Weight"
									placeholder="Enter weight"
									value={residentInfo.weight}
									onChange={handleChange}
								/>
								<FormField
									name="height"
									label="Height"
									placeholder="Enter height"
									value={residentInfo.height}
									onChange={handleChange}
								/>
								<FormField
									name="hair"
									label="Hair Color"
									placeholder="Enter hair color"
									value={residentInfo.hair}
									onChange={handleChange}
								/>
								<FormField
									name="eye"
									label="Eye Color"
									placeholder="Enter eye color"
									value={residentInfo.eye}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-4">
								<DialogSectionHeader title="Medical Information" />
								<FormField
									name="level_of_care"
									label="Level of Care"
									placeholder="Enter level of care"
									value={residentInfo.level_of_care}
									onChange={handleChange}
								/>
								<FormField
									name="blood_type"
									label="Blood Type"
									placeholder="Enter blood type"
									value={residentInfo.blood_type}
									onChange={handleChange}
									options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
									fieldType="dropdown"
								/>
								<FormField
									name="dnr"
									label="DNR Status"
									placeholder="Enter DNR status"
									value={residentInfo.dnr}
									onChange={handleChange}
									
								/>
								{/* TODO: For allergies, diet, medications, and notes, make a textarea */}
								<FormField
									name="allergies"
									label="Allergies"
									placeholder="Enter allergies"
									value={residentInfo.allergies}
									onChange={handleChange}
								/>
								<FormField
									name="mobility"
									label="Mobility"
									
									placeholder="Enter mobility"
									value={residentInfo.mobility}
									onChange={handleChange}
								/>
								<FormField
									name="diet"
									label="Diet"
									placeholder="Enter diet"
									value={residentInfo.diet}
									onChange={handleChange}
								/>
								<FormField
									name="medications"
									label="Medications"
									
									placeholder="Enter medications"
									value={residentInfo.medications}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-4">
								<DialogSectionHeader title="Emergency Contact" />
								<FormField
									name="emergency_contact_name"
									label="Emergency Contact Name"
									placeholder="Enter emergency contact name"
									value={residentInfo.emergency_contact_name}
									onChange={handleChange}
								/>
								<FormField
									name="emergency_contact_phone"
									label="Emergency Contact Phone"
									placeholder="Enter emergency contact phone"
									value={residentInfo.emergency_contact_phone}
									onChange={handleChange}
								/>
								<FormField
									name="emergency_contact_relationship"
									label="Emergency Contact Relationship"
									placeholder="Enter emergency contact relationship"
									value={residentInfo.emergency_contact_relationship}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex justify-end space-x-4 pt-4 border-t border-dialog-border sticky bottom-0 bg-dialog-bg">
							<CustomButton 
								type="submit" 
								text="Save Changes" 
								variant="submit"
							/>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}	