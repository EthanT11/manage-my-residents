import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { Dashboard, Auth, Account } from "./components/pages";
import ErrorPage from "./components/pages/ErrorPage";
import AuthGuard from "./components/guards/AuthGuard";

// Protected routes that require authentication
const protectedRoutes: RouteObject[] = [
	{
		path: "/dashboard",
		element: (
			<AuthGuard>
				<Dashboard />
			</AuthGuard>
		),
	},
	{
		path: "/account",
		element: (
			<AuthGuard>
				<Account />
			</AuthGuard>
		),
	},
];

// Public routes that don't require authentication
const publicRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/sign-in" replace />,
	},
	{
		path: "/sign-in",
		element: <Auth />,
	},
];

// Only add basename in production
const isProduction = import.meta.env.PROD;
const basename = isProduction ? '/manage-my-residents' : '/';

const router = createBrowserRouter([
	...publicRoutes,
	...protectedRoutes,
	{
		path: "*",
		element: <ErrorPage />,
	},
], {
	basename
});

export default router;