import { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DetailsSection, DetailsItem } from "@/components/Common/CustomDetails";

interface ResidentDetailsProps {
    selectedResident: (Resident & ResidentAdditional) | null;
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
            <Card className={`lg:col-span-2 bg-resident-details-bg border-resident-details-border shadow-md
                             resident-details-transition
                             opacity-0 translate-y-4`}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-resident-details-title flex items-center gap-2">
                        Resident Details
                    </CardTitle>
                    <p className="text-sm text-resident-details-text">Select a resident to view their details</p>
                </CardHeader>
            </Card>
        );
    }

    const selectedResidentName = selectedResident.first_name + " " + selectedResident.last_name;

    return (
        <Card className={`lg:col-span-2 bg-resident-details-bg border-resident-details-border
                         resident-details-transition
                         opacity-100 translate-y-0`}>
			{/* Note: Not sure if I like the thick line seperating the header and content */}
            <CardHeader className="border-b border-resident-details-border/20 pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-resident-details-border">
                        <AvatarImage src={selectedResident.profile_picture_url} alt={selectedResident.first_name} />
                        <AvatarFallback className="bg-resident-details-border text-resident-details-text font-medium text-lg">
                            {selectedResident.first_name[0]}{selectedResident.last_name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-resident-details-title mb-1">{selectedResidentName}</CardTitle>
                        <p className="text-sm text-resident-details-text">
                            Room {selectedResident.room} • {selectedResident.wing} Wing
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <DetailsSection title="Personal Information">
                            <DetailsItem title="Date of Birth" value={selectedResident.dob} />
                            <DetailsItem title="Age" value={dobToAge(selectedResident.dob).toString()} />
                            <DetailsItem title="Gender" value={selectedResident.gender} />
                            <DetailsItem title="Marital Status" value={selectedResident.marital_status} />
                            <DetailsItem title="Religion" value={selectedResident.religion} />
                        </DetailsSection>

                        <DetailsSection title="Physical Information">
                            <DetailsItem title="Weight" value={selectedResident.weight} />
                            <DetailsItem title="Height" value={selectedResident.height} />
                            <DetailsItem title="Hair Color" value={selectedResident.hair} />
                            <DetailsItem title="Eye Color" value={selectedResident.eye} />
                        </DetailsSection>
                    </div>

                    <div className="space-y-6">
                        <DetailsSection title="Medical Information">
                            <DetailsItem title="Level of Care" value={selectedResident.level_of_care} />
                            <DetailsItem title="Blood Type" value={selectedResident.blood_type} />
                            <DetailsItem title="DNR Status" value={selectedResident.dnr ? 'Yes' : 'No'} />
                            <DetailsItem title="Allergies" value={selectedResident.allergies || 'None'} />
                            <DetailsItem title="Mobility" value={selectedResident.mobility} />
                            <DetailsItem title="Diet" value={selectedResident.diet} />
                            <DetailsItem title="Medications" value={selectedResident.medications || 'None'} />
                        </DetailsSection>

                        <DetailsSection title="Emergency Contact">
                            <DetailsItem title="Name" value={selectedResident.emergency_contact_name} />
                            <DetailsItem title="Phone" value={selectedResident.emergency_contact_phone} />
                            <DetailsItem title="Relationship" value={selectedResident.emergency_contact_relationship} />
                        </DetailsSection>

                        <DetailsSection title="Additional Notes">
                            <p className="text-sm text-resident-details-text whitespace-pre-wrap">
                                {selectedResident.notes || 'No additional notes'}
                            </p>
                        </DetailsSection>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}