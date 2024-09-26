import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { User } from '@supabase/supabase-js';

export default function Account() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const fetchUser = async () => {
		  const { data, error } = await supabase.auth.getUser();
		  console.log(data)
		  if (data.user) {
			setUser(data.user);
		  } else {
			console.log('User is not signed in');
		  }
		}
	
		fetchUser();
	  }, []);
	return (
		<div>
			<h1>Account</h1>
			{user ? <h1>Welcome, {user.email}</h1> : <h1>Not signed in</h1>}
		</div>
	);
}