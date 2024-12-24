import { createBrowserRouter, RouteObject } from "react-router-dom";
import { MainPage, Auth, Account } from "./components/pages";
import ErrorPage from "./components/pages/ErrorPage";
import AuthGuard from "./components/guards/AuthGuard";

// Protected routes that require authentication
const protectedRoutes: RouteObject[] = [
	{
		path: "/dashboard",
		element: (
			<AuthGuard>
				<MainPage />
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
		path: "/sign-in",
		element: <Auth />,
	},
];

const router = createBrowserRouter([
	...publicRoutes,
	...protectedRoutes,
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

export default router;