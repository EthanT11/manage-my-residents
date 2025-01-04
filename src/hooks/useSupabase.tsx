import { supabase } from "@/supabaseClient";
import generateResidentImage from "@/tools/genResImg";
import { Resident, ResidentAdditional } from "@/contexts/ResidentContext";

// TODO: Move interfaces to appropriate files now that context is implemented
export interface Profile {
	first_name: string | null;
	last_name: string | null;
	home_name: string | null;
	position: string | null;
}

// Generate Resident Image
const aiGen = true;

const useSupabase = () => {
	
	// TODO: After saving generated images to supabase, need to keep in mind that the image url expires hense why I'm getting a cors error.
	// Will probably find a way to download the image rather then store the url directly from the AI

	// TODO: Add a supabase method to check if the user has a profile, if not create one
	// TODO: Add a supabase method to check if the user has a home, if not create one

	// User Data
	const fetchUser = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error) throw error;
			return { user: data?.user || null };
		} catch (error) {
			console.error('Error fetching user:', (error as Error).message);
			return { user: null };
		}
	};

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			// Clear any stored auth data
			sessionStorage.removeItem('supabase.auth.token');
			localStorage.removeItem('supabase.auth.token');
			
			return true;
		} catch (error) {
			console.error('Error signing out:', error);
			return false;
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({ 
				email, 
				password 
			});
			
			if (error) throw error;
			return { success: true, user: data.user };
		} catch (error) {
			console.error('Error signing in:', (error as Error).message);
			return { success: false, user: null };
		}
	};

	// NOTE: It's implemented but Supabase right now doesn't send a confirmation email to prevent spam
	// Out of scope for now but will set up an SMTP server to send emails.
	const signUp = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({ 
				email, 
				password 
			});
			
			if (error) throw error;
			return { 
				success: true, 
				user: data.user,
				message: 'Signed up successfully' 
			};
		} catch (error) {
			return { success: false, user: null, message: (error as Error).message };
		}
	};

	// Profile Data
	const fetchProfileData = async (user_id: string) => {
		if (!user_id) {
			throw new Error('No user ID provided');
		}

		try {
			const { data, error, count } = await supabase
				.from('profiles')
				.select('*', { count: 'exact' })
				.eq('user_id', user_id)
				.single();

			if (error) throw error;
			
			if (count !== 1) {
				throw new Error('Profile not found');
			}

			return data;
		} catch (error) {
			console.error('Error fetching profile data:', (error as Error).message);
			return null;
		}
	};

	const updateProfileData = async (profile: Profile) => {
		try {
			const { user } = await fetchUser();
			if (!user?.id) {
				throw new Error('User not found');
			}

			const { data, error } = await supabase
				.from('profiles')
				.update(profile)
				.eq('user_id', user.id)
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error updating profile:', (error as Error).message);
			return null;
		}
	};

	const getHomeId = async () => {
		try {
			const { user } = await fetchUser();
			if (!user) {
				throw new Error('User not found');
			}

			const profileData = await fetchProfileData(user.id);
			if (!profileData?.home_name) {
				throw new Error('Home not found in profile');
			}

			const { data, error } = await supabase
				.from('personal_care_homes')
				.select('id, home_name')
				.eq('home_name', profileData.home_name)
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error fetching home:', (error as Error).message);
			return null;
		}
	};

	// Resident Data
	// Get all residents for a home
	const getResidents = async () => {
		try {
			const home_id = await getHomeId().then((data) => data?.id);
			if (!home_id) {
				throw new Error('Home not found');
			}

			const { data, error } = await supabase
				.from('residents')
				.select(`
					*,
					profile_picture_url
				`)
				.eq('home_id', home_id);

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error fetching residents:', (error as Error).message);
			return [];
		}
	};

	// Get a resident by id


	const addResident = async (resident: Omit<Resident, 'id'>) => {
		try {
			const home_id = await getHomeId().then((home) => home?.id);
			if (!home_id) {
				throw new Error('Home not found');
			}

			let profile_picture_url = "";
			// generate image if aiGen is true
			if (aiGen) {
				profile_picture_url = await generateResidentImage(resident).then((url) => url ?? '');
			}

			const { data, error } = await supabase
				.from('residents')
				.insert([{ ...resident, home_id, profile_picture_url }])
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error adding resident:', (error as Error).message);
			return null;
		}
	};

	const removeResident = async (resident_id: string) => {
		try {
			const { error } = await supabase
				.from('residents')
				.delete()
				.eq('id', resident_id);

			if (error) throw error;
			return true;
		} catch (error) {
			console.error('Error removing resident:', (error as Error).message);
			return false;
		}
	};

	const updateResident = async (resident: ResidentAdditional) => {
		try {
			if (!resident.id) throw new Error('No resident ID provided');

			const residentData = {
				first_name: resident.first_name,
				last_name: resident.last_name,
				dob: resident.dob,
				gender: resident.gender,
				hair: resident.hair,
				eye: resident.eye,
				wing: resident.wing,
				room: resident.room,
				profile_picture_url: resident.profile_picture_url,
			};

			const additionalInfo = {
				marital_status: resident.marital_status?.trim() || 'N/A',
				religion: resident.religion?.trim() || 'N/A',
				diet: resident.diet?.trim() || 'N/A',
				weight: resident.weight?.trim() || 'N/A',
				height: resident.height?.trim() || 'N/A',
				level_of_care: resident.level_of_care?.trim() || 'N/A',
				blood_type: resident.blood_type?.trim() || 'N/A',
				allergies: resident.allergies?.trim() || 'None',
				mobility: resident.mobility?.trim() || 'N/A',
				dnr: resident.dnr ?? false,
				medications: resident.medications?.trim() || 'None',
				emergency_contact_name: resident.emergency_contact_name?.trim() || 'N/A',
				emergency_contact_phone: resident.emergency_contact_phone?.trim() || 'N/A',
				emergency_contact_relationship: resident.emergency_contact_relationship?.trim() || 'N/A',
				notes: resident.notes?.trim() || 'No additional notes',
			};

			// Update the basic resident information
			const { error: residentError } = await supabase
				.from('residents')
				.update(residentData)
				.eq('id', resident.id);

			if (residentError) throw residentError;

			// Update resident additional information
			const { error: additionalError } = await supabase
				.from('residents_additional')
				.update(additionalInfo)
				.eq('id', resident.id);

			if (additionalError) throw additionalError;

			return true;
		} catch (error) {
			console.error('Error updating resident:', (error as Error).message);
			return false;
		}
	};


	// Profile Avatar
	const uploadAvatar = async (user_id: string, file: File) => {
		try {
			const fileName = `${user_id}/avatar.jpg`;
			
			// Remove existing avatar
			await supabase.storage
				.from('profile-avatars')
				.remove([fileName]);

			// Upload new avatar
			const { data, error } = await supabase.storage
				.from('profile-avatars')
				.upload(fileName, file);

			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error uploading avatar:', (error as Error).message);
			return null;
		}
	};

	const getPublicUrl = (path: string) => {
		const { data } = supabase
			.storage
			.from('profile-avatars')
			.getPublicUrl(path);
		// check if the url is already cached if not add timestamp to force browser to reload the image
		return data?.publicUrl ? `${data.publicUrl}?t=${Date.now()}` : "";
	};

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
		updateResident,
	};
}

export default useSupabase;