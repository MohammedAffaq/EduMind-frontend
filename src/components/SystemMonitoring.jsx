import React from 'react';

export default function SystemMonitoring() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">System Monitoring</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Activity */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Login Activity (Last 24h)</h3>
          <div className="space-y-3">
            {[
              { role: 'Students', count: 1245, percentage: 85 },
              { role: 'Teachers', count: 142, percentage: 94 },
              { role: 'Parents', count: 567, percentage: 78 },
              { role: 'Admins', count: 12, percentage: 100 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-600">{item.role}</p>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.percentage >= 90 ? 'bg-green-500' :
                      item.percentage >= 70 ? 'bg-blue-500' :
                      item.percentage >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Usage Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">App Usage Summary</h3>
          <div className="space-y-3">
            {[
              { feature: 'Attendance Management', usage: 34 },
              { feature: 'Fee Management', usage: 28 },
              { feature: 'Assignment Submission', usage: 22 },
              { feature: 'Communication', usage: 16 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-600">{item.feature}</p>
                  <span className="text-sm font-semibold text-gray-900">{item.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.usage >= 90 ? 'bg-green-500' :
                      item.usage >= 70 ? 'bg-blue-500' :
                      item.usage >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">System Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Server Status', status: 'Healthy', color: 'bg-green-100 text-green-800', icon: '✓' },
            { label: 'Database', status: 'Healthy', color: 'bg-green-100 text-green-800', icon: '✓' },
            { label: 'Storage', status: '78% Used', color: 'bg-yellow-100 text-yellow-800', icon: '!' },
            { label: 'Backup Status', status: 'Complete', color: 'bg-green-100 text-green-800', icon: '✓' },
          ].map((item, index) => (
            <div key={index} className={`${item.color} rounded-lg p-4 text-center`}>
              <div className="text-2xl font-bold mb-2">{item.icon}</div>
              <p className="text-xs font-medium text-gray-700 mb-1">{item.label}</p>
              <p className="text-sm font-semibold">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent System Events */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent System Events</h3>
        <div className="space-y-2">
          {[
            { event: 'Database Backup Completed', time: '2 hours ago', severity: 'info' },
            { event: 'High Memory Usage Alert', time: '4 hours ago', severity: 'warning' },
            { event: 'SSL Certificate Renewed', time: '1 day ago', severity: 'info' },
            { event: 'Security Update Applied', time: '2 days ago', severity: 'success' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.severity === 'info' ? 'bg-info' :
                  item.severity === 'warning' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <p className="text-sm text-gray-700">{item.event}</p>
              </div>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
