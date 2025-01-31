import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useSupabase from '@/hooks/useSupabase';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
	// supabase functions
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<boolean>;
    signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchUser, signIn: supabaseSignIn, signOut: supabaseSignOut, signUp: supabaseSignUp } = useSupabase();

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const { user } = await fetchUser();
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        const { success, user } = await supabaseSignIn(email, password);
        if (success && user) {
            setUser(user);
            return true;
        }
        return false; // we return false if the user is not found or the password is incorrect
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            const result = await supabaseSignOut();
            if (result) {
                setUser(null);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Sign out error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        const result = await supabaseSignUp(email, password);
        if (result.success && result.user) {
            setUser(result.user);
        }
        return result;
    };

    const value = {
        user,
        isLoading,
        signIn,
        signOut,
        signUp
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 