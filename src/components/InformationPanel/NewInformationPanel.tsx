import { useState, useEffect } from 'react';
import  useSupabase, { Resident }  from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewInformationPanel() {
    const [residents, setResidents] = useState<Resident[] | null>(null);
    const { getResidents } = useSupabase();

    useEffect(() => {
        async function fetchResidents() {
            const residentsData = await getResidents();
            setResidents(residentsData);
        }
        fetchResidents();
    }, []); // add getResidents to the dependency array | removed for now to stop all the calls

	interface PanelCardProps {
		title: string,
		condition?: any, // eg: residents ? residents.length : 0 | Type any for now till i can narrow it down a bit better 
		subTitle?: string
	}

	function PanelCard({ title, condition, subTitle }: PanelCardProps) {
		return (
			<>
				<Card className="bg-blue-100">
					<CardHeader>
						<CardTitle className="text-blue-700">{title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-blue-900">{condition}</div>
						<p className="text-blue-600">{subTitle}</p>
					</CardContent>
				</Card>
			</>
		)
	}

	const totalResidents = residents ? residents.length : 0;
	const averageAge = residents ? residents.reduce((acc, curr) => acc + curr.age, 0) / residents.length : 0;

    return (
        <div className="flex-1 overflow-auto">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">
                        Information Panel
                    </h2>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<PanelCard title="Resident Overview" condition={totalResidents} subTitle='Total Residents'/>
					<PanelCard title="Average Age" condition={averageAge} subTitle='Years'/>
                </div>
            </main>
        </div>
    );
}


// NOTES: 
// - max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 is a tailwindcss class that sets the max width of the container to 80rem, centers it, adds padding on the y-axis, and sets the padding on the x-axis for small and large screens