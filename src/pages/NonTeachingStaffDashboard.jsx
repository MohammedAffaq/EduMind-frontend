import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, LogOut, User, CheckSquare, Clock, Bell, MapPin, Truck, Calendar,
  DollarSign, ClipboardList, BookOpen, Users, Shield,
  AlertTriangle, CheckCircle, Search, Plus,
  Phone, Mail, Briefcase, Menu,
  AlertOctagon, Wrench, RotateCcw
} from 'lucide-react';
import { getUser, getFullName } from '../utils/userUtils';

// --- Helper Functions ---
const getEffectiveRole = (user) => {
  if (!user) return 'staff';
  console.log('getEffectiveRole - user:', user); // Debug log

  // If role is generic 'staff', fallback to designation
  if (user.role === 'staff' && user.designation) {
    const designation = user.designation.toLowerCase().replace(/\s+/g, '-');
    console.log('getEffectiveRole - derived from designation:', designation);
    return designation;
  }

  // If staffType is non-teaching, try to use designation or fallback
  if (user.staffType === 'non-teaching') {
    if (user.designation) {
      const designation = user.designation.toLowerCase().replace(/\s+/g, '-');
      console.log('getEffectiveRole - non-teaching staff, using designation:', designation);
      return designation;
    }
    // If no designation but is non-teaching, can default to a general non-teaching view or pick a default
    console.log('getEffectiveRole - non-teaching staff, no designation, defaulting to staff');
    return 'staff';
  }

  const role = user.role ? user.role.toLowerCase() : 'staff';
  console.log('getEffectiveRole - standard role:', role);
  return role;
};

// --- Common Components ---

const WelcomeCard = ({ user, roleLabel }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold">Welcome, {user.firstName || 'Staff'}!</h2>
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide border border-white/30">
          {roleLabel}
        </span>
      </div>
      <p className="text-indigo-100 opacity-90 mb-4">Manage your daily tasks and schedule effectively.</p>
      <div className="text-sm font-medium bg-white/10 inline-block px-3 py-1 rounded-lg">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
      <Briefcase size={150} />
    </div>
  </div>
);

const QuickStatsCards = ({ role }) => {
  // Dynamic stats based on role could be implemented here
  const stats = [
    { icon: <ClipboardList size={20} className="text-blue-600" />, label: 'Pending Tasks', value: '5' },
    { icon: <Bell size={20} className="text-orange-600" />, label: 'Notifications', value: '3' },
    { icon: <CheckCircle size={20} className="text-green-600" />, label: 'Completed', value: '12' },
    { icon: <Clock size={20} className="text-purple-600" />, label: 'Hours', value: '6.5h' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            {stat.icon}
            <span className="text-xs font-medium uppercase">{stat.label}</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

const AttendanceCard = () => {
  const [status, setStatus] = useState('Not Checked In');
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    setStatus('Present');
    setCheckInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleCheckOut = () => {
    setStatus('Completed');
    setCheckOutTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
        <Clock size={16} /> Daily Attendance
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Present' ? 'bg-green-100 text-green-800' :
            status === 'Completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
            {status}
          </span>
        </div>

        {checkInTime && (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
            <span className="text-xs text-gray-600">In:</span>
            <span className="text-sm font-bold text-green-700">{checkInTime}</span>
          </div>
        )}

        {checkOutTime && (
          <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
            <span className="text-xs text-gray-600">Out:</span>
            <span className="text-sm font-bold text-blue-700">{checkOutTime}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={handleCheckIn}
            disabled={status === 'Present' || status === 'Completed'}
            className="bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={status !== 'Present'}
            className="bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ user, roleLabel }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">My Profile</h3>
    <div className="text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-2xl mx-auto mb-3 border-4 border-white shadow-md">
        {user.firstName ? user.firstName.charAt(0) : 'U'}
      </div>
      <p className="text-lg font-bold text-gray-900">{getFullName()}</p>
      <p className="text-sm text-indigo-600 font-medium mb-4 capitalize">{roleLabel}</p>

      <div className="space-y-2 text-left bg-gray-50 p-3 rounded-xl mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Mail size={14} /> {user.email || 'No email'}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone size={14} /> {user.phone || 'No phone'}
        </div>
      </div>

      <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors">
        Edit Profile
      </button>
    </div>
  </div>
);

// --- Role Specific Components ---

// 1. Driver Dashboard
const DriverDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Truck size={20} className="text-indigo-600" /> Vehicle & Route
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <span className="text-gray-500 text-sm">Vehicle No.</span>
            <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">KA-01-AB-1234</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-50 pb-2">
            <span className="text-gray-500 text-sm">Route</span>
            <span className="font-medium text-gray-900">Route 5 (North Zone)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="text-green-600 font-bold text-sm flex items-center gap-1"><CheckCircle size={14} /> Active</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-indigo-600" /> Trip Control
        </h3>
        <div className="flex gap-3 mb-4">
          <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">Start Trip</button>
          <button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200">End Trip</button>
        </div>
        <p className="text-xs text-gray-400 text-center">Last trip ended at 09:30 AM</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4">Trip Schedule</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 font-medium rounded-l-lg">Time</th>
              <th className="px-4 py-3 font-medium">Activity</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium rounded-r-lg">Students</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr>
              <td className="px-4 py-3 font-bold text-indigo-600">07:00 AM</td>
              <td className="px-4 py-3">Morning Pickup</td>
              <td className="px-4 py-3 text-gray-500">Central Park Stop</td>
              <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">12 Students</span></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-bold text-indigo-600">02:30 PM</td>
              <td className="px-4 py-3">Afternoon Drop</td>
              <td className="px-4 py-3 text-gray-500">School Campus</td>
              <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">12 Students</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 2. Accountant Dashboard
const AccountantDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1 font-medium">Total Collected (Today)</p>
        <h3 className="text-3xl font-bold text-green-600">$12,500</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1 font-medium">Pending Dues</p>
        <h3 className="text-3xl font-bold text-orange-500">$45,200</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1 font-medium">Transactions</p>
        <h3 className="text-3xl font-bold text-indigo-600">24</h3>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><DollarSign size={20} className="text-indigo-600" /> Recent Transactions</h3>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b border-gray-100">
            <tr>
              <th className="pb-3 font-medium">Student / Payer</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Mode</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'John Doe (Parent)', date: 'Today, 10:30 AM', amount: '$1,200', mode: 'UPI', status: 'Success' },
              { name: 'Sarah Smith', date: 'Today, 09:15 AM', amount: '$450', mode: 'Cash', status: 'Pending' },
              { name: 'Mike Ross', date: 'Yesterday', amount: '$2,000', mode: 'Cheque', status: 'Cleared' },
            ].map((tx, i) => (
              <tr key={i}>
                <td className="py-3 font-medium text-gray-900">{tx.name}</td>
                <td className="py-3 text-gray-500">{tx.date}</td>
                <td className="py-3 font-bold text-gray-800">{tx.amount}</td>
                <td className="py-3 text-gray-500">{tx.mode}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Success' || tx.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 3. Peon / Attender Dashboard
const PeonDashboard = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ClipboardList size={20} className="text-indigo-600" /> Assigned Tasks
      </h3>
      <div className="space-y-4">
        {[
          { task: 'Distribute Exam Papers to Hall A', priority: 'High', status: 'Pending', time: '10:00 AM' },
          { task: 'Collect Files from Principal Office', priority: 'Medium', status: 'In Progress', time: '11:30 AM' },
          { task: 'Arrange Chairs in Staff Room', priority: 'Low', status: 'Done', time: '09:00 AM' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
            <div className={`w-3 h-3 rounded-full mr-4 ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
            <div className="flex-1">
              <h4 className={`font-semibold text-gray-900 ${item.status === 'Done' ? 'line-through text-gray-400' : ''}`}>{item.task}</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> Due: {item.time}</p>
            </div>
            {item.status !== 'Done' ? (
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">
                Mark Done
              </button>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">Completed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 4. Cleaning Staff Dashboard
const CleaningDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MapPin size={20} className="text-indigo-600" /> Assigned Area</h3>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
          <h4 className="text-xl font-bold text-blue-800">Block A - 2nd Floor</h4>
          <p className="text-blue-600 text-sm">Classrooms 201 - 205, Staff Room</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase font-bold">Shift</p>
            <p className="font-bold text-gray-900">Morning</p>
          </div>
          <div className="flex-1 text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase font-bold">Supervisor</p>
            <p className="font-bold text-gray-900">Mr. Ramesh</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><CheckSquare size={20} className="text-indigo-600" /> Checklist</h3>
        <div className="space-y-2">
          {['Sweep Corridors', 'Clean Windows (Room 201)', 'Empty Trash Bins', 'Mop Floor (Staff Room)'].map((task, idx) => (
            <label key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-gray-700 font-medium">{task}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 5. Librarian Dashboard
const LibrarianDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-xs font-bold uppercase mb-1">Books Issued</p>
        <h3 className="text-2xl font-bold text-indigo-600">142</h3>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-xs font-bold uppercase mb-1">Overdue</p>
        <h3 className="text-2xl font-bold text-red-500">12</h3>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-xs font-bold uppercase mb-1">New Arrivals</p>
        <h3 className="text-2xl font-bold text-green-600">45</h3>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={20} className="text-indigo-600" /> Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-colors border border-indigo-100">
            <Plus size={24} className="mb-2" /> Issue Book
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-purple-50 text-purple-700 rounded-xl font-bold hover:bg-purple-100 transition-colors border border-purple-100">
            <RotateCcw size={24} className="mb-2" /> Return Book
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-red-600"><AlertTriangle size={20} /> Overdue Alerts</h3>
        <div className="space-y-3">
          {[
            { name: 'Rahul (Class 10-A)', book: 'Physics Vol. 1', days: '3 Days Late' },
            { name: 'Sneha (Class 8-B)', book: 'History of World', days: '1 Day Late' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">{item.book}</p>
              </div>
              <span className="text-xs font-bold text-red-700 bg-white px-2 py-1 rounded border border-red-200">{item.days}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);



// 6. Receptionist Dashboard
const ReceptionistDashboard = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={20} className="text-indigo-600" /> Visitor Log</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2">
          <Plus size={16} /> New Visitor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b border-gray-100">
            <tr>
              <th className="pb-3 font-medium">Visitor Name</th>
              <th className="pb-3 font-medium">Purpose</th>
              <th className="pb-3 font-medium">In Time</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'Mr. Sharma', purpose: 'Admission Enquiry', time: '09:30 AM', status: 'Checked Out' },
              { name: 'Mrs. Verma', purpose: 'Meet Principal', time: '10:15 AM', status: 'Inside' },
            ].map((v, i) => (
              <tr key={i}>
                <td className="py-3 font-medium text-gray-900">{v.name}</td>
                <td className="py-3 text-gray-500">{v.purpose}</td>
                <td className="py-3 text-gray-500">{v.time}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${v.status === 'Inside' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{v.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-indigo-600" /> Appointments</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm font-bold text-blue-900">11:00 AM — Principal</p>
            <p className="text-xs text-blue-700">Parent Meeting (Grade 5)</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-sm font-bold text-purple-900">02:00 PM — Vice Principal</p>
            <p className="text-xs text-purple-700">Vendor Meeting (Stationery)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Phone size={20} className="text-indigo-600" /> Enquiries</h3>
        <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-xl">
          <span className="text-gray-600 text-sm font-medium">New Enquiries (Today)</span>
          <span className="font-bold text-gray-900 text-lg">5</span>
        </div>
        <button className="w-full text-indigo-600 bg-indigo-50 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">Manage Enquiries</button>
      </div>
    </div>
  </div>
);

// 7. Security Dashboard
const SecurityDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Shield size={20} className="text-indigo-600" /> Gate Status</h3>
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
          <div>
            <p className="text-lg font-bold text-green-800">Main Gate</p>
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Open for Entry</p>
          </div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors border border-red-200">Close Gate</button>
          <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors border border-gray-200">Log Entry</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-red-600"><AlertOctagon size={20} /> Incident Report</h3>
        <textarea className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200 mb-3 bg-gray-50" rows="3" placeholder="Describe incident details..."></textarea>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">Submit Report</button>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4">Recent Entries</h3>
      <div className="space-y-3">
        {[
          { id: 'KA-05-AB-9999', type: 'Vehicle', time: '10:05 AM', status: 'Entry' },
          { id: 'John Doe (Visitor)', type: 'Person', time: '10:10 AM', status: 'Entry' },
          { id: 'KA-01-EQ-1122', type: 'School Bus', time: '10:15 AM', status: 'Exit' },
        ].map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">{entry.id}</p>
              <p className="text-xs text-gray-500">{entry.type}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{entry.time}</p>
              <span className={`text-[10px] font-bold uppercase ${entry.status === 'Entry' ? 'text-green-600' : 'text-orange-600'}`}>{entry.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Default Component for unhandled roles
const DefaultStaffDashboard = () => (
  <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
      <Briefcase size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">General Staff Dashboard</h3>
    <p className="text-gray-500 max-w-md mx-auto">Your specific role dashboard is being configured. Access shared features from the sidebar.</p>
  </div>
);

// --- New Views ---

const ScheduleView = ({ role }) => {
  const scheduleItems = [
    { time: '09:00 AM', title: 'Morning Briefing', type: 'meeting' },
    { time: '10:30 AM', title: 'Task Execution', type: 'work' },
    { time: '01:00 PM', title: 'Lunch Break', type: 'break' },
    { time: '02:00 PM', title: 'Afternoon Shift', type: 'work' },
    { time: '04:30 PM', title: 'Daily Report Submission', type: 'admin' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar size={20} className="text-indigo-600" /> My Schedule
        </h3>
        <div className="space-y-6">
          {scheduleItems.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                {idx !== scheduleItems.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
              </div>
              <div className="pb-6">
                <p className="text-sm font-bold text-gray-900">{item.time}</p>
                <p className="text-gray-600">{item.title}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded uppercase font-bold tracking-wider">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NotificationsView = ({ notifications }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-indigo-600" /> Notifications
        </h3>
        <button className="text-sm text-indigo-600 font-bold hover:underline">Mark all as read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-xl border transition-all hover:shadow-sm ${n.read ? 'bg-white border-gray-100' : 'bg-indigo-50 border-indigo-100'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              </div>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-4">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NonTeachingStaffDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Added state
  const [currentUser, setCurrentUser] = useState(getUser() || {});
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Meeting Reminder', message: 'Staff meeting at 2:00 PM', time: '10 min ago', read: false },
    { id: 2, title: 'Task Update', message: 'Inventory audit completed', time: '1 hour ago', read: true },
  ]);

  // Keep user data in sync
  useEffect(() => {
    const user = getUser();
    if (user) setCurrentUser(user);
    console.log('NonTeachingStaffDashboard - Loaded User:', user);

    // Set favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = '/favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
    link.href = '/favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const role = getEffectiveRole(currentUser);
  console.log('NonTeachingStaffDashboard - Effective Role:', role);
  const roleLabel = role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const renderContent = () => {
    console.log('Rendering content for role:', role, 'View:', activeView);
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto space-y-8">
            <WelcomeCard user={currentUser} roleLabel={roleLabel} />
            <QuickStatsCards role={role} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Role Specific Content - Takes 2/3 width on large screens */}
              <div className="lg:col-span-2 space-y-8">
                {role === 'driver' && <DriverDashboard />}
                {role === 'accountant' && <AccountantDashboard />}
                {(role === 'peon' || role === 'attender') && <PeonDashboard />}
                {(role === 'cleaning' || role === 'cleaning-staff' || role === 'cleaner') && <CleaningDashboard />}
                {role === 'librarian' && <LibrarianDashboard />}
                {role === 'receptionist' && <ReceptionistDashboard />}
                {role === 'security' && <SecurityDashboard />}
                {/* Fallback - ensure this covers all cases where a specific dashboard isn't found */}
                {!['driver', 'accountant', 'peon', 'attender', 'cleaning', 'cleaning-staff', 'cleaner', 'librarian', 'receptionist', 'security'].includes(role) && <DefaultStaffDashboard />}
              </div>

              {/* Sidebar Widgets - Takes 1/3 width */}
              <div className="space-y-8">
                <AttendanceCard />
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell size={16} /> Notifications</h3>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map(n => (
                      <div key={n.id} className={`text-sm p-3 rounded-lg border ${n.read ? 'bg-white border-gray-100' : 'bg-indigo-50 border-indigo-100'}`}>
                        <p className="font-semibold text-gray-900">{n.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto">
            <ProfileCard user={currentUser} roleLabel={roleLabel} />
          </div>
        );
      case 'schedule':
        return <ScheduleView role={role} />;
      case 'notifications':
        return <NotificationsView notifications={notifications} />;

      default:
        return (
          <div className="p-12 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full text-gray-400 mb-4">
              <Wrench size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-gray-500">The requested view does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="EduMind Logo" className="h-32 w-auto max-w-full object-contain" />
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'schedule', label: 'My Schedule', icon: Calendar },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'profile', label: 'My Profile', icon: User },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 w-full group ${activeView === item.id
                ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm ring-1 ring-indigo-100'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
            >
              <item.icon size={20} className={activeView === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="flex-1 text-left">{item.label}</span>
              {activeView === item.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogoutClick} className="flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 w-full p-3 rounded-xl transition-colors duration-200 font-medium">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">{roleLabel} Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-900">{getFullName()}</p>
              <p className="text-xs text-gray-500 font-medium capitalize">{roleLabel}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md cursor-pointer" onClick={() => setActiveView('profile')}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-indigo-700 font-bold">
                {currentUser.firstName ? currentUser.firstName.charAt(0) : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-scaleIn">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <LogOut size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonTeachingStaffDashboard;