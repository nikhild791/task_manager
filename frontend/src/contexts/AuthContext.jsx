
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";


const AuthContext = createContext();

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" ,
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=admin"
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "user123",
    role: "user",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=user"
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("taskTrophyUser");
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("taskTrophyUser");
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("taskTrophyUser", JSON.stringify(userWithoutPassword));
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email is already in use
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already in use");
      setIsLoading(false);
      throw new Error("Email already in use");
    }
    
    // In a real app, you would send this to an API
    // For now, we'll just simulate a successful registration
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: "user",
      avatarUrl: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`
    };
    
    setCurrentUser(newUser);
    localStorage.setItem("taskTrophyUser", JSON.stringify(newUser));
    toast.success("Registration successful!");
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("taskTrophyUser");
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
