import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import CustomButton from '@/components/Common/CustomButton';

export default function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	const getErrorMessage = () => {
		if (isRouteErrorResponse(error)) {
			return error.status === 404
				? 'Page not found!'
				: 'An unexpected error occurred!';
		}
		// TODO: Add a better error message
		return `An unexpected error occurred!`;
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-error-page-bg text-error-page-text">
			<h1 className="text-4xl font-bold mb-4 text-error-page-text">Oops!</h1>
			<p className="text-xl mb-4 text-error-page-text-secondary">{getErrorMessage()}</p>
			<CustomButton 
				text="Go Back"
				onClick={() => navigate(-1)}
				variant="outline"
			/>
		</div>
	);
}
