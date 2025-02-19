// app/components/dashboard/DashboardStats.tsx
import { Users, UserCheck } from "lucide-react";
import { StatCard } from "./StateCards";
import UserDistributionChart from "./UserDistributionChart";
import BudgetDistributionChart from "./BudgetDistributionChart";
import { useJobStats } from "@/hooks/useJobsData";

interface DashboardStatsProps {
  freelancerCount: number;
  clientCount: number;
}

export const DashboardStats = ({ freelancerCount, clientCount }: DashboardStatsProps) => {
  const { loading, error, getBudgetRanges } = useJobStats();
  const budgetData = getBudgetRanges();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Service Providers"
          value={freelancerCount}
          icon={<UserCheck className="h-4 w-4" />}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Clients"
          value={clientCount}
          icon={<Users className="h-4 w-4" />}
          iconColor="text-green-600"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <UserDistributionChart 
          freelancerCount={freelancerCount}
          clientCount={clientCount}
        />
        {!loading && !error && (
          <BudgetDistributionChart budgetData={budgetData} />
        )}
      </div>
    </div>
  );
};