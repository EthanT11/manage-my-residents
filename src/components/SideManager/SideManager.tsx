import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { Calendar, Home, Settings, User, ForkKnife, LogOut, GithubIcon } from "lucide-react"
import useSupabase from "@/hooks/useSupabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const { signOut} = useSupabase();
 
// TODO: Finish Calendar, Meals, and Residents | Out of scope for now
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "/dashboard",
    icon: Calendar,
  },
  {
    title: "Meals",
    url: "/dashboard",
    icon: ForkKnife,
  },
  {
    title: "Residents",
    url: "/dashboard",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/sign-in",
    icon: LogOut,
    action: async () => await signOut(),
  }
]

// Little info section about myself
// TODO: Add profile picture
function SelfPlug() {
  return (
    <div className="p-4 flex flex-col gap-4 group-data-[collapsible=icon]:p-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src="/path-to-your-photo.jpg" alt="Developer" />
            <AvatarFallback className="bg-blue-200 text-blue-700">ET</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-blue-900">Ethan T</span>
            <span className="text-xs text-blue-700">Developer</span>
          </div>
        </div>
        
        <div className="group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-blue-700 mb-2">
            Full-stack developer passionate about creating intuitive healthcare solutions.
          </p>
        </div>

        <a 
          href="https://github.com/EthanT11" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors group-data-[collapsible=icon]:justify-center"
        >
          <GithubIcon size={20} /> 
          <span className="text-sm group-data-[collapsible=icon]:hidden">View My GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default function SideManager() {
  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200"
    >
      <SidebarRail className="hover:after:bg-blue-200" />
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-3 border-b border-blue-200 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
            <h2 className="text-lg font-bold text-blue-900 group-data-[collapsible=icon]:hidden">
              Manage My Residents
            </h2>
            <h2 className="hidden text-sm font-bold text-blue-900 group-data-[collapsible=icon]:block text-center">
              MR
            </h2>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    onClick={item.action}
                    className="hover:bg-blue-200/50 hover:text-blue-900 data-[active=true]:bg-blue-200 data-[active=true]:text-blue-900"
                  >
                    <a href={item.url}>
                      <item.icon className="text-blue-700" />
                      <span className="text-blue-700">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <SelfPlug />
      </SidebarFooter>
    </Sidebar>
  )
}