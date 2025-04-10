import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "../ui/MainSidebar";

import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import React from 'react'
import { 
    Calendar, 
    List, 
    MessageSquare, 
    User, 
    Bell, 
    LogOut,
    Settings
  } from "lucide-react";

const MainLayout = ({children}) => {
    const logout=()=>{
        
    }
    const getInitials = (name) => {
        return name
          .split(" ")
          .map(part => part[0])
          .join("")
          .toUpperCase();
      };
    
    const currentUser = {
        name:"Testuser"
    }
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/main/dashboard",
      icon: List,
      active: location.pathname === "/dashboard"
    },
    {
      name: "Chat",
      href: "/main/chat",
      icon: MessageSquare,
      active: location.pathname === "/chat"
    },
    {
      name: "Achievements",
      href: "/main/achievements",
      icon: Bell,
      active: location.pathname === "/achievements"
    },
    {
      name: "Profile",
      href: "/main/profile",
      icon: User,
      active: location.pathname === "/profile"
    }
  ];

  return (
    <div>
         <div>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-sidebar border-r border-border">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
                  TT
                </div>
                <span className="font-bold text-lg">Task Trophy</span>
              </Link>
            </div>
          
            <SidebarContent className="flex-1 py-4">
              <nav className="px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SidebarContent>
            
            <div className="p-4 border-t mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
                    <AvatarFallback>{currentUser ? getInitials(currentUser.name) : "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser?.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 px-4 border-b flex items-center justify-between bg-background">
            <SidebarTrigger />
            <div></div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MainLayout