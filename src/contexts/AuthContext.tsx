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
        const result = await supabaseSignIn(email, password);
        if (result) {
            await checkUser(); // updates user state after sign in
        }
        return result;
    };

    const signOut = async () => {
        const result = await supabaseSignOut();
        if (result) {
            setUser(null);
        }
        return result;
    };

    const signUp = async (email: string, password: string) => {
        return await supabaseSignUp(email, password);
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