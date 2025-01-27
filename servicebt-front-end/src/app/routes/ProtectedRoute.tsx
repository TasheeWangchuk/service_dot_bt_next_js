// src/app/routes/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "../context/AuthContext"; 

interface ProtectedRouteProps {
  allowedRoles: string[]; 
  children: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      
      router.push("/Auth/SignIn");
    } else if (!allowedRoles.includes(user?.role || "")) {
   
      router.push("/404");
    }
  }, [isLoading, isLoggedIn, allowedRoles, user?.role, router]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
