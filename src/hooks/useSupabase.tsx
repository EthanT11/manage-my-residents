import { supabase } from "@/supabaseClient";

export interface Profile {
	first_name: string | null;
	last_name: string | null;
	home_name: string | null;
	position: string | null;
}

export interface Resident {
	id?: string;
	first_name: string;
	last_name: string;
	age: string;
	gender: string;
	hair: string;
	eye: string;
	wing: string;
	room: string;
}

const useSupabase = () => {
	// TODO: Fix supabase Authentication | Been to long since i've done anything with it
	// and I'm not sure if some of things I did was correct or exactly how it works
	// more then likely will strip out all supabase Auth and reimplement it now that I have a better understanding of it

	const fetchUser = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error) throw error;
			if (!data?.user) {
				// TODO: Redirect to sign in page
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
			sessionStorage.removeItem('supabase.auth.token'); // Remove token from session storage
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

	// Profile Data
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
			// console.log('Profile data found:', data);
			return data;
		}
		return null;
	};

	const updateProfileData = async (profile: Profile) => {
		const user_id = await fetchUser().then((data) => data.user?.id);
		if (!user_id) {
			console.error('User not found');
			return;
		} else {
			const { data, error } = await supabase
				.from('profiles')
				.update(profile)
				.eq('user_id', user_id)
			if (error) throw error;
			return data;
		}
	}
	
	// Residents Data
	const getHomeId = async () => {
		const { user } = await fetchUser();
		if (!user) {
			console.error('User not found');
			return;
		}
		const profileData = await fetchProfileData(user.id);
		
		if (profileData) {
			const { data, error } = await supabase
				.from('personal_care_homes')
				.select('*')
				.eq('home_name', profileData.home_name)
				.single();
			if (error) {
				console.error('Error fetching home id:', error.message);
			} else {
				// console.log('Home id found:', data);
				return data;
			}
		}
	}

	const getResidents = async () => {
		const home_id = await getHomeId().then((data) => data?.id);
		const { data, error } = await supabase
			.from('residents')
			.select('*')
			.eq('home_id', home_id);
		if (error) {
			console.error('Error fetching residents:', error.message);
			return null;
		} else {
			// console.log('Residents found:', data);
			return data;
		}
	}

	const addResident = async (resident: Resident) => {
		const home_id = await getHomeId().then((home) => home?.id);
		console.log(resident, home_id);
		const { data, error } = await supabase
			.from('residents')
			.insert([{ ...resident, home_id }]);
		if (error) {
			console.error('Error adding resident:', error.message);
		} else {
			console.log('Resident added successfully:', data);
		}
	}

	const removeResident = async (resident_id: string) => { // TODO: when doing RLS this will need to be checked against policies
		const { error } = await supabase
			.from('residents')
			.delete()
			.eq('id', resident_id);
		if (error) {
			console.error('Error removing resident:', error.message);
		} else {
			console.log('Resident removed successfully');
		}
	}

	// TODO: Implement editResident
	// const editResident = async (resident: Resident) => {
	// 	const { data, error } = await supabase
	// 		.from('residents')
	// 		.update(resident)
	// 		.eq('id', resident.id);
	// 	if (error) {
	// 		console.error('Error editing resident:', error.message);
	// 	} else {
	// 		console.log('Resident edited successfully:', data);
	// 	}
	// }


	// Profile Avatar
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

	const getPublicUrl = (path: string) => {
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

	return { 
		fetchUser,
		signOut, 
		signIn, 
		signUp, 
		fetchProfileData, 
		updateProfileData, 
		uploadAvatar, 
		getAvatarUrl,
		getResidents,
		addResident,
		removeResident,
	};
}

export default useSupabase;