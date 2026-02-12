import React from 'react';

export default function AttendanceSnapshot() {
  const studentAttendance = 92;
  const staffAttendance = 96;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Snapshot</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Attendance */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="transform -rotate-90" width="160" height="160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70 * (studentAttendance / 100)} ${2 * Math.PI * 70}`}
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-3xl font-bold text-gray-900">{studentAttendance}%</p>
              <p className="text-xs text-gray-600">Today</p>
            </div>
          </div>
          <p className="text-gray-700 font-medium text-center">Student Attendance</p>
          <p className="text-sm text-gray-600 text-center mt-2">1,250 / 1,350 present</p>
        </div>

        {/* Staff Attendance */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="transform -rotate-90" width="160" height="160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 70 * (staffAttendance / 100)} ${2 * Math.PI * 70}`}
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-3xl font-bold text-gray-900">{staffAttendance}%</p>
              <p className="text-xs text-gray-600">Today</p>
            </div>
          </div>
          <p className="text-gray-700 font-medium text-center">Staff Attendance</p>
          <p className="text-sm text-gray-600 text-center mt-2">145 / 150 present</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Weekly Trend</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t"
                style={{ height: `${75 + Math.random() * 20}%` }}
              ></div>
              <p className="text-xs text-gray-600">{day}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
