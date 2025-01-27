"use client";

import localFont from "next/font/local";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Footer from "../components/Shared/Footer";
import { AuthProvider } from "./context/AuthContext";

// Custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference on mount
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme === "dark") {
  //     setDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     setDarkMode(false);
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, []);

  // // Toggle dark mode
  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   if (!darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
<AuthProvider >
         {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        </AuthProvider>
      </body>
    </html>
  );
}

