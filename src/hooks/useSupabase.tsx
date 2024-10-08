import { supabase } from "@/supabaseClient";

export interface Profile {
	first_name: string | null;
	last_name: string | null;
	home_name: string | null;
	position: string | null;
}

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

	const signUp = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error('Error signing up:', error.message);
			return { success: false, message: error.message };
		} else {
			console.log('Signed up successfully');
			return { success: true, message: 'Signed up successfully' };
		}
	}

	const fetchProfileData = async (user_id: string) => {
		if (!user_id) {
			console.error('User not found');
			return;
		}

		const { data, error, count } = await supabase
			.from('profiles') // from profiles table
			.select('*', { count: 'exact' }) // select all columns and count
			.eq('user_id', user_id) // where "user_id" is equal to the user's id
			.single() // get the first result
		if (error) {
			console.error('Error fetching profile data:', error.message);
		} else if (count !== 1) { // If there is no profile for the user
			console.error('Profile not found');
		} else {
			console.log('Profile data found')
			return data;
		}
		return null;
	};

	const updateProfileData = async (user_id: string, profile: Profile) => {
		const { data, error } = await supabase
			.from('profiles')
			.update(profile)
			.eq('user_id', user_id)
		if (error) throw error;
		return data;
	}

	const uploadAvatar = async (user_id: string, file: File) => {
		const fileName = `${user_id}/avatar.jpg`;
		const { data, error } = await supabase
			.storage
			.from('profile-avatars')
			.upload(fileName, file);
		if (error) {
			console.error('Error uploading avatar:', error.message);
		} else {
			console.log('Avatar uploaded successfully:', data);
		}
	}

	const getPublicUrl = (path: string) => { // TODO ask about error red underline
		const { data } = supabase
			.storage
			.from('profile-avatars')
			.getPublicUrl(path);
			return data?. publicUrl
	}

	const getAvatarUrl = async (user_id: string) => {
		const path = `${user_id}/avatar.jpg`;
		return getPublicUrl(path);
	}

	

	return { fetchUser, signOut, signIn, signUp, fetchProfileData, updateProfileData, uploadAvatar, getAvatarUrl };
}

export default useSupabase;