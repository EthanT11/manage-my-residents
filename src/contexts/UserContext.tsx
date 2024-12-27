import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import useSupabase, { Profile } from '@/hooks/useSupabase';
import { useAuth } from './AuthContext';

// Context for user data(started with profile but will expand later)
// Should ask if we should have seperate contexts for profile and Auth, I prefer this way since it's easier to manage and
// it's easier to understand what's going on
interface UserContextType {
    user: User | null;
    profile: Profile | null;
    avatarUrl: string;
    isLoading: boolean;
    updateProfile: (newProfile: Profile) => Promise<void>;
    updateAvatar: (file: File) => Promise<void>;
    refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const { 
        fetchProfileData, 
        updateProfileData, 
        uploadAvatar, 
        getAvatarUrl 
    } = useSupabase();

    const refreshUserData = async () => {
        try {
            setIsLoading(true);
            if (user) {
                const profileData = await fetchProfileData(user.id);
                if (profileData) {
                    setProfile({
                        first_name: profileData.first_name ?? null,
                        last_name: profileData.last_name ?? null,
                        home_name: profileData.home_name ?? null,
                        position: profileData.position ?? null,
                    });
                }
                const url = await getAvatarUrl(user.id);
                setAvatarUrl(url);
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshUserData();
    }, [user]);

    const updateProfile = async (newProfile: Profile) => {
        const updatedProfile = await updateProfileData(newProfile);
        if (updatedProfile) {
            setProfile(newProfile);
        }
    };

    const updateAvatar = async (file: File) => {
        if (!user?.id) return;
        await uploadAvatar(user.id, file);

        const newUrl = await getAvatarUrl(user.id);
        setAvatarUrl(newUrl);
    };

    const value = {
        user,
        profile,
        avatarUrl,
        isLoading,
        updateProfile,
        updateAvatar,
        refreshUserData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 