import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '@supabase/supabase-js';
import { supabase } from "@/supabaseClient";
import useSupabase from "@/hooks/useSupabase";
import { TopNavBar } from "../Common";

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	const { fetchUser } = useSupabase();
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [home, setHome] = useState(null);
	const [position, setPosition] = useState(null);

	useEffect(() => {
		fetchUser().then(({ user }) => {
			if (!user) {
				console.log('User not found');
				navigate('/sign-in');
			}
			setUser(user);
		});

	}, []); 
	
	useEffect(() => {
		  const fetchProfileData = async () => {
			  if (!user?.id) {
				  console.error('User not found');
				  return;
			  }

			  const { data, error, count } = await supabase
				  .from('profiles') // from profiles table
				  .select('*', { count: 'exact' }) // select all columns and count
				  .eq('user_id', user.id) // where "user_id" is equal to the user's id
				  .single() // get the first result
			  if (error) {
				  console.error('Error fetching profile data:', error.message);
			  } else if (count !== 1) { // If there is no profile for the user
				  console.error('Profile not found');
			  } else {
				  console.log('Profile data:', data);
				  setFirstName(data['first_name']);
				  setLastName(data['last_name']);
				  setHome(data['home_name']);
				  setPosition(data['position']);
			  }
		  }
		  if (user) {
			  fetchProfileData();
		  }

	  }, [user]);
	return (
		<div>
			<TopNavBar />
			<h1>Account</h1>
			{user ? (
				<div>
					<h1>Welcome, {firstName + " " + lastName}</h1>
					<h2>Home: {home} - Position: {position}</h2>
				</div>
			) : (
				<h1>Not signed in</h1>
			)}
		</div>
	);
}