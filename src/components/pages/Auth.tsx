import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { TopNavBar } from '../Common';
import { SignUpDialog } from '../Profile';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error} = await supabase.auth.getUser();
        if (error) throw error;
        if (data?.user) {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.warn('Error fetching user:', (error as Error).message); // probably remove these
      }
    }

    fetchUser();
  }, []);

  const handlePasswordLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(error);

    if (error) {
      alert(error.message); // Show error message if failed to sign in
    } else {
      alert('Successfully signed in!');
	  navigate('/'); // Redirect to home page after successful sign in
    }
    setLoading(false);
  }

  return (
    <div>
      <TopNavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-900">Welcome to Manage My Residents</h1>
          <p className="text-center text-gray-600">Sign in with your email and password</p>
          <form className="space-y-6" onSubmit={handlePasswordLogin}>
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
              <input
                className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Your password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
			<SignUpDialog />
          </form>
        </div>
      </div>
    </div>
  );
}