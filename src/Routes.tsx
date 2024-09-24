import { createBrowserRouter } from "react-router-dom";
import { MainPage, Auth } from "./components/pages";
// TODO: add Account page to routes
// TODO: create a route and page for handing route not found | errorElement: <ErrorPage />

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/sign-in",
		element: <Auth />,
	},
]);

export default router;