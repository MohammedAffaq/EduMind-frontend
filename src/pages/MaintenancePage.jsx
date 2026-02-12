import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplePieChart from '../components/SimplePieChart';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Bus,
  DollarSign,
  CalendarCheck,
  LogOut,
  Search,
  Bell,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Menu,
  X,
  User,
  Settings,
  ShieldCheck,
  UserCog,
  Wrench,
  ArrowUpDown,
  Check
} from 'lucide-react';

const MaintenancePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    location: '',
    priority: 'Medium',
    status: 'Pending'
  });
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  React.useEffect(() => {
    const fetchAdminName = () => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setAdminName(storedName);
        return;
      }
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (registeredUsers.admin && registeredUsers.admin.firstName) {
          setAdminName(`${registeredUsers.admin.firstName} ${registeredUsers.admin.lastName}`);
        } else {
          setAdminName('Admin');
        }
      } catch (error) {
        console.error('Error fetching admin name:', error);
      }
    };
    fetchAdminName();
  }, []);

  React.useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/student-requests');
        const result = await response.json();
        if (result.success) {
          setPendingRequestsCount(result.requests.filter(req => req.status === 'pending').length);
        }
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };
    fetchPendingRequests();
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPriority, startDate, endDate]);

  // Sample data for maintenance
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: 'MR-001',
      title: 'Projector not working',
      location: 'Classroom 10-A',
      priority: 'High',
      status: 'Pending',
      date: '2024-01-15'
    },
    {
      id: 'MR-002',
      title: 'AC unit repair',
      location: 'Library',
      priority: 'Medium',
      status: 'In Progress',
      date: '2024-01-14'
    },
    {
      id: 'MR-003',
      title: 'Broken desk chair',
      location: 'Classroom 8-B',
      priority: 'Low',
      status: 'Completed',
      date: '2024-01-13'
    },
    {
      id: 'MR-004',
      title: 'WiFi connectivity issues',
      location: 'Computer Lab',
      priority: 'High',
      status: 'Pending',
      date: '2024-01-12'
    },
    {
      id: 'MR-005',
      title: 'Water leakage in bathroom',
      location: 'Floor 2 Bathroom',
      priority: 'Medium',
      status: 'In Progress',
      date: '2024-01-11'
    }
  ]);

  const handleAddRequest = (e) => {
    e.preventDefault();
    const request = {
      id: `MR-00${maintenanceRequests.length + 1}`,
      ...newRequest,
      date: new Date().toISOString().split('T')[0]
    };
    setMaintenanceRequests([request, ...maintenanceRequests]);
    setShowModal(false);
    setNewRequest({ title: '', location: '', priority: 'Medium', status: 'Pending' });
  };

  const handleStatusChange = (id, newStatus) => {
    setMaintenanceRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const handleMarkCompleted = (id) => {
    setMaintenanceRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Completed' } : req
    ));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  let filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'All' || request.priority === selectedPriority;
    
    const requestDate = new Date(request.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate = (!start || requestDate >= start) && (!end || requestDate <= end);

    return matchesSearch && matchesPriority && matchesDate;
  });

  if (sortConfig.key) {
    filteredRequests.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-gray-100 text-accent';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate status counts for pie chart
  const statusCounts = maintenanceRequests.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = [
    { label: 'Pending', value: statusCounts['Pending'] || 0 },
    { label: 'In Progress', value: statusCounts['In Progress'] || 0 },
    { label: 'Completed', value: statusCounts['Completed'] || 0 }
  ];

  return (
    <div className="flex h-screen themed-bg font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B3C5D] border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img src="/assets/logo.png" alt="EduMind Logo" className="h-24 w-auto max-w-full object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => navigate('/admin')} />
          <NavItem icon={<ShieldCheck size={20} />} label="Verification" onClick={() => navigate('/admin', { state: { activeView: 'verification' } })} badge={pendingRequestsCount} />
          <NavItem icon={<UserCog size={20} />} label="User Management" onClick={() => navigate('/admin', { state: { activeView: 'users' } })} />
          <NavItem icon={<GraduationCap size={20} />} label="Students" onClick={() => navigate('/admin/students')} />
          <NavItem icon={<Users size={20} />} label="Teachers" onClick={() => navigate('/admin/teachers')} />
          <NavItem icon={<User size={20} />} label="Parents" onClick={() => navigate('/admin/parents')} />
          <NavItem icon={<Bus size={20} />} label="Driver & Vehicles" onClick={() => navigate('/admin/drivers')} />
          <NavItem icon={<DollarSign size={20} />} label="Finance" onClick={() => navigate('/admin/finance')} />
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" onClick={() => navigate('/admin/attendance')} />
          <NavItem icon={<Wrench size={20} />} label="Maintenance" active onClick={() => navigate('/admin/maintenance')} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/admin/settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-gray-300 hover:text-red-400 hover:bg-red-900/30 w-full p-3 rounded-xl transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search maintenance requests..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-sm text-gray-600 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <Bell size={28} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => navigate('/admin/profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 rounded-lg -ml-2 p-2 transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{adminName}</p>
                <p className="text-xs text-gray-500 font-medium">Admin Administrator</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=c7d2fe&color=3730a3`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 themed-bg">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance</h1>
              <p className="text-gray-600">Track and manage maintenance requests across the school</p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard
                icon={<AlertTriangle className="text-yellow-600" />}
                label="Pending Requests"
                value={statusCounts['Pending'] || 0}
                color="bg-yellow-50"
              />
              <StatusCard
                icon={<Clock className="text-accent" />}
                label="In Progress"
                value={statusCounts['In Progress'] || 0}
                color="bg-info-50"
              />
              <StatusCard
                icon={<CheckCircle className="text-green-600" />}
                label="Completed"
                value={statusCounts['Completed'] || 0}
                color="bg-green-50"
              />
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Maintenance Status Overview</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex-shrink-0">
                  <SimplePieChart
                    data={pieChartData}
                    size={260}
                    colors={['#fbbf24', '#3b82f6', '#10b981']}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <ul className="space-y-3">
                    {pieChartData.map((item, index) => (
                      <li key={index} className="flex items-center justify-between gap-8 p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#fbbf24', '#3b82f6', '#10b981'][index] }}></span>
                          <span className="text-gray-700 font-medium">{item.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Maintenance Requests Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-gray-900">Maintenance Requests</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2 outline-none"
                      placeholder="Start Date"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2 outline-none"
                      placeholder="End Date"
                    />
                  </div>

                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={20} />
                    New Request
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('id')}>
                        <div className="flex items-center gap-1">
                          Request ID
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('title')}>
                        <div className="flex items-center gap-1">
                          Title
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('location')}>
                        <div className="flex items-center gap-1">
                          Location
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('priority')}>
                        <div className="flex items-center gap-1">
                          Priority
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('status')}>
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('date')}>
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((request, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-4 px-4 font-medium text-gray-900">{request.id}</td>
                        <td className="py-4 px-4 text-gray-700">{request.title}</td>
                        <td className="py-4 px-4 text-gray-600">{request.location}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-none outline-none cursor-pointer ${getStatusColor(request.status)}`}
                          >
                            <option value="Pending" className="bg-white text-gray-800">Pending</option>
                            <option value="In Progress" className="bg-white text-gray-800">In Progress</option>
                            <option value="Completed" className="bg-white text-gray-800">Completed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{request.date}</td>
                        <td className="py-4 px-4">
                          {request.status === 'Pending' && (
                            <button 
                              onClick={() => handleMarkCompleted(request.id)}
                              className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md hover:bg-green-100 transition-colors border border-green-200"
                            >
                              <Check size={12} /> Mark Completed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing {filteredRequests.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length} entries
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm border rounded-lg ${currentPage === index + 1
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">New Maintenance Request</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="e.g., Broken AC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                  placeholder="e.g., Library"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 font-medium"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${active ? 'bg-white/20 text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white font-medium'}`}
  >
    <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}>{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge > 0 && (
      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ring-2 ring-white">
        {badge}
      </span>
    )}
  </button>
);

const StatusCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    </div>
    <h4 className="text-gray-600 text-sm mb-2">{label}</h4>
    <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
  </div>
);

export default MaintenancePage;
