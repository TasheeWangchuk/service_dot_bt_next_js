"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; //Use usePathname instead of useRouter
import Loading from "./Loading";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current path
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Show loading when route changes
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timer);
  }, [pathname]); // Runs when pathname changes

  return loading ? <Loading/> : <>{children}</>;
}
