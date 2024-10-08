import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '@supabase/supabase-js';
import useSupabase, { Profile } from "@/hooks/useSupabase";
import { TopNavBar } from "../Common";
import { EditProfileDialog } from "../Profile";

// TODO: use id not user_id *****

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>({
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
                console.log('User not found');
                navigate('/sign-in');
                return;
            }
            setUser(user);
            
            const profileData = await fetchProfileData(user.id);
            if (profileData) {
                setProfile({
                    first_name: profileData.first_name ?? null, // If first_name is null, set it to null
                    last_name: profileData.last_name ?? null,
                    home_name: profileData.home_name ?? null,
                    position: profileData.position ?? null,
                });
                
                const avatarUrl = await getAvatarUrl(user.id);
                setAvatarUrl(avatarUrl ?? ""); // TODO - set default avatar
            }
        }
        
        fetchData();
    }, [navigate]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]; // Get the first file

            if (user?.id) {
                await uploadAvatar(user.id, file);
            } else {
                console.error("User ID is undefined");
            }
        }
    }

    const handleUploadClick = () => {
        document.getElementById('fileInput')?.click(); // Trigger file input click event
    }

	return (
<div className="min-h-screen bg-gray-100">
        <TopNavBar />
        {user ? (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Account Page</h1>
                <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold mb-4">User Information</h2>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Home Name:</strong> {profile?.home_name}</p>
                        <p><strong>Role:</strong> {profile?.position}</p>
                        <h2 className="text-lg font-bold mt-4 mb-4">Profile Information</h2>
                        <p><strong>First Name:</strong> {profile?.first_name}</p>
                        <p><strong>Last Name:</strong> {profile?.last_name}</p>
                    </div>
                    <div className="flex flex-col items-center ml-auto space-y-2">
                        {avatarUrl && <img src={avatarUrl} alt="Profile Avatar" className="w-24 h-24 rounded-full " />}
                        <button onClick={handleUploadClick} className="border text-black py-2 px-4 rounded-md text-center">Upload Photo</button>
                        <EditProfileDialog />   
                    </div>
                </div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        ) : (
            <div>Loading...</div>
        )}
    </div>
	);
}