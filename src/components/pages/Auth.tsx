import { useEffect, useState } from 'react';
import { SignUpDialog } from '../Profile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  useEffect(() => {
    // checks user from context and navigates to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handlePasswordLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    const success = await signIn(email, password);
    if (success) {
      navigate('/dashboard');
    }
    setLoading(false);
  }
  // TODO: Style this page forgot during the great refactor
  return (
    <div>
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