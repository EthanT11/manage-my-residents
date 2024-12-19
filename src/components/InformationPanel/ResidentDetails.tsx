import { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ResidentDetailsProps {
    selectedResident: (Resident & ResidentAdditional) | null;
}

export default function ResidentDetails({ selectedResident }: ResidentDetailsProps) {
    if (!selectedResident) {
        return (
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-infopanel-text">Resident Details - Select A Resident For Details</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    const selectedResidentName = selectedResident.first_name + " " + selectedResident.last_name;

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-blue-700">Resident Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row">
                    {/* Left side - Avatar and basic info */}
                    <div className="flex items-start mb-6 md:mb-0 md:mr-8">
                        <Avatar className="h-24 w-24 mr-6">
                            <AvatarImage src={selectedResident.profile_picture_url} alt={selectedResident.first_name} />
                            <AvatarFallback>{}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-blue-900">{selectedResidentName}</h3>
                            <p className="mb-1 text-blue-700">Age: {selectedResident.age}</p>
                            <p className="mb-1 text-blue-700">Room: {selectedResident.room}</p>
                            <p className="mb-1 text-blue-700">Wing: {selectedResident.wing}</p>
                        </div>
                    </div>

                    {/* Right side - Additional details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Personal Information</h4>
                            <p className="mb-1 text-blue-700">Date of Birth: {selectedResident.dob}</p>
                            <p className="mb-1 text-blue-700">Gender: {selectedResident.gender}</p>
                            <p className="mb-1 text-blue-700">Marital Status: {selectedResident.marital_status}</p>
                            <p className="mb-1 text-blue-700">Diet: {selectedResident.diet}</p>
                            <p className="mb-1 text-blue-700">Religion: {selectedResident.religion}</p>
                            <p className="mb-1 text-blue-700">Weight: {selectedResident.weight}</p>
                            <p className="mb-1 text-blue-700">Height: {selectedResident.height}</p>
                            <p className="mb-1 text-blue-700">Hair Color: {selectedResident.hair}</p>
                            <p className="mb-1 text-blue-700">Eye Color: {selectedResident.eye}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Medical Information</h4>
                            <p className="mb-1 text-blue-700">Level of Care: {selectedResident.level_of_care}</p>
                            <p className="mb-1 text-blue-700">Allergies: {selectedResident.allergies || 'None'}</p>
                            <p className="mb-1 text-blue-700">Mobility: {selectedResident.mobility}</p>
                            <p className="mb-1 text-blue-700">Blood Type: {selectedResident.blood_type}</p>
                            <p className="mb-1 text-blue-700">DNR Status: {selectedResident.dnr ? 'Yes' : 'No'}</p>
                            <p className="mb-1 text-blue-700">Medications: {selectedResident.medications || 'None'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Emergency Contact</h4>
                            <p className="mb-1 text-blue-700">Name: {selectedResident.emergency_contact_name}</p>
                            <p className="mb-1 text-blue-700">Phone: {selectedResident.emergency_contact_phone}</p>
                            <p className="mb-1 text-blue-700">Relationship: {selectedResident.emergency_contact_relationship}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Additional Notes</h4>
                            <p className="mb-1 text-blue-700 whitespace-pre-wrap">{selectedResident.notes || 'No additional notes'}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}