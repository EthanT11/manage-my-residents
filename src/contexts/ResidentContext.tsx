import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useSupabase, { Resident, ResidentAdditional } from '@/hooks/useSupabase';
import { useUser } from './UserContext';

// TODO: Move Resident Types
interface ResidentContextType {
    residents: (Resident & ResidentAdditional)[];
    selectedResident: (Resident & ResidentAdditional) | null;
    isLoading: boolean;
    setSelectedResident: (resident: (Resident & ResidentAdditional) | null) => void;
    addResident: (resident: Omit<Resident, 'id'>) => Promise<void>;
    removeResident: (residentId: string) => Promise<void>;
    refreshResidents: () => Promise<void>;
}

const ResidentContext = createContext<ResidentContextType | undefined>(undefined);

export function ResidentProvider({ children }: { children: ReactNode }) {
    const [residents, setResidents] = useState<(Resident & ResidentAdditional)[]>([]);
    const [selectedResident, setSelectedResident] = useState<(Resident & ResidentAdditional) | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const { profile } = useUser();
    const { getResidents, addResident: addResidentToDb, removeResident: removeResidentFromDb } = useSupabase();

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

    const value = {
        residents,
        selectedResident,
        isLoading,
        setSelectedResident,
        addResident,
        removeResident,
        refreshResidents
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