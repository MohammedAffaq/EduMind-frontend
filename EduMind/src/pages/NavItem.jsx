import React from 'react';

const NavItem = ({ icon, label, active, onClick, badge, expandIcon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${
      active ? 'bg-indigo-600 text-white font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white font-medium'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}>{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {expandIcon && expandIcon}
    {badge > 0 && (
      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ring-2 ring-white">
        {badge}
      </span>
    )}
  </button>
);

export default NavItem;
