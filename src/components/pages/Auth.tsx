import { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Ask about how to fix the type issue here
import { TopNavBar } from '../Common';

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	const handleLogin = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();

		setLoading(true);
		const { error } = await supabase.auth.signInWithOtp({ email }); // Send magic link to email
		console.log(error);

		if (error) {
			alert(error.error_description || error.message); // Show error message if failed to send magic link
		} else {
			alert('Check your email for the login link!');
		}
		setLoading(false);
	}
	
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
      		<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        		<h1 className="text-2xl font-bold text-center text-gray-900">Welcome to Manage My Residents</h1>
        		<p className="text-center text-gray-600">Sign in via magic link with your email below</p>
        		<form className="space-y-6" onSubmit={handleLogin}>
					<div>
						<input
						className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="email"
						placeholder="Your email"
						value={email}
						required={true}
						onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<button
						className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={loading}
						>
						{loading ? <span>Loading...</span> : <span>Send magic link</span>}
						</button>
					</div>
        		</form>
     		 </div>
    	</div>
	)
}