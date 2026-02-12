import React from 'react';

export default function QuickActions() {
  const actions = [
    { icon: '👨‍🎓', label: 'Add Student', color: 'bg-gray-100 text-accent' },
    { icon: '👨‍🏫', label: 'Add Teacher', color: 'bg-purple-100 text-purple-600' },
    { icon: '📢', label: 'Create Announcement', color: 'bg-green-100 text-green-600' },
    { icon: '📚', label: 'Create Class', color: 'bg-yellow-100 text-yellow-600' },
    { icon: '💰', label: 'Fee Collection', color: 'bg-pink-100 text-pink-600' },
    { icon: '➕', label: 'More Actions', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`${action.color} rounded-lg p-4 text-center hover:shadow-lg transition-shadow transform hover:scale-105 duration-200`}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <p className="text-xs font-medium">{action.label}</p>
        </button>
      ))}
    </div>
  );
}
