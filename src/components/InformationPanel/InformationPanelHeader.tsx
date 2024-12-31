import { useUser } from "@/contexts/UserContext";
import LoadingSpinner from "../Common/LoadingSpinner";

interface InformationPanelHeaderProps {
	isVisible?: boolean;
}

export default function InformationPanelHeader({ isVisible = true }: InformationPanelHeaderProps) {
	const { profile } = useUser();

	return (
		<header 
			className={`
				sticky top-0 z-10 
				bg-infoheader-bg border-b border-infoheader-border
				theme-transition header-transition
				${isVisible ? 'translate-y-0' : '-translate-y-full'}
			`}
		>
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold text-infoheader-text sm:text-3xl flex items-center gap-2">
						{profile?.home_name || <LoadingSpinner size="sm" />}
					</h2>
					<p className="text-sm text-infoheader-text-secondary font-medium">
						Personal Care Home Dashboard
					</p>
				</div>
			</div>
		</header>
	);
}