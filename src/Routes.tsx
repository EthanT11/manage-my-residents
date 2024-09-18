import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./components/pages";
import { Auth } from "./components/Auth";
import { Account } from "./components/Profile"; // TODO: add Account page to routes

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/sign-in",
		element: <Auth />,
	}
]);

export default router;