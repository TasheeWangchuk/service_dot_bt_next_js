// app/(admin)/dashboard/page.tsx
'use client';

import { useUserCounts } from '@/hooks/useUserCounts';
import { DashboardStats } from '@/components/Admin/dashboard/DashboardStats';
import TopNav from "@/components/Admin/SideNav";
import Loading from '@/components/Shared/Loading';

export default function DashboardPage() {
  const { freelancerCount, clientCount, loading } = useUserCounts();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav activeTab="dashboard" setActiveTab={() => {}} />
      <div className="container mx-auto p-6 mt-16">
        <DashboardStats 
          freelancerCount={freelancerCount}
          clientCount={clientCount}
        />
      </div>
    </div>
  );
}