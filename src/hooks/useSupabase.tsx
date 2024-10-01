import { supabase } from "@/supabaseClient";

const useSupabase = () => {
	const fetchUser = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error) throw error;
			if (!data?.user) {
				return { user: null };
			}
			return { user: data.user };
		} catch (error) {
			if ((error as Error).message === 'Auth session missing!') { // User is not logged in
			} else {
				console.warn('Error fetching user:', (error as Error).message);
			}
			return { user: null };
		}
	};
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
			return false;
		} else {
			console.log('Signed out successfully');
			return true;
		}
	}
	const signIn = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password})

		if (error) {
			console.error('Error signing in:', error.message);
			return false;
		} else {
			console.log('Signed in successfully');
			return true;
		}
	}

	return { fetchUser, signOut, signIn };
}

export default useSupabase;