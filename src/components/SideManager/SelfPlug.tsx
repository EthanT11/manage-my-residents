import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GithubIcon } from "lucide-react"

// Little info section about myself
// TODO: Add profile picture
export default function SelfPlug() {
	return (
	  <div className="p-4 flex flex-col gap-4 group-data-[collapsible=icon]:p-2">
		<div className="flex flex-col gap-2">
		  <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
			<Avatar className="h-10 w-10 shrink-0">
			  <AvatarImage src="https://github.com/EthanT11.png" alt="Ethan Tracey - Developer" />
			  <AvatarFallback className="bg-sidebar-hover text-sidebar-text">
				ET
			  </AvatarFallback>
			</Avatar>
			<div className="flex flex-col group-data-[collapsible=icon]:hidden">
			  <span className="text-sm font-medium text-sidebar-text">
				Ethan Tracey
			  </span>
			  <span className="text-xs text-sidebar-text-secondary">
				Developer
			  </span>
			</div>
		  </div>
		  
		  <div className="group-data-[collapsible=icon]:hidden">
			<p className="text-xs text-sidebar-text-secondary mb-2">
			  Full-stack developer passionate about creating intuitive healthcare solutions.
			</p>
		  </div>
  
		  <a 
			href="https://github.com/EthanT11" 
			target="_blank" 
			rel="noopener noreferrer"
			className="flex items-center gap-2 text-sidebar-text-secondary hover:text-sidebar-text transition-colors group-data-[collapsible=icon]:justify-center"
		  >
			<GithubIcon size={20} /> 
			<span className="text-sm group-data-[collapsible=icon]:hidden">
			  View My GitHub
			</span>
		  </a>
		</div>
	  </div>
	)
  }