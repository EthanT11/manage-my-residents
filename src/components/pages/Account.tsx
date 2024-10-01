import { useState, useEffect } from "react";
import { User } from '@supabase/supabase-js';
import { TopNavBar } from "../Common";
import { useNavigate } from "react-router-dom";
import useSupabase from "@/hooks/useSupabase";

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
	  }, []);
	return (
		<div>
			<TopNavBar />
			<h1>Account</h1>
			{user ? (
				<div>
					<h1>Welcome, {user.email}</h1>
				</div>
			) : (
				<h1>Not signed in</h1>
			)}
		</div>
	);
}