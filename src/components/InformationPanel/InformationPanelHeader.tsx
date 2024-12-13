import { SidebarTrigger } from "@/components/ui/sidebar"
import useSupabase from "@/hooks/useSupabase"
import { useEffect, useState } from "react"

export default function InformationPanelHeader() {
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
		<header className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
				<div></div>
				<div className="flex flex-col items-end">
					<h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">
						{homeName}
					</h2>
					<p className="text-sm text-blue-600 font-medium">
						Personal Care Home Dashboard
					</p>
				</div>
			</div>
		</header>
	)
}