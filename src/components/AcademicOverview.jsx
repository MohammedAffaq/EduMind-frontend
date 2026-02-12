import React from 'react';

export default function AcademicOverview() {
  const academics = [
    { label: 'Total Classes', value: '24', icon: '📚' },
    { label: 'Total Sections', value: '48', icon: '📋' },
    { label: 'Total Subjects', value: '156', icon: '📖' },
    { label: 'Ongoing Exams', value: '12', icon: '✏️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Academic Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {academics.map((item, index) => (
          <div key={index} className="border-l-4 border-accent pl-4 py-2">
            <p className="text-gray-600 text-sm mb-1">{item.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Assignment Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Assigned This Week</span>
            <span className="font-semibold text-gray-900">87</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-semibold text-gray-900">57</span>
          </div>
        </div>
      </div>
    </div>
  );
}
