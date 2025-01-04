import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../Profile";
import { SideManager } from "../SideManager";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import { LoadingSpinner } from "../Common";

export default function Account() {
	const navigate = useNavigate();
	// pull user data from context
	const { user, profile, avatarUrl, isLoading, updateAvatar, updateProfile } = useUser();

	// if the user is not loaded and the user is not signed in, redirect to the sign in page
	if (!user && !isLoading) {
		navigate('/sign-in');
		return null;
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
		const file = e.target.files?.[0];
		if (file) {
			await updateAvatar(file);
		}
	};

	return (
		<SidebarProvider>
			<SideManager />
			<main className="flex flex-col font-roboto h-screen w-screen overflow-auto bg-resident-details-bg theme-transition">
				{isLoading ? (
					<LoadingSpinner />
				) : (
					user && profile && (
						<>
							<ProfileCard 
								profile={profile}
								user={user}
								setProfile={updateProfile}
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
					)
				)}
			</main>
		</SidebarProvider>
	);
}