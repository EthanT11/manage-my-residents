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

import { Home, Settings, LogOut, Moon, Sun, Construction } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/contexts/AuthContext"
import SelfPlug from "./SelfPlug"
import { useNavigate, Link } from 'react-router-dom';

// TODO: Finish Calendar, Meals, and Residents | Out of scope for now

interface SidebarItem {
  title: string;
  url?: string;
  icon: React.ElementType;
  action?: () => void;
}

export default function SideManager() {
  const { toggleTheme, theme } = useTheme()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const success = await signOut()
    if (success) {
      navigate('/sign-in', { replace: true })
    }
  }

  const mainItems: SidebarItem[] = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Calendar",
      url: "/dashboard",
      // icon: Calendar,
      icon: Construction,
    },
    {
      title: "Meals",
      url: "/dashboard",
      // icon: ForkKnife,
      icon: Construction,
    },
    // {
    //   title: "Residents",
    //   url: "/dashboard",
    //   icon: User,
    // },
  ]

  const settingsItems = [
    {
      title: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => toggleTheme(),  
    },
    {
      title: "Account",
      url: "/account",
      icon: Settings,
    },
    {
      title: "Logout",
      icon: LogOut,
      action: handleSignOut,
    }
  ]

  const renderMenuItems = (items: SidebarItem[]) => (
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
          asChild 
          onClick={item.action}
          className="hover:bg-sidebar-hover hover:text-sidebar-text data-[active=true]:bg-sidebar-hover data-[active=true]:text-sidebar-text"
        >
          {item.url ? (
            <Link to={item.url}>
              <item.icon className="text-sidebar-text-secondary" />
              <span className="text-sidebar-text-secondary">{item.title}</span>
            </Link>
          ) : (
            <button>
              <item.icon className="text-sidebar-text-secondary" />
              <span className="text-sidebar-text-secondary">{item.title}</span>
            </button>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))
  )

  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-sidebar-bg border-r border-sidebar-border theme-transition z-20"
    >
      <SidebarRail className="hover:after:bg-sidebar-hover" />
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-3 border-b border-sidebar-border group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
            <h2 className="text-lg font-bold text-sidebar-text group-data-[collapsible=icon]:hidden">
              Manage My Residents
            </h2>
            <h2 className="hidden text-sm font-bold text-sidebar-text group-data-[collapsible=icon]:block text-center">
              MR
            </h2>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(mainItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarSeparator className="my-2" />
          <div className="px-4 py-2 group-data-[collapsible=icon]:px-1">
            <h3 className="text-sm font-medium text-sidebar-text-secondary opacity-70 group-data-[collapsible=icon]:hidden">
              Settings
            </h3>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SelfPlug />
      </SidebarFooter>
    </Sidebar>
  )
}