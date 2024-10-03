import { useState, useEffect } from "react";
import { User } from '@supabase/supabase-js';
import { TopNavBar } from "../Common";
import { useNavigate } from "react-router-dom";
import useSupabase from "@/hooks/useSupabase";
import { supabase } from "@/supabaseClient";

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	const { fetchUser } = useSupabase();

	useEffect(() => {
		fetchUser().then(({ user }) => {
			if (!user) {
				console.log('User not found');
				navigate('/sign-in');
			}
			setUser(user);
		});

		const fetchProfileData = async () => {
			const { data, error, count } = await supabase
				.from('profiles') // from profiles table
				.select('*', { count: 'exact' }) // select all columns and count
				.eq('user_id', user?.id) // where "user_id" is equal to the user's id
				.single(); // get the first result
			if (error) {
				console.error('Error fetching profile data:', error.message);
			} else {
				console.log('Profile data:', data);
				console.log('User:', user?.id);
				console.log('Count:', count);
			
			}
		}
		fetchProfileData();
	  }, []);
	return (
		<div>
			<TopNavBar />
			<h1>Account</h1>
			{user ? (
				<div>
					<h1>Welcome, {user.email}</h1>
					<h2></h2>
				</div>
			) : (
				<h1>Not signed in</h1>
			)}
		</div>
	);
}