import { SidebarTrigger } from "@/components/ui/sidebar"
import useSupabase from "@/hooks/useSupabase"

export default function InformationPanelHeader() {
	
	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl py-4 px-4 sm:px-6 lg:px-8 flex items-center">
				<div className='flex flex-1'>
					<SidebarTrigger className='hover:bg-gray-200'/>
				</div>
				<h2 className="text-2xl font-bold leading-7 text-blue-900 sm:text-3xl sm:truncate">Home name here Dashboard</h2>
			</div>
		</header>
	)
}