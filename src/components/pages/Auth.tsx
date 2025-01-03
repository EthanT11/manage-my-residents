//
// Sign in page
//
import { useEffect, useState } from 'react';
import { SignUpDialog } from '../Dialogs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CustomButton, CustomInput } from '../Common';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface AuthCardProps {
  email: string;
  password: string;
  loading: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handlePasswordLogin: (event: { preventDefault: () => void }) => void;
}

function AuthCard({ email, password, loading, setEmail, setPassword, handlePasswordLogin }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md bg-dialog-bg border-2 border-dialog-border shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold text-profile-title">
          Welcome to Manage My Residents
        </CardTitle>
        <CardDescription className="text-lg text-profile-text">
          Your home for managing your personal care home
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handlePasswordLogin}>
          <div className="space-y-4">
            <p className="text-profile-text text-center">
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
      </CardContent>
    </Card>
  );
}

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  useEffect(() => {
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-auth-page-bg theme-transition">
      <AuthCard 
        email={email}
        password={password}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
        handlePasswordLogin={handlePasswordLogin}
      />
    </div>
  );
}