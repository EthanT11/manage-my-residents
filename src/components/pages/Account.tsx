import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { User } from '@supabase/supabase-js';
import { TopNavBar } from "../Common";
import { useNavigate } from "react-router-dom";

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
		  try {
			const { data, error } = await supabase.auth.getUser(); // fetch the user from the server
			if (error) throw error; // throw an error if there is one
			if (data.user) {
			  setUser(data.user); // set the user in state
			}
		  } catch (error) { // catch any errors
			console.warn('Error fetching user:', (error as Error).message);
			navigate('/sign-in'); // redirect to the sign-in page
		  }
		}
	
		fetchUser();
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