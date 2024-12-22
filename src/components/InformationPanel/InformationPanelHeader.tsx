import useSupabase from "@/hooks/useSupabase"
import { useEffect, useState } from "react"

interface InformationPanelHeaderProps {
	isVisible?: boolean;
}

export default function InformationPanelHeader({ isVisible = true }: InformationPanelHeaderProps) {
	const { fetchUser, fetchProfileData } = useSupabase()
	const [homeName, setHomeName] = useState<string>("")

	useEffect(() => {
		const getHomeName = async () => {
			const { user } = await fetchUser()
			if (user) {
				const profile = await fetchProfileData(user.id)
				if (profile?.home_name) {
					setHomeName(profile.home_name)
				}
			}
		}
		getHomeName()
	}, [])

	return (
		<header 
			className={`
				sticky top-0 z-10 bg-infoheader-bg border-b border-infoheader-border
				transition-transform duration-300
				${isVisible ? 'translate-y-0' : '-translate-y-full'}
			`}
		>
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold text-infoheader-text sm:text-3xl">
						{homeName}
					</h2>
					<p className="text-sm text-infoheader-text-secondary font-medium">
						Personal Care Home Dashboard
					</p>
				</div>
			</div>
		</header>
	)
}