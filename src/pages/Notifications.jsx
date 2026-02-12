import React from 'react';
import Navbar from '../components/Navbar';

export default function Notifications() {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: 'Assignment Submitted',
      message: 'Your Math Project has been submitted successfully',
      type: 'success',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Exam Schedule Released',
      message: 'Board exams schedule for Class 10 is now available',
      type: 'info',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      title: 'Fee Payment Due',
      message: 'Your fee payment is due on Jan 31, 2026',
      type: 'warning',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      title: 'Grade Released',
      message: 'Your Science test grade has been released - A',
      type: 'success',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      title: 'Parent-Teacher Meeting',
      message: 'Scheduled for Jan 20, 2026 at 3:00 PM',
      type: 'info',
      time: '3 days ago',
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userRole="student" onLogout={() => {}} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {unreadCount} unread
          </span>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-2xl mb-2">🔔</p>
              <p className="text-gray-600 text-lg">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow p-6 flex items-start gap-4 hover:shadow-lg transition ${
                  !notification.read ? 'border-l-4 border-accent' : ''
                }`}
              >
                {/* Icon */}
                <div className={`text-2xl flex-shrink-0 ${
                  notification.type === 'success' ? '✅' :
                  notification.type === 'warning' ? '⚠️' :
                  'ℹ️'
                }`}>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    !notification.read ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-accent hover:opacity-90 text-sm font-medium"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <button className="mt-6 w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium">
            Clear All Notifications
          </button>
        )}
      </div>
    </div>
  );
}
