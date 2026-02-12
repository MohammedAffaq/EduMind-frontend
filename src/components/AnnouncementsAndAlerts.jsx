import React from 'react';

export default function AnnouncementsAndAlerts() {
  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      description: 'Scheduled for Jan 20, 2026',
      type: 'announcement',
      icon: '📢',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      description: 'Registrations open till Jan 25',
      type: 'announcement',
      icon: '🏆',
      time: '5 hours ago'
    },
    {
      id: 3,
      title: 'System Update',
      description: 'Scheduled maintenance tonight 11 PM - 2 AM',
      type: 'alert',
      icon: '⚠️',
      time: '1 hour ago'
    },
  ];

  const alerts = [
    {
      id: 1,
      title: 'Birthday Today',
      names: 'Aarjav Patel, Shreya Sharma',
      icon: '🎂',
      priority: 'info'
    },
    {
      id: 2,
      title: 'Pending Attendance Marks',
      names: '3 classes missing data',
      icon: '⏰',
      priority: 'warning'
    },
    {
      id: 3,
      title: 'Fee Default Alert',
      names: '15 students overdue',
      icon: '💳',
      priority: 'error'
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Announcements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Announcements</h2>
        
        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-l-4 ${
                item.type === 'announcement'
                  ? 'bg-info-50 border-info'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-accent hover:opacity-90 font-medium text-sm">
          View All Announcements →
        </button>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">System Alerts & Reminders</h2>
        
        <div className="space-y-4">
          {alerts.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-l-4 ${
                item.priority === 'info'
                  ? 'bg-info-50 border-info'
                  : item.priority === 'warning'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.names}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-2">UPCOMING DATES</p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between text-gray-700">
              <span>Board Exam Starts</span>
              <span className="font-medium">Feb 15</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Final Fee Deadline</span>
              <span className="font-medium">Jan 31</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Report Card Release</span>
              <span className="font-medium">Feb 1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
