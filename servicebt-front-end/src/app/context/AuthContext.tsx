"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Tokens {
  access: string;
  refresh: string;
}

interface User {
  email: string;
  role: string;
  username: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean; 
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  });
  const router = useRouter();

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    const user = localStorage.getItem("user");
    if (tokens && user) {
      setAuthState({
        user: JSON.parse(user),
        tokens: JSON.parse(tokens),
        isLoading: false,
        error: null,
        isLoggedIn: true,
      });
    }
  }, []);

  useEffect(() => {
    if (authState.tokens && authState.user) {
      localStorage.setItem("tokens", JSON.stringify(authState.tokens));
      localStorage.setItem("user", JSON.stringify(authState.user));
    }
  }, [authState.tokens, authState.user]);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`https://service-bhutan-api.onrender.com/api/v1/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      setAuthState({
        user: data.user,
        tokens: data.tokens,
        isLoading: false,
        error: null,
        isLoggedIn: true,
      });
      router.push("/");
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Something went wrong",
      }));
    }
  };

  const logout = async () => {
    try {
      await fetch(`https://service-bhutan-api.onrender.com/api/v1/users/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("tokens");
      localStorage.removeItem("user");
      setAuthState({
        user: null,
        tokens: null,
        isLoading: false,
        error: null,
        isLoggedIn: false,
      });
      router.push("/");
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = authState.tokens?.refresh;
    if (!refreshToken) return;

    try {
      const response = await fetch(`https://service-bhutan-api.onrender.com/api/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      setAuthState((prev) => ({
        ...prev,
        tokens: { access: data.access, refresh: refreshToken },
      }));
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
