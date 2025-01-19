import React, { useState, useEffect } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Dummy data for notifications
    const dummyNotifications: Notification[] = [
      {
        id: 1,
        title: "New Message",
        message: "You have received a new message from John.",
        timestamp: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        title: "Project Update",
        message: "Your project proposal was accepted.",
        timestamp: "1 day ago",
        read: true,
      },
      {
        id: 3,
        title: "Reminder",
        message: "Don't forget to review your recent task.",
        timestamp: "3 days ago",
        read: true,
      },
    ];

    // Simulating data fetch
    setNotifications(dummyNotifications);

    // Uncomment this when fetching from backend
    /*
    fetch("/api/notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
    */
  }, []);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="relative group">
      {/* Bell Icon */}
      <button className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white hover:text-yellow-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5a2.25 2.25 0 11-4.5 0M18 8.25a6 6 0 10-12 0c0 3.011-1.084 4.87-2.074 5.872-.707.69-.926 1.731-.926 2.628h20c0-.897-.219-1.938-.926-2.628C19.084 13.12 18 11.261 18 8.25z"
          />
        </svg>
        {/* Notification Badge */}
        {notifications.some((notification) => !notification.read) && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      <div className="absolute right-0 mt-2 w-80 bg-white text-black shadow-lg rounded-md hidden group-hover:block z-10">
        <div className="p-4 font-medium border-b">Notifications</div>
        <ul className="max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <li className="p-4 text-gray-500 text-sm">No new notifications</li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 flex justify-between items-start ${
                  notification.read ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-gray-500">
                    {notification.timestamp}
                  </span>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-500 text-xs font-semibold"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
        {notifications.length > 0 && (
          <div className="p-4 text-center text-sm border-t">
            <button className="text-blue-500 hover:underline">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
