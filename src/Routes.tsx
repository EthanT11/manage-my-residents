import { createBrowserRouter } from "react-router-dom";
import { MainPage, Auth, Account } from "./components/pages";
// TODO: create a route and page for handing route not found | errorElement: <ErrorPage />

const router = createBrowserRouter([
	{
		path: "/sign-in",
		element: <Auth />,
	},
	{
		path: "/dashboard",
		element: <MainPage />,
	},
	{
		path: "/account",
		element: <Account />,
	},
]);

export default router;