import { useEffect, useState } from 'react';
import { SignUpDialog } from '../Dialogs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CustomButton, CustomInput } from '../Common';

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-auth-page-bg theme-transition">
      <div className="w-full max-w-md p-8 space-y-6 bg-dialog-bg border-2 border-dialog-border rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-auth-page-text">
            Welcome to Manage My Residents
          </h1>
          <h2 className="text-lg text-auth-page-text">
            Your home for managing your personal care home
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handlePasswordLogin}>
          <div className="space-y-4">
            <p className="text-auth-page-text text-center">
              Sign in with your email and password
            </p>
            <CustomInput
              name="email"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              name="password"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <CustomButton 
              type="submit"
              variant="submit"
              text="Sign In"
              isLoading={loading}
            />
            <SignUpDialog />
          </div>
        </form>
      </div>
    </div>
  );
}