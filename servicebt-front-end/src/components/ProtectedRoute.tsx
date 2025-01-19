import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/Auth/SignIn");
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
