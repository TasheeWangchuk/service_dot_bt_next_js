"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import apiClient from "@/app/lib/apiClient";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
  type: "info" | "success" | "warning" | "error";
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/api/v1/notifications/");
      const data = response?.data || [];
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await apiClient.post(`/api/v1/notifications/${id}/mark-as-read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.post("/api/v1/notifications/mark-all-read/");
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getTypeStyles = (type: Notification["type"]) => {
    const typeStyles = {
      success: "bg-green-50 border-green-200",
      warning: "bg-yellow-50 border-yellow-200",
      error: "bg-red-50 border-red-200",
      info: "bg-blue-50 border-blue-200",
    };
    return typeStyles[type] || "bg-gray-50 border-gray-200";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell className="h-6 w-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 mt-2"
        align="start" // Align dropdown to the left of the trigger
        side="bottom" // Position the dropdown below the icon
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
              disabled={unreadCount === 0}
            >
              Mark all as read
            </button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors",
                  !notification.is_read && getTypeStyles(notification.type)
                )}
                onClick={() => !notification.is_read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
