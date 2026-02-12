import React from 'react';

export default function FeeOverview() {
  const feeData = {
    totalCollected: '$2,45,000',
    pending: '$67,500',
    defaulters: 23,
    collectionRate: 78,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fee Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Total Fees Collected</p>
          <p className="text-2xl font-bold text-gray-900">{feeData.totalCollected}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm mb-2">Pending Fees</p>
          <p className="text-2xl font-bold text-gray-900">{feeData.pending}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-2">Defaulters</p>
          <p className="text-2xl font-bold text-gray-900">{feeData.defaulters}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Collection Rate</h3>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">Monthly Target Achievement</p>
          <p className="text-sm font-semibold text-gray-900">{feeData.collectionRate}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${feeData.collectionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Collections</h3>
        <div className="space-y-3">
          {[
            { class: 'Class 10-A', amount: '$3,200', date: 'Today' },
            { class: 'Class 9-B', amount: '$2,800', date: 'Yesterday' },
            { class: 'Class 12-A', amount: '$4,100', date: 'Jan 13' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.class}</p>
                <p className="text-xs text-gray-600">{item.date}</p>
              </div>
              <p className="font-semibold text-green-600">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
