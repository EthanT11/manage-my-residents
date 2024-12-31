import { useResidents } from '@/contexts/ResidentContext';
import PanelCard from './PanelCard';
import ResidentList from './ResidentList';
import ResidentDetails from './ResidentDetails';
import LoadingSpinner from '../Common/LoadingSpinner';

// TODO: Remove default scrollbar for the resident list
export default function InformationPanel() {
    const { residents, selectedResident, isLoading } = useResidents();

    // conditions for the panel cards
    const totalResidents = residents.length;
    const averageAge = residents.length > 0 ? Math.round(
        residents.reduce((sum, resident) => {
            const birthDate = new Date(resident.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return sum + age;
        }, 0) / residents.length
    ) : 0;

    // Calculate days until next birthday
    const calculateDaysUntilBirthday = (dob: string) => {
        const today = new Date();
        const birthDate = new Date(dob);
        
        // Set this year's birthday
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        // If birthday has passed this year, calculate for next year
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        // Calculate difference in days
        const diffTime = nextBirthday.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-infopanel-bg border-l border-infopanel-border">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden bg-infopanel-bg no-scrollbar border-l border-infopanel-border theme-transition">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full overflow-y-auto">
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'> {/* Container for the panel cards */}
                    {!selectedResident ? (
                        <>
                            <PanelCard 
                                title="Home Overview" 
                                condition={totalResidents} 
                                subTitle='Total Residents'
                            />
                            <PanelCard 
                                title="Average Age" 
                                condition={averageAge} 
                                subTitle='Years'
                            />
                        </>
                    ) : (
                        <>
							{/* TODO: Add dynamic information from database */}
                            <PanelCard 
                                title={`Important Information`} 
                                condition={"Allergies: Peanuts"} 
                                subTitle='EpiPen stored in - Medicine Cabinet'
                            />
                            <PanelCard 
                                title="Birthday Countdown" 
                                condition={calculateDaysUntilBirthday(selectedResident.dob)} 
                                subTitle='Days'
                            />
                        </>
                    )}
                </div>

                <div>
					{/* NOTE: Resident list now uses the context to fetch and display residents */}
                    <ResidentList />
                </div>
				<ResidentDetails />
            </div>
        </div>
    );
}