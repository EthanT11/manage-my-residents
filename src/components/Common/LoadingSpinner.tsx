interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

// TODO: Make the loading spinner more dynamic and customizable from the parent component
export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: 'h-4 w-4 border', 
		md: 'h-8 w-8 border-2',
		lg: 'h-16 w-16 border-2',
		xl: 'h-32 w-32 border-2'
	};

	return (
		<div className="flex justify-center items-center">
			<div className={`
				animate-spin rounded-full 
				border-t-button-submit-active border-b-button-submit-active
				${sizeClasses[size]}
			`}></div>
		</div>
	);
}