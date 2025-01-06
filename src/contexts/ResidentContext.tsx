import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useSupabase from '@/hooks/useSupabase';
import { useUser } from './UserContext';

export interface Resident {
	id?: string;
	first_name: string;
	last_name: string;
	age?: number;
	dob: string;
	gender: string;
	hair: string;
	eye: string;
	wing: string;
	room: string;
	profile_picture_url?: string;
}

export interface ResidentAdditional extends Resident {
	// Personal Information
	marital_status?: string;
	diet?: string;
	religion?: string;
    weight?: string;
    height?: string;
	// Medical Information
	level_of_care?: string;
	blood_type?: string;
	allergies?: string;
	mobility?: string;
	dnr?: boolean;
	medications?: string;
	// Emergency Contact
	emergency_contact_name?: string;
	emergency_contact_phone?: string;
	emergency_contact_relationship?: string;
	// Additional Information
	notes?: string;

}

interface ResidentContextType {
    residents: (Resident & ResidentAdditional)[];
    selectedResident: (Resident & ResidentAdditional) | null;
    isLoading: boolean;
    setSelectedResident: (resident: (Resident & ResidentAdditional) | null) => void;
    addResident: (resident: Omit<Resident, 'id'>) => Promise<void>;
    removeResident: (residentId: string) => Promise<void>;
    refreshResidents: () => Promise<void>;
    editResident: (resident: ResidentAdditional) => Promise<void>;
}

const ResidentContext = createContext<ResidentContextType | undefined>(undefined);

export function ResidentProvider({ children }: { children: ReactNode }) {
    const [residents, setResidents] = useState<(Resident & ResidentAdditional)[]>([]);
    const [selectedResident, setSelectedResident] = useState<(Resident & ResidentAdditional) | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const { profile } = useUser();
    const { getResidents, addResident: addResidentToDb, removeResident: removeResidentFromDb, 
        updateResident: updateResidentInDb } = useSupabase();
    
    const refreshResidents = async () => {
        try {
            setIsLoading(true);
            const residentsData = await getResidents();
            setResidents(residentsData || []);
        } catch (error) {
            console.error('Error fetching residents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch residents when profile changes (which includes home_name)
    useEffect(() => {
        if (profile?.home_name) {
            refreshResidents();
        }
    }, [profile?.home_name]);

    const addResident = async (newResident: Omit<Resident, 'id'>) => {
        await addResidentToDb(newResident);
        refreshResidents();
    };

    const removeResident = async (residentId: string) => {
        await removeResidentFromDb(residentId);
        if (selectedResident?.id === residentId) {
            setSelectedResident(null);
        }
        refreshResidents();
    };

    const editResident = async (resident: ResidentAdditional) => {
        const success = await updateResidentInDb(resident);
        if (success) {
            setResidents(prevResidents => 
                prevResidents.map(r => // map through residents and update the resident with the new data
                    r.id === resident.id ? resident : r
                )
            );
            if (selectedResident?.id === resident.id) {
                setSelectedResident(resident);
            }
        }
    };

    const value = {
        residents,
        selectedResident,
        isLoading,
        setSelectedResident,
        addResident,
        removeResident,
        editResident,
        refreshResidents,
    };

    return (
        <ResidentContext.Provider value={value}>
            {children}
        </ResidentContext.Provider>
    );
}

export function useResidents() {
    const context = useContext(ResidentContext);
    if (context === undefined) {
        throw new Error('useResidents must be used within a ResidentProvider');
    }
    return context;
} 