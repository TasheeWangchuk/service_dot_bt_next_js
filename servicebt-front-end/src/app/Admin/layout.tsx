// app/admin/layout.tsx
"use client";
import SideNav from '@/components/Admin/SideNav';
import { useState } from 'react';

import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="min-h-screen">
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 px-6">
        {children}
      </main>
    </div>
  );
}