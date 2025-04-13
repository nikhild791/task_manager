import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarInset } from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from 'react';
import { 
    Calendar, 
    List, 
    MessageSquare, 
    User, 
    Bell, 
    LogOut,
    Settings,
    PanelLeft,
    Search
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from 'react-toastify';

const MainLayout = ({children}) => {
    const location = useLocation();
    const {currentUser,role} = useAuth()
    const {logout} = useAuth()
    const getInitials = (name) => {
        return name
          .split(" ")
          .map(part => part[0])
          .join("")
          .toUpperCase();
    };
    


    let navigationItems = [
       
        {
            name: "Chat",
            href: "/main/chat",
            icon: MessageSquare,
            active: location.pathname === "/main/chat"
        },
        {
            name: "Achievements",
            href: "/main/achievements",
            icon: Bell,
            active: location.pathname === "/main/achievements"
        },
        {
            name: "Profile",
            href: "/main/profile",
            icon: User,
            active: location.pathname === "/main/profile"
        }
    ];
    if(role ==='admin'){
        navigationItems = [
              {
            name: "Admin Dashboard",
            href: "/main/admin-dashboard",
            icon: List,
            active: location.pathname === "/main/admin-dashboard"
        },
              {
            name: "Users",
            href: "/main/admin-dashboard/alluser",
            icon: List,
            active: location.pathname === "/main/admin-dashboard/alluser"
        },
        ...navigationItems]
    }else{
        navigationItems = [   
        {
            name: "Dashboard",
            href: "/main/dashboard",
            icon: List,
            active: location.pathname === "/main/dashboard"
        },...navigationItems]

    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen bg-gray-50 w-full dark:bg-gray-900 transition-colors duration-300">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <Sidebar className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col h-full">
                            {/* Logo Section */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <Link to="/main/dashboard" className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-md w-8 h-8 flex items-center justify-center text-white font-bold shadow-sm">
                                        Pd
                                    </div>
                                    <span className="font-bold text-lg text-gray-900 dark:text-white">Prabandhan</span>
                                </Link>
                            </div>
                            
                            {/* Navigation */}
                            <SidebarContent className="flex-1 py-4">
                                <nav className="px-2 space-y-1">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                                item.active
                                                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-sm"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <item.icon className="mr-3 h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SidebarContent>
                            
                            {/* User Profile Section */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${currentUser}`} alt={currentUser} />
                                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                                { getInitials(currentUser) }
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={()=>{logout()}}
                                        title="Sign Out"
                                        className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                    
                    {/* Main Content Area */}
                    <SidebarInset className="flex-1 flex flex-col transition-all duration-200 ease-in-out peer-data-[state=expanded]:ml-64 peer-data-[state=collapsed]:ml-0">
                        {/* Header */}
                        <header className="h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
                            <div className="flex items-center space-x-4">
                                <SidebarTrigger className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                    <Bell className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </div>
                            <ToastContainer />

                        </header>
                        
                        {/* Main Content */}
                        <main className="flex-1  p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
                            <div className=" mx-auto">
                                {children}
                            </div>
                        </main>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;