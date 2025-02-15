"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";
import TopNav from "@/components/Admin/SideNav";
import apiClient from '@/app/lib/apiClient';
import Loading from '@/components/Shared/Loading'

const Dashboard = () => {
  const [freelancerCount, setFreelancerCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await apiClient.get("/api/v1/users/");
        const users = response.data;

        console.log("Fetched users:", users);

           // Debug logging for all users' roles
          users.forEach((user: { user_id: any; role: any; }) => {
          console.log(`User ID ${user.user_id} - Role: "${user.role}" - Type: ${typeof user.role}`);
          });
        // Updated filters to match exact case from API
        const freelancers = users.filter((user: { role: string; }) => user.role === "Freelancer").length;
        const clients = users.filter((user: { role: string; }) => user.role === "Client").length;

        console.log("Freelancers found:", freelancers);
        console.log("Clients found:", clients);

        setFreelancerCount(freelancers);
        setClientCount(clients);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchUserCounts();
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav activeTab="dashboard" setActiveTab={() => {}} />
      <div className="container mx-auto p-6 mt-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{freelancerCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientCount}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;