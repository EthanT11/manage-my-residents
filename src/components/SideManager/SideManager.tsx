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

import { Calendar, Home, Settings, User, ForkKnife, LogOut } from "lucide-react"
import useSupabase from "@/hooks/useSupabase"
import { useTheme } from "@/hooks/useTheme"
import SelfPlug from "./SelfPlug"

// TODO: Finish Calendar, Meals, and Residents | Out of scope for now

export default function SideManager() {
  const { toggleTheme } = useTheme()
  const { signOut } = useSupabase()

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
      icon: Settings,
      action: () => toggleTheme(),
    },
    {
      title: "Logout",
      url: "/sign-in",
      icon: LogOut,
      action: async () => await signOut(),
    }
  ]


  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700"
    >
      <SidebarRail className="hover:after:bg-blue-200" />
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-3 border-b border-blue-200 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
            <h2 className="text-lg font-bold text-blue-900 dark:text-gray-100 group-data-[collapsible=icon]:hidden">
              Manage My Residents
            </h2>
            <h2 className="hidden text-sm font-bold text-blue-900 dark:text-gray-100 group-data-[collapsible=icon]:block text-center">
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
                    className="hover:bg-blue-200/50 hover:text-blue-900 dark:hover:bg-gray-700/50 dark:hover:text-gray-100 data-[active=true]:bg-blue-200 dark:data-[active=true]:bg-gray-700 data-[active=true]:text-blue-900 dark:data-[active=true]:text-gray-100"
                  >
                    <a href={item.url}>
                      <item.icon className="text-blue-700 dark:text-gray-300" />
                      <span className="text-blue-700 dark:text-gray-300">{item.title}</span>
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