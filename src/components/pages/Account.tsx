import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '@supabase/supabase-js';
import useSupabase, { Profile } from "@/hooks/useSupabase";
import { TopNavBar } from "../Common";
import { EditProfileDialog } from "../Profile";

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>({
        first_name: null,
        last_name: null,
        home_name: null,
        position: null,
    });
	const navigate = useNavigate();
	const { fetchUser, fetchProfileData } = useSupabase();

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
            }
        }

        fetchData();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

	return (
        <div className="min-h-screen bg-gray-100">
            <TopNavBar />
            {user ?
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Account Page</h1>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">User Information</h2>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Home Name:</strong> {profile?.home_name}</p>
                        <p><strong>Role:</strong> {profile?.position}</p>
                        <h2 className="text-lg font-bold mt-4 mb-4">Profile Information</h2>
                        <p><strong>First Name:</strong> {profile?.first_name}</p>
                        <p><strong>Last Name:</strong> {profile?.last_name}</p>
                    </div>
                    <EditProfileDialog />
                </div>
            :
                <div>Loading...</div>}
        </div>
	);
}