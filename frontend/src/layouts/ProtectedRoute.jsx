
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "../components/Main/MainLayout";
import { ToastContainer } from 'react-toastify';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-bounce-small">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <MainLayout>

      <ToastContainer />
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedRoute;
