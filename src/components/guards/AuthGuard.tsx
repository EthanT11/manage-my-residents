import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';

interface AuthGuardProps {
	children: React.ReactNode;
}

// Checks if the user is authenticated and redirects to the sign-in page if not
export default function AuthGuard({ children }: AuthGuardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { fetchUser } = useSupabase();

	useEffect(() => {
		const checkAuth = async () => {
			const { user } = await fetchUser();
			setIsAuthenticated(!!user);
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	if (isLoading) {
		// TODO: Add a loading spinner & style it
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
	}

	return <>{children}</>;
}
