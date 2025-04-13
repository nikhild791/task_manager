
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, userService } from "../api/admin";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role,setRole] = useState()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role")
    
    if (savedUser) {
      try {
        setCurrentUser(savedUser);
        setRole(savedRole)
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (token) => {
    setIsLoading(true);
    if(token){
       localStorage.setItem("token", `Bearer ${token}`);
      const res = await authService.adminProfile()
      setCurrentUser(res.admin.username);
      setRole(res.role)
      localStorage.setItem('user',res.admin.username)
      localStorage.setItem('role',res.role)
      toast.success('admin logged in successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
                    });
      
    } else {
      toast.error('Invalid email or password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
              });
      throw new Error("Invalid email or password");
    }
    
    setIsLoading(false);
  };
  const userLogin = async (token) => {
    setIsLoading(true);
    if(token){
       localStorage.setItem("token", `Bearer ${token}`);
      const res = await userService.userProfile()
      setCurrentUser(res.user.username);
      setRole(res.role)
      localStorage.setItem('user',res.user.username)
      localStorage.setItem('role',res.role)
      toast.success('user logged in successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
              });
    } else {
      toast.error('Invalid email or password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
              });
      throw new Error("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setCurrentUser(null);
      setRole(null)
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      toast.info('Logged out successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
              });
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        isAdmin,
        isLoading,
        userLogin,
        login,
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
