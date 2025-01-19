// import { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/router';

// interface AuthState {
//   user: { email: string; role: string } | null;
//   isLoading: boolean;
//   error: string | null;
// }

// interface AuthContextProps extends AuthState {
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isLoading: false,
//     error: null,
//   });

//   const router = useRouter();

//   const login = async (email: string, password: string) => {
//     try {
//       setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      //   credentials: 'include',
      // });

//       if (!response.ok) throw new Error('Login failed');

//       const data = await response.json();

//       setAuthState({
//         user: data.user,
//         isLoading: false,
//         error: null,
//       });

//       // Redirect based on role
//       switch (data.user.role) {
//         case 'admin':
//           router.push('/Admin/dashboard');
//           break;
//         case 'serviceProvider':
//           router.push('/ServiceProvider/dashboard');
//           break;
//         case 'user':
//           router.push('/dashboard');
//           break;
//         default:
//           throw new Error('Unknown role');
//       }
//     } catch (error) {
//       setAuthState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: 'Invalid credentials',
//       }));
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       setAuthState({
//         user: null,
//         isLoading: false,
//         error: null,
//       });

//       router.push('/Auth/SignIn');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...authState,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface User {
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  // Automatically check if the user is logged in on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true }));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/`,
          { credentials: "include" }
        );

        if (!response.ok) throw new Error("Not authenticated");

        const data = await response.json();
        setAuthState({ user: data.user, isLoading: false, error: null });
      } catch (error) {
        setAuthState({ user: null, isLoading: false, error: null });
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      setAuthState({ user: data.user, isLoading: false, error: null });

      // Redirect based on role
      switch (data.user.role) {
        case "admin":
          router.push("/Admin/dashboard");
          break;
        case "serviceProvider":
          router.push("/ServiceProvider/dashboard");
          break;
        case "user":
          router.push("/dashboard");
          break;
        default:
          throw new Error("Unknown role");
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: "Invalid credentials",
      });
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });

      setAuthState({ user: null, isLoading: false, error: null });
      router.push("/Auth/SignIn");
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false, error: null }));
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
