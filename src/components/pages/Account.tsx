import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '@supabase/supabase-js';
import useSupabase, { Profile } from "@/hooks/useSupabase";
import { ProfileCard } from "../Profile";
import { SideManager } from "../SideManager";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile>({
		first_name: null,
		last_name: null,
		home_name: null,
		position: null,
	});
	const [avatarUrl, setAvatarUrl] = useState("");
	const navigate = useNavigate();
	const { fetchUser, fetchProfileData, uploadAvatar, getAvatarUrl } = useSupabase();
	
	useEffect(() => {
		const fetchData = async () => {
			const { user } = await fetchUser();
			if (!user) {
				navigate('/sign-in');
				return;
			}
			setUser(user);
			
			const profileData = await fetchProfileData(user.id);
			if (!profileData) return;

			setProfile({
				first_name: profileData.first_name ?? null,
				last_name: profileData.last_name ?? null,
				home_name: profileData.home_name ?? null,
				position: profileData.position ?? null,
			});
			
			const url = await getAvatarUrl(user.id);
			setAvatarUrl(url);
		};
		
		fetchData();
	}, [navigate, fetchUser, fetchProfileData, getAvatarUrl]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
		const file = e.target.files?.[0];
		if (file && user?.id) {
			await uploadAvatar(user.id, file);
			const newAvatarUrl = await getAvatarUrl(user.id);
			setAvatarUrl(newAvatarUrl);
		}
	};

	return (
		<SidebarProvider>
			<SideManager />
			<main className="flex flex-col font-roboto h-screen w-screen overflow-auto bg-resident-details-bg">
				{user ? (
					<>
						<ProfileCard 
							profile={profile}
							user={user}
							setProfile={setProfile}
							avatarUrl={avatarUrl}
						/>
						<input
							type="file"
							id="fileInput"
							className="hidden"
							onChange={handleFileChange}
							accept="image/*"
						/>
					</>
				) : (
					<div className="flex items-center justify-center h-full">Loading...</div>
				)}
			</main>
		</SidebarProvider>
	);
}