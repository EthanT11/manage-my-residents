import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	// get user from auth context
	const { user, isLoading } = useAuth();

	if (isLoading) {
		// TODO: Add a loading spinner & style it
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/sign-in" replace />;
	}

	return <>{children}</>;
}
