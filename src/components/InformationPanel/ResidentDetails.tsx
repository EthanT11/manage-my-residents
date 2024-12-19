import { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ResidentDetailsProps {
    selectedResident: (Resident & ResidentAdditional) | null;
}

function DetailsSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h4 className="font-semibold text-resident-details-section-title mb-2">{title}</h4>
            {children}
        </div>
    );
}

function DetailsItem({ title, value }: { title: string, value: string | undefined }) {
    return (
        <p className="mb-1 text-resident-details-text">{title}: {value || 'N/A'}</p>
    );
}

function dobToAge(dob: string) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

export default function ResidentDetails({ selectedResident }: ResidentDetailsProps) {
    if (!selectedResident) {
        return (
            <Card className="lg:col-span-2 bg-resident-details-bg border-resident-details-border">
                <CardHeader>
                    <CardTitle className="text-resident-details-title">
                        Resident Details - Select A Resident For Details
                    </CardTitle>
                </CardHeader>
            </Card>
        );
    }

    const selectedResidentName = selectedResident.first_name + " " + selectedResident.last_name;

    return (
        <Card className="lg:col-span-2 bg-resident-details-bg border-resident-details-border">
            <CardHeader>
                <CardTitle className="text-resident-details-title">Resident Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row">
                    {/* Left side - Avatar and basic info */}
                    <div className="flex items-start mb-6 md:mb-0 md:mr-8">
                        <Avatar className="h-24 w-24 mr-6 ring-2 ring-resident-details-border">
                            <AvatarImage src={selectedResident.profile_picture_url} alt={selectedResident.first_name} />
                            <AvatarFallback className="bg-resident-details-bg text-resident-details-text font-medium">
                                {selectedResident.first_name[0]}{selectedResident.last_name[0]}
                            </AvatarFallback>
                        </Avatar>
						<DetailsSection title="Basic Information">
							<DetailsItem title="Name" value={selectedResidentName} />
							<DetailsItem title="Age" value={dobToAge(selectedResident.dob).toString()} />
							<DetailsItem title="Room" value={selectedResident.room} />
							<DetailsItem title="Wing" value={selectedResident.wing} />
						</DetailsSection>
                    </div>

                    {/* Right side - Additional details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
						<DetailsSection title="Personal Information">
							<DetailsItem title="Date of Birth" value={selectedResident.dob} />
							<DetailsItem title="Gender" value={selectedResident.gender} />
							<DetailsItem title="Marital Status" value={selectedResident.marital_status} />
							<DetailsItem title="Diet" value={selectedResident.diet} />
							<DetailsItem title="Religion" value={selectedResident.religion} />
							<DetailsItem title="Weight" value={selectedResident.weight} />
							<DetailsItem title="Height" value={selectedResident.height} />
							<DetailsItem title="Hair Color" value={selectedResident.hair} />
							<DetailsItem title="Eye Color" value={selectedResident.eye} />
						</DetailsSection>
						<DetailsSection title="Medical Information">
							<DetailsItem title="Level of Care" value={selectedResident.level_of_care} />
							<DetailsItem title="Allergies" value={selectedResident.allergies || 'None'} />
							<DetailsItem title="Mobility" value={selectedResident.mobility} />
							<DetailsItem title="Blood Type" value={selectedResident.blood_type} />
							<DetailsItem title="DNR Status" value={selectedResident.dnr ? 'Yes' : 'No'} />
							<DetailsItem title="Medications" value={selectedResident.medications || 'None'} />
						</DetailsSection>
						<DetailsSection title="Emergency Contact">
							<DetailsItem title="Name" value={selectedResident.emergency_contact_name} />
							<DetailsItem title="Phone" value={selectedResident.emergency_contact_phone} />
							<DetailsItem title="Relationship" value={selectedResident.emergency_contact_relationship} />
						</DetailsSection>
						<DetailsSection title="Additional Notes">
							<DetailsItem title="Notes" value={selectedResident.notes || 'No additional notes'} />
						</DetailsSection>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}