import { useState, useEffect, SetStateAction } from "react";
import { supabase } from "../../supabaseClient"; // TODO: look into generating the supabase types

export default function Account({ session }: { session: any }) { // TODO: change any type to correct type
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [website, setWebsite] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProfile() { // fetch profile data from the database
			setLoading(true);
			const { user } = session

			const { data, error } = await supabase // fetch data from the profiles table based on the user's id
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single()
			
			if (!ignore) {
				if (error) {
					alert(error.message);
					console.warn(`Error fetching profile: ${error.message}`);
				} else {
					setUsername(data.username);
					setWebsite(data.website);
					setAvatarUrl(data.avatar_url);
				}
				setLoading(false);
			}
		}

		getProfile(); // call the function to fetch the profile data

		return () => { // clean up func to prevent state updates if the component is unmounted
			ignore = true;
		};

	}, [session]);

	async function updateProfile(event: { preventDefault: () => void; }, avatar_url: any) { // TODO: change any type to correct type
		event.preventDefault();

		setLoading(true);
		const { user } = session;

		const updates = {
			id: user.id,
			username,
			website,
			avatar_url: avatar_url,
			updated_at: new Date(),
		};
		
		const { error } = await supabase.from('profiles').upsert(updates);

		if (error) {
			alert("In update profile: ", error.message);
			console.warn('Error updating profile:', error.message);
		} else {
			setAvatarUrl(avatar_url);
		}
		setLoading(false);
	}

	return (
		<>
			<form onSubmit={updateProfile} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
				<input
				id="email"
				type="text"
				value={session.user.email}
				disabled
				className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
				<input
				id="username"
				type="text"
				required
				value={username || ''}
				onChange={(e) => setUsername(e.target.value)}
				className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
				<input
				id="website"
				type="url"
				value={website || ''}
				onChange={(e) => setWebsite(e.target.value)}
				className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="flex items-center justify-between">
				<button
				type="submit"
				className={`px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
				disabled={loading}
				>
				{loading ? <span>Loading...</span> : <span>Update Profile</span>}
				</button>
			</div>
			</form>
			<button>Go to Main Page</button>
		</>
	  );
}