"use client"
import React, { useState, useEffect } from "react";
import apiClient from "@/app/lib/apiClient";
import { toast } from "react-toastify";
import TopNav from "@/components/Admin/SideNav";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Search, UserX, Users, Filter } from "lucide-react";
import SideNav from "@/components/Admin/SideNav";
import Loading from "@/components/Shared/Loading"

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  _id: string;
  email: string;
  role: string;
  status: string;
  is_banned: boolean;
}

const ROLE_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'Freelancer', label: 'Freelancer' },
  { value: 'Client', label: 'Client' },
] as const;

const TABLE_HEADERS = [
  { key: 'name', label: 'Name', className: 'min-w-[150px]' },
  { key: 'email', label: 'Email', className: 'min-w-[200px]' },
  { key: 'role', label: 'Role', className: 'min-w-[100px]' },
  { key: 'status', label: 'Status', className: 'min-w-[100px]' },
  { key: 'actions', label: 'Actions', className: 'text-right min-w-[100px]' },
] as const;

export default function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBanned, setShowBanned] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [showBanned]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const endpoint = showBanned ? "/api/v1/users/banned/" : "/api/v1/users/";
      const response = await apiClient.get(endpoint);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (user_id: string) => {
    try {
      await apiClient.post(`/api/v1/users/${user_id}/ban/`);
      toast.success("User has been banned!", {
        position: "top-center",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to ban user");
    }
  };

  const handleUnbanUser = async (user_id: string) => {
    try {
      await apiClient.post(`/api/v1/users/${user_id}/unban/`);
      toast.success("User has been unbanned!", {
        position: "top-center",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to unban user");
    }
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);
      return matchesRole && matchesSearch;
    });
  };

  const getRoleStyle = (role: string) => {
    return role === 'Freelancer' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  const getStatusStyle = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      
      <Loading />
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-red-500">
  //       {error}
  //     </div>
  //   );
  // }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="flex min-h-screen overflow-hidden bg-transparent">
      <div className="flex-auto overflow-auto">
        <div className="container mx-auto p-4 sm:p-6">
          <Card className="shadow-lg">
            <CardHeader className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    User Management
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {showBanned ? "Currently showing banned users" : "Manage and monitor user accounts"}
                  </CardDescription>
                </div>
                <Button 
                  variant={showBanned ? "outline" : "destructive"} 
                  onClick={() => setShowBanned(!showBanned)}
                  className="w-full sm:w-auto"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  {showBanned ? "Show All Users" : "Show Banned Users"}
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      {TABLE_HEADERS.map(header => (
                        <TableHead key={header.key} className={header.className}>
                          {header.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={TABLE_HEADERS.length} className="text-center py-8">
                          No users found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.user_id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(user.status)}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant={showBanned ? "default" : "destructive"}
                              onClick={() => showBanned ? handleUnbanUser(user.user_id) : handleBanUser(user.user_id)}
                              className="whitespace-nowrap"
                            >
                              {showBanned ? "Unban User" : "Ban User"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}