import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import QRCodeDisplay from '../components/QRCodeDisplay';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Bus,
  DollarSign,
  CalendarCheck,
  LogOut,
  Search,
  Bell,
  Menu,
  QrCode,
  Camera,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  Settings,
  ShieldCheck,
  UserCog,
  Wrench
} from 'lucide-react';

const QRAttendancePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' or 'codes'
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [scannedUsers, setScannedUsers] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    total: 0
  });

  // Mock user data with QR codes
  const [users] = useState([
    {
      id: 'STU001',
      name: 'John Doe',
      role: 'student',
      class: 'Class 10-A',
      qrValue: 'STU001:John Doe:student:Class 10-A',
      status: 'present'
    },
    {
      id: 'TEA001',
      name: 'Sarah Wilson',
      role: 'teacher',
      subject: 'Mathematics',
      qrValue: 'TEA001:Sarah Wilson:teacher:Mathematics',
      status: 'present'
    },
    {
      id: 'STA001',
      name: 'Mike Johnson',
      role: 'staff',
      designation: 'Driver',
      qrValue: 'STA001:Mike Johnson:staff:Driver',
      status: 'absent'
    },
    {
      id: 'PAR001',
      name: 'Emma Davis',
      role: 'parent',
      qrValue: 'PAR001:Emma Davis:parent',
      status: 'present'
    }
  ]);

  useEffect(() => {
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

    // Calculate attendance stats
    const present = users.filter(u => u.status === 'present').length;
    const absent = users.filter(u => u.status === 'absent').length;
    setAttendanceStats({
      present,
      absent,
      total: users.length
    });
  }, [users]);

  useEffect(() => {
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

  const handleScanSuccess = async (qrData, decodedResult) => {
    try {
      // Send QR data to backend for attendance marking
      const response = await fetch('http://localhost:5000/api/attendance/qr-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ qrData })
      });

      const result = await response.json();

      if (response.ok) {
        // Update local state
        setScannedUsers(prev => [...prev, {
          userId: result.user.id,
          name: result.user.name,
          role: result.user.role,
          timestamp: new Date().toISOString(),
          status: 'present'
        }]);

        // Update attendance stats
        setAttendanceStats(prev => ({
          ...prev,
          present: prev.present + 1,
          absent: Math.max(0, prev.absent - 1)
        }));

        console.log('Attendance marked:', result);
        alert(`Attendance marked for ${result.user.name} (${result.user.role})`);
      } else {
        alert(result.message || 'Failed to mark attendance');
      }

    } catch (error) {
      console.error('Error processing scan:', error);
      alert('Error processing QR code. Please check your connection.');
    }
  };

  const handleScanError = (error) => {
    console.error('Scan error:', error);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <GraduationCap size={16} />;
      case 'teacher': return <Users size={16} />;
      case 'staff': return <UserCog size={16} />;
      case 'parent': return <Users size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getStatusColor = (status) => {
    return status === 'present' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  return (
    <div className="flex h-screen themed-bg font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
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
          <NavItem icon={<QrCode size={20} />} label="QR Attendance" active onClick={() => navigate('/admin/qr-attendance')} />
          <NavItem icon={<Wrench size={20} />} label="Maintenance" onClick={() => navigate('/admin/maintenance')} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/admin/settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full p-3 rounded-xl transition-colors duration-200"
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
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-sm text-gray-600 placeholder-gray-400"
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Code Attendance</h1>
              <p className="text-gray-600">Scan QR codes to mark attendance automatically</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'scanner'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Camera className="inline mr-2" size={18} />
                  QR Scanner
                </button>
                <button
                  onClick={() => setActiveTab('codes')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'codes'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <QrCode className="inline mr-2" size={18} />
                  User QR Codes
                </button>
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{attendanceStats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Present Today</p>
                    <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <UserCheck className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Absent Today</p>
                    <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-full">
                    <UserX className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'scanner' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">QR Code Scanner</h2>
                  <p className="text-gray-600">Scan user QR codes to mark attendance</p>
                </div>
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                  isActive={true}
                />
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">User QR Codes</h2>
                  <p className="text-gray-600 mb-6">View and download QR codes for all registered users</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                      <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(user.role)}
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </div>
                        </div>

                        <QRCodeDisplay
                          value={user.qrValue}
                          size={120}
                          title={`${user.name}'s QR Code`}
                        />

                        <div className="mt-4 text-xs text-gray-500">
                          <p><strong>ID:</strong> {user.id}</p>
                          <p><strong>Role:</strong> {user.role}</p>
                          {user.class && <p><strong>Class:</strong> {user.class}</p>}
                          {user.subject && <p><strong>Subject:</strong> {user.subject}</p>}
                          {user.designation && <p><strong>Designation:</strong> {user.designation}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Scans */}
                {scannedUsers.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Attendance Scans</h3>
                    <div className="space-y-3">
                      {scannedUsers.slice(-5).reverse().map((scan, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="text-green-600" size={20} />
                            <div>
                              <p className="font-medium text-gray-900">{scan.name}</p>
                              <p className="text-sm text-gray-600 capitalize">{scan.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">Present</p>
                            <p className="text-xs text-gray-500">
                              {new Date(scan.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${active ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
  >
    <span className={`flex-shrink-0 ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600 transition-colors'}`}>{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge > 0 && (
      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ring-2 ring-white">
        {badge}
      </span>
    )}
  </button>
);

export default QRAttendancePage;
