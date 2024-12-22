import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DetailsSection, DetailsItem, CustomButton } from "@/components/Common";
import { EditProfileDialog } from "@/components/Profile";
import { Profile } from "@/hooks/useSupabase";
import { User } from "@supabase/supabase-js";

interface ProfileCardProps {
	profile: Profile;
	user: User;
	avatarUrl: string;
	setProfile: (profile: Profile) => void;
}

export default function ProfileCard( { profile, avatarUrl, user, setProfile }: ProfileCardProps ) {
	const getInitials = (firstName?: string | null, lastName?: string | null) => {
		if (!firstName && !lastName) return "N/A";
		return `${firstName?.[0]?.toUpperCase() || ""}${lastName?.[0]?.toUpperCase() || ""}`;
	};

	const handleUploadClick = () => document.getElementById('fileInput')?.click();

	return (
		<div className="flex-1 p-6">
			<div className="max-w-4xl mx-auto">
				<Card className="bg-profile-bg border-profile-border">
					<CardHeader className="border-b border-profile-border/20 pb-6">
						<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16 ring-2 ring-profile-border">
								<AvatarImage src={avatarUrl} alt={profile.first_name || ''} />
								<AvatarFallback className="bg-profile-border text-profile-text font-medium text-lg">
									{getInitials(profile.first_name, profile.last_name)}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-profile-title mb-1">
									Account Settings
								</CardTitle>
								<p className="text-sm text-profile-text">
									Manage your account information and preferences
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-6">
						<div className="grid gap-6">
							<DetailsSection title="User Information">
								<DetailsItem title="Email" value={user.email || ''} />
								<DetailsItem title="Home Name" value={profile.home_name || ''} />
								<DetailsItem title="Role" value={profile.position || ''} />
							</DetailsSection>

							<DetailsSection title="Profile Information">
								<DetailsItem title="First Name" value={profile.first_name || ''} />
								<DetailsItem title="Last Name" value={profile.last_name || ''} />
							</DetailsSection>

							<div className="flex justify-end gap-3">
								<CustomButton text="Upload Photo" onClick={handleUploadClick} />
								<EditProfileDialog profile={profile} setProfile={setProfile} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}