import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Truck, DollarSign, MoreHorizontal, ArrowUpRight, Clock, UserPlus, UserMinus, CheckCircle, XCircle, Calendar, Bell, TrendingUp, AlertTriangle, Menu, Search, LogOut, User, Bus, CalendarCheck, Wrench, Settings, ShieldCheck, FileText, UserCog, ChevronLeft, ChevronRight, Plus, X, ExternalLink, Copy, MessageSquare, Send, Book, Package, Map } from 'lucide-react';

// Reuse UserManagement component
import UserManagement from './UserManagement';
import SimplePieChart from '../components/SimplePieChart';
import SimpleLineChart from '../components/SimpleLineChart';
import HolidayCalendar from '../components/HolidayCalendar';
import { getFullName } from '../utils/userUtils';

const ModernAdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    teachers: 124,
    students: 2845,
    drivers: 42,
    revenue: 1200000
  });
  const [staffDistribution, setStaffDistribution] = useState([
    { label: 'Teachers', value: 124 },
    { label: 'Drivers', value: 42 },
    { label: 'Other Staff', value: 15 }
  ]);
  const [staffActiveIndex, setStaffActiveIndex] = useState(null);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([{ id: 1, title: 'Staff Meeting', date: new Date().toISOString().split('T')[0], type: 'meeting' }]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventSearch, setEventSearch] = useState('');
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'event' });
  const [liveAttendanceData, setLiveAttendanceData] = useState([
    { label: 'Present', value: 85 },
    { label: 'Absent', value: 15 }
  ]);
  const [classAttendanceActiveIndex, setClassAttendanceActiveIndex] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [newSystemNotification, setNewSystemNotification] = useState({
    title: '',
    message: '',
    audience: 'all'
  });
  const [sentNotifications, setSentNotifications] = useState([
    { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance on Saturday.', audience: 'All', date: '2024-03-10', status: 'Sent' },
    { id: 2, title: 'Exam Schedule Released', message: 'Final exam schedule is now available.', audience: 'Students', date: '2024-03-08', status: 'Sent' }
  ]);

  // Registration Modal States
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '', lastName: '', email: '', phone: '', rollNumber: '', className: ''
  });
  const [newParent, setNewParent] = useState({
    firstName: '', lastName: '', email: '', phone: ''
  });
  const [newTeacher, setNewTeacher] = useState({
    firstName: '', lastName: '', email: '', phone: '', designation: 'Teacher'
  });
  const [studentErrors, setStudentErrors] = useState({});
  const [parentErrors, setParentErrors] = useState({});
  const [teacherErrors, setTeacherErrors] = useState({});
  const [showStudentCredentialsModal, setShowStudentCredentialsModal] = useState(false);
  const [showParentCredentialsModal, setShowParentCredentialsModal] = useState(false);
  const [showTeacherCredentialsModal, setShowTeacherCredentialsModal] = useState(false);
  const [createdStudentCredentials, setCreatedStudentCredentials] = useState(null);
  const [createdParentCredentials, setCreatedParentCredentials] = useState(null);
  const [createdTeacherCredentials, setCreatedTeacherCredentials] = useState(null);
  const [isCopied, setIsCopied] = React.useState(false);

  // Validation Helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  useEffect(() => {
    // Simulate real-time attendance updates
    const interval = setInterval(() => {
      const present = 80 + Math.floor(Math.random() * 15);
      setLiveAttendanceData([
        { label: 'Present', value: present },
        { label: 'Absent', value: 100 - present }
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPendingRequests();
    fetchStats();
  }, []);

  useEffect(() => {
    setAdminName(getFullName());
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/users');
      const result = await response.json();
      if (result.success) {
        const teachers = result.users.filter(u => u.role === 'teacher').length;
        const students = result.users.filter(u => u.role === 'student').length;
        const staff = result.users.filter(u => u.role === 'staff');
        const drivers = staff.filter(u => u.designation === 'Driver').length;
        const otherStaff = staff.length - drivers;

        setStats(prev => ({
          ...prev,
          teachers: teachers || prev.teachers,
          students: students || prev.students,
          drivers: drivers || prev.drivers
        }));
        setStaffDistribution([
          { label: 'Teachers', value: teachers || 124 },
          { label: 'Drivers', value: drivers || 42 },
          { label: 'Other Staff', value: otherStaff || 15 }
        ]);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const fetchPendingRequests = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;
      if (!token) return;

      const response = await fetch('/api/student-requests', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setPendingRequests(result.requests.filter(req => req.status === 'pending'));
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;

      const response = await fetch(`/api/student-requests/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ note: 'Approved by admin' }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Request approved! A notification has been sent to the teacher and the registration is now valid.');
        fetchPendingRequests();
      } else {
        alert('Failed to approve request: ' + result.error);
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    const note = prompt('Please provide a reason for rejection:');
    if (!note) return;

    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;

      const response = await fetch(`/api/student-requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ note }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Request rejected successfully!');
        fetchPendingRequests();
      } else {
        alert('Failed to reject request: ' + result.error);
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  // Calendar Helpers
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setNewEvent({ ...newEvent, date: dateStr });
    setShowEventModal(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { id: Date.now(), ...newEvent }]);
      setShowEventModal(false);
      setNewEvent({ title: '', date: '', type: 'event' });
    }
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    const notification = {
      id: Date.now(),
      ...newSystemNotification,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };
    setSentNotifications([notification, ...sentNotifications]);
    setShowNotificationModal(false);
    setNewSystemNotification({ title: '', message: '', audience: 'all' });
    alert('Notification sent successfully!');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newStudent.firstName.trim()) errors.firstName = 'First name is required';
    if (!newStudent.lastName.trim()) errors.lastName = 'Last name is required';
    if (!newStudent.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(newStudent.email)) errors.email = 'Invalid email format';
    if (!newStudent.phone.trim()) errors.phone = 'Phone is required';
    else if (!validatePhone(newStudent.phone)) errors.phone = 'Phone must be 10 digits';
    if (!newStudent.rollNumber.trim()) errors.rollNumber = 'Roll number is required';
    if (!newStudent.className) errors.className = 'Class is required';

    if (Object.keys(errors).length > 0) {
      setStudentErrors(errors);
      return;
    }
    setStudentErrors({});
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;

      const response = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: newStudent.firstName,
          lastName: newStudent.lastName,
          email: newStudent.email,
          phone: newStudent.phone,
          rollNumber: newStudent.rollNumber,
          className: newStudent.className,
          role: 'student'
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('✅ Student registered successfully!');
        setCreatedStudentCredentials({
          email: newStudent.email,
          password: 'Sent via email',
          role: 'Student'
        });
        setShowStudentCredentialsModal(true);

        setShowStudentModal(false);
        setNewStudent({
          firstName: '', lastName: '', email: '', phone: '', rollNumber: '', className: ''
        });
        fetchStats(); // Refresh stats
      } else {
        if (result.error === 'Invalid token or authorization error.' ||
          result.error === 'Unauthorized. Admin access required.') {
          alert('Your session has expired. Please login again.');
          // Handle logout if needed
        } else {
          alert('Failed to register student: ' + result.error);
        }
      }
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleAddParent = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newParent.firstName.trim()) errors.firstName = 'First name is required';
    if (!newParent.lastName.trim()) errors.lastName = 'Last name is required';
    if (!newParent.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(newParent.email)) errors.email = 'Invalid email format';
    if (!newParent.phone.trim()) errors.phone = 'Phone is required';
    else if (!validatePhone(newParent.phone)) errors.phone = 'Phone must be 10 digits';

    if (Object.keys(errors).length > 0) {
      setParentErrors(errors);
      return;
    }
    setParentErrors({});
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;

      const response = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: newParent.firstName,
          lastName: newParent.lastName,
          email: newParent.email,
          phone: newParent.phone,
          role: 'parent'
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Parent registered successfully! Login credentials have been sent to the email.');
        setShowParentModal(false);
        setNewParent({
          firstName: '', lastName: '', email: '', phone: ''
        });
        fetchStats(); // Refresh stats
      } else {
        if (result.error === 'Invalid token or authorization error.' ||
          result.error === 'Unauthorized. Admin access required.' ||
          result.error === 'Invalid token') {
          alert('Your session has expired. Please login again.');
        } else {
          alert('Failed to register parent: ' + result.error);
        }
      }
    } catch (error) {
      console.error('Error registering parent:', error);
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newTeacher.firstName.trim()) errors.firstName = 'First name is required';
    if (!newTeacher.lastName.trim()) errors.lastName = 'Last name is required';
    if (!newTeacher.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(newTeacher.email)) errors.email = 'Invalid email format';
    if (!newTeacher.phone.trim()) errors.phone = 'Phone is required';
    else if (!validatePhone(newTeacher.phone)) errors.phone = 'Phone must be 10 digits';
    if (!newTeacher.designation) errors.designation = 'Designation is required';

    if (Object.keys(errors).length > 0) {
      setTeacherErrors(errors);
      return;
    }
    setTeacherErrors({});
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser?.token;

      const response = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: newTeacher.firstName,
          lastName: newTeacher.lastName,
          email: newTeacher.email,
          phone: newTeacher.phone,
          designation: newTeacher.designation,
          role: 'teacher'
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Teacher registered successfully! Login credentials have been sent to the email.');
        setShowTeacherModal(false);
        setNewTeacher({
          firstName: '', lastName: '', email: '', phone: '', designation: 'Teacher'
        });
        fetchStats(); // Refresh stats
      } else {
        alert('Failed to register teacher: ' + result.error);
      }
    } catch (error) {
      console.error('Error registering teacher:', error);
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const classAttendanceData = [
    { label: 'Class 1', value: 95 }, { label: 'Class 2', value: 92 },
    { label: 'Class 3', value: 90 }, { label: 'Class 4', value: 93 },
    { label: 'Class 5', value: 94 }, { label: 'Class 6', value: 89 },
    { label: 'Class 7', value: 91 }, { label: 'Class 8', value: 88 },
    { label: 'Class 9', value: 90 }, { label: 'Class 10', value: 92 },
  ];
  const CLASS_COLORS = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9"
  ];

  return (
    <div className="flex min-h-screen themed-bg font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B3C5D] border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img src="/assets/logo.png" alt="EduMind Logo" className="h-24 w-auto max-w-full object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <NavItem icon={<ShieldCheck size={20} />} label="Verification" active={activeView === 'verification'} onClick={() => setActiveView('verification')} badge={pendingRequests.length} />
          <NavItem icon={<UserCog size={20} />} label="User Management" active={activeView === 'users'} onClick={() => setActiveView('users')} />
          <NavItem icon={<GraduationCap size={20} />} label="Students" onClick={() => navigate('/admin/students')} />
          <NavItem icon={<Users size={20} />} label="Teachers" onClick={() => navigate('/admin/teachers')} />
          <NavItem icon={<User size={20} />} label="Parents" onClick={() => navigate('/admin/parents')} />
          <NavItem icon={<Bus size={20} />} label="Driver & Vehicles" onClick={() => navigate('/admin/drivers')} />
          <NavItem icon={<DollarSign size={20} />} label="Finance" onClick={() => navigate('/admin/finance')} />
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" onClick={() => navigate('/admin/attendance')} />
          <NavItem icon={<Wrench size={20} />} label="Maintenance" onClick={() => navigate('/admin/maintenance')} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/admin/settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogoutClick}
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
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex justify-between items-center px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-sm text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('system_notifications')}
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
        <main className="flex-1 overflow-y-auto p-8 themed-bg animate-fadeIn" key={activeView}>
          {activeView === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Page Title */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">Overview of school performance</p>
                </div>
                <p className="text-sm text-gray-400 hidden sm:block">Last updated: Today</p>
              </div>

              {/* Welcome Section */}
              <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#1F7AE0] to-[#0B3C5D] text-white p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{getGreeting()}, {adminName || 'Admin'}!</h2>
                    <p className="text-indigo-100 max-w-xl text-sm md:text-base leading-relaxed">
                      You have {pendingRequests.length} pending student requests and several items pending review today.
                    </p>
                  </div>
                  <button onClick={() => navigate('/admin/analytics')} className="bg-white text-[#1F7AE0] px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all">
                    View Reports
                  </button>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-20 w-40 h-40 bg-purple-400 opacity-10 rounded-full blur-2xl"></div>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4">
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch('/dev/impersonate/1769621480654');
                        const json = await res.json();
                        if (json.success) {
                          localStorage.setItem('currentUser', JSON.stringify({ id: json.user.id, token: json.token }));
                          localStorage.setItem('userRole', json.user.role);
                          localStorage.setItem('isLoggedIn', 'true');
                          localStorage.setItem('userName', `${json.user.firstName} ${json.user.lastName}`);
                          window.location.reload();
                        } else {
                          alert('Impersonation failed: ' + (json.error || 'Unknown'));
                        }
                      } catch (err) {
                        alert('Error during impersonation: ' + err.message);
                      }
                    }}
                    className="text-sm text-accent underline"
                  >
                    Dev: Impersonate Admin (development only)
                  </button>
                </div>
              )}

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-accent bg-opacity-10`}>
                      <Users size={24} className={`text-accent`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <ArrowUpRight size={12} />
                      12%
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Total Teachers</h3>
                  <p className="text-2xl font-bold text-gray-800">{stats.teachers}</p>
                </div>

                <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-purple-500 bg-opacity-10`}>
                      <GraduationCap size={24} className={`text-purple-500`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <ArrowUpRight size={12} />
                      5.2%
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
                  <p className="text-2xl font-bold text-gray-800">{stats.students.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-yellow-500 bg-opacity-10`}>
                      <Truck size={24} className={`text-yellow-500`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <ArrowUpRight size={12} />
                      2.1%
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Vehicles / Drivers</h3>
                  <p className="text-2xl font-bold text-gray-800">{stats.drivers}</p>
                </div>

                <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-green-500 bg-opacity-10`}>
                      <DollarSign size={24} className={`text-green-500`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <ArrowUpRight size={12} />
                      8.4%
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800">${(stats.revenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Class-Wise Attendance Analytics */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover-card">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Class-Wise Attendance (Class 1-10)</h3>
                  </div>
                  <div className="h-64 flex items-center">
                    <div className="flex-1 h-full flex items-center justify-center">
                      <SimplePieChart
                        data={classAttendanceData}
                        colors={CLASS_COLORS}
                        activeIndex={classAttendanceActiveIndex}
                        onHover={setClassAttendanceActiveIndex}
                        innerRadius={0.5}
                      />
                    </div>
                    <div className="w-1/2 pl-6">
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {classAttendanceData.map((d, idx) => (
                          <li key={idx} className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-colors ${classAttendanceActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setClassAttendanceActiveIndex(idx)} onMouseLeave={() => setClassAttendanceActiveIndex(null)}>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: CLASS_COLORS[idx % CLASS_COLORS.length] }} />
                              <span className="text-xs font-medium text-gray-700">{d.label}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-900">{d.value}%</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Staff Distribution */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover-card">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Staff Distribution by Role</h3>
                  </div>
                  <div className="h-64 flex items-center">
                    <div className="flex-1 h-full flex items-center justify-center">
                      <SimplePieChart
                        data={staffDistribution}
                        colors={['#3b82f6', '#f59e0b', '#10b981']}
                        activeIndex={staffActiveIndex}
                        onHover={setStaffActiveIndex}
                        innerRadius={0.5}
                      />
                    </div>
                    <div className="w-1/2 pl-6">
                      <ul className="space-y-2">
                        {staffDistribution.map((d, idx) => (
                          <li key={idx} className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-colors ${staffActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setStaffActiveIndex(idx)} onMouseLeave={() => setStaffActiveIndex(null)}>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: ['#3b82f6', '#f59e0b', '#10b981'][idx % 3] }} />
                              <span className="text-xs font-medium text-gray-700">{d.label}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-900">{d.value}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Attendance & Notices */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Live Attendance Card */}
                <div className="lg:col-span-2 bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover-card">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Live Attendance</h3>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <div className="h-64 flex items-center">
                    <div className="flex-1 h-full flex items-center justify-center">
                      <SimplePieChart
                        data={liveAttendanceData}
                        colors={['#10b981', '#ef4444']}
                        size={200}
                        innerRadius={0.6}
                      />
                    </div>
                    <div className="w-48 pl-6">
                      <ul className="space-y-4">
                        {liveAttendanceData.map((d, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className="text-sm font-medium text-gray-700">{d.label}</span>
                            </div>
                            <span className="font-bold text-gray-900">{d.value}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Notice Board */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover-card">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Notices</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="text-gray-900 font-semibold">Exam Schedule Released</h4>
                      <p className="text-gray-600 text-sm mt-1">Final exam schedule for the year has been published.</p>
                    </div>
                    <div className="border-l-4 border-info pl-4">
                      <h4 className="text-gray-900 font-semibold">System Maintenance</h4>
                      <p className="text-gray-600 text-sm mt-1">Scheduled platform maintenance on Sunday at 2 AM.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject-wise Performance */}
              <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 mb-8 hover-card">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Subject-wise Performance</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { subject: 'Mathematics', percentage: 92 },
                    { subject: 'Science', percentage: 88 },
                    { subject: 'English', percentage: 95 },
                    { subject: 'History', percentage: 85 },
                    { subject: 'Geography', percentage: 90 }
                  ].map((item, index) => {
                    const color = item.percentage >= 90 ? 'green' : item.percentage >= 85 ? 'yellow' : 'red';
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${color === 'green' ? 'bg-green-500' :
                              color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          <span className="font-medium text-gray-800">{item.subject}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${color === 'green' ? 'bg-green-500' :
                                  color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold text-sm ${color === 'green' ? 'text-green-600' :
                              color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setShowStudentModal(true)} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors"><UserPlus size={24} /></div>
                  <span className="font-semibold text-gray-700">Add Student</span>
                </button>
                <button onClick={() => setShowParentModal(true)} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                  <div className="p-3 bg-green-50 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors"><UserPlus size={24} /></div>
                  <span className="font-semibold text-gray-700">Add Parent</span>
                </button>
                <button onClick={() => setShowTeacherModal(true)} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors"><UserPlus size={24} /></div>
                  <span className="font-semibold text-gray-700">Add Teacher</span>
                </button>
                <button onClick={() => navigate('/admin/analytics')} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors"><FileText size={24} /></div>
                  <span className="font-semibold text-gray-700">Reports</span>
                </button>
              </div>

              {/* Holiday Calendar */}
              <HolidayCalendar />

            </div>
          )}

          {activeView === 'system_notifications' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">System Notifications</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage and broadcast announcements to users</p>
                </div>
                <button onClick={() => setShowNotificationModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Send size={18} /> Compose Notification
                </button>
              </div>

              <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sent Notifications History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 text-left">
                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Title</th>
                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Message</th>
                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Audience</th>
                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sentNotifications.map((notif) => (
                        <tr key={notif.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{notif.title}</td>
                          <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{notif.message}</td>
                          <td className="py-3 px-4 text-gray-600 capitalize">{notif.audience}</td>
                          <td className="py-3 px-4 text-gray-600">{notif.date}</td>
                          <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{notif.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeView === 'users' && (
            <div className="max-w-7xl mx-auto">
              <UserManagement onLogout={onLogout} />
            </div>
          )}

        </main>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add Event</h3>
              <button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g., Staff Meeting" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}>
                  <option value="event">General Event</option>
                  <option value="meeting">Meeting</option>
                  <option value="exam">Exam</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Add Event</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Student</h3>
              <button onClick={() => setShowStudentModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.firstName} onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} placeholder="John" />
                  {studentErrors.firstName && <p className="text-red-500 text-xs mt-1">{studentErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.lastName} onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} placeholder="Doe" />
                  {studentErrors.lastName && <p className="text-red-500 text-xs mt-1">{studentErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} placeholder="student@example.com" />
                {studentErrors.email && <p className="text-red-500 text-xs mt-1">{studentErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.phone} onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })} placeholder="9876543210" />
                {studentErrors.phone && <p className="text-red-500 text-xs mt-1">{studentErrors.phone}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.rollNumber} onChange={e => setNewStudent({ ...newStudent, rollNumber: e.target.value })} placeholder="12345" />
                  {studentErrors.rollNumber && <p className="text-red-500 text-xs mt-1">{studentErrors.rollNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                  <select required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStudent.className} onChange={e => setNewStudent({ ...newStudent, className: e.target.value })}>
                    <option value="">Select Class</option>
                    {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  {studentErrors.className && <p className="text-red-500 text-xs mt-1">{studentErrors.className}</p>}
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors">Register Student</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Parent Modal */}
      {showParentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Parent</h3>
              <button onClick={() => setShowParentModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddParent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" value={newParent.firstName} onChange={e => setNewParent({ ...newParent, firstName: e.target.value })} placeholder="John" />
                  {parentErrors.firstName && <p className="text-red-500 text-xs mt-1">{parentErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" value={newParent.lastName} onChange={e => setNewParent({ ...newParent, lastName: e.target.value })} placeholder="Doe" />
                  {parentErrors.lastName && <p className="text-red-500 text-xs mt-1">{parentErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" value={newParent.email} onChange={e => setNewParent({ ...newParent, email: e.target.value })} placeholder="parent@example.com" />
                {parentErrors.email && <p className="text-red-500 text-xs mt-1">{parentErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" value={newParent.phone} onChange={e => setNewParent({ ...newParent, phone: e.target.value })} placeholder="9876543210" />
                {parentErrors.phone && <p className="text-red-500 text-xs mt-1">{parentErrors.phone}</p>}
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors">Register Parent</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Teacher/Staff</h3>
              <button onClick={() => setShowTeacherModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" value={newTeacher.firstName} onChange={e => setNewTeacher({ ...newTeacher, firstName: e.target.value })} placeholder="John" />
                  {teacherErrors.firstName && <p className="text-red-500 text-xs mt-1">{teacherErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" value={newTeacher.lastName} onChange={e => setNewTeacher({ ...newTeacher, lastName: e.target.value })} placeholder="Doe" />
                  {teacherErrors.lastName && <p className="text-red-500 text-xs mt-1">{teacherErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" value={newTeacher.email} onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })} placeholder="teacher@example.com" />
                {teacherErrors.email && <p className="text-red-500 text-xs mt-1">{teacherErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" value={newTeacher.phone} onChange={e => setNewTeacher({ ...newTeacher, phone: e.target.value })} placeholder="9876543210" />
                {teacherErrors.phone && <p className="text-red-500 text-xs mt-1">{teacherErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                <select required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" value={newTeacher.designation} onChange={e => setNewTeacher({ ...newTeacher, designation: e.target.value })}>
                  <option value="Teacher">Teacher</option>
                  <option value="Principal">Principal</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Driver">Driver</option>
                  <option value="Security Guard">Security Guard</option>
                  <option value="Admin Assistant">Admin Assistant</option>
                  <option value="Other">Other</option>
                </select>
                {teacherErrors.designation && <p className="text-red-500 text-xs mt-1">{teacherErrors.designation}</p>}
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-colors">Register Teacher/Staff</button>
            </form>
          </div>
        </div>
      )}

      {/* Student Credentials Modal */}
      {showStudentCredentialsModal && createdStudentCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Registration Successful!</h3>
              <button onClick={() => setShowStudentCredentialsModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Student Registered Successfully</h4>
              <p className="text-gray-600 text-sm">Login credentials have been sent to the email address.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Login ID</p>
                  <p className="font-mono text-gray-900 font-medium">{createdStudentCredentials.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Password</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-gray-900 font-bold bg-white px-2 py-1 rounded border border-gray-200">{createdStudentCredentials.password}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdStudentCredentials.password);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isCopied ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-indigo-600 hover:bg-indigo-50'}`}
                      title="Copy Password"
                    >
                      {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowStudentCredentialsModal(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Parent Credentials Modal */}
      {showParentCredentialsModal && createdParentCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Registration Successful!</h3>
              <button onClick={() => setShowParentCredentialsModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Parent Registered Successfully</h4>
              <p className="text-gray-600 text-sm">Login credentials have been sent to the email address.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Login ID</p>
                  <p className="font-mono text-gray-900 font-medium">{createdParentCredentials.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Password</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-gray-900 font-bold bg-white px-2 py-1 rounded border border-gray-200">{createdParentCredentials.password}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdParentCredentials.password);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isCopied ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-indigo-600 hover:bg-indigo-50'}`}
                      title="Copy Password"
                    >
                      {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowParentCredentialsModal(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Teacher Credentials Modal */}
      {showTeacherCredentialsModal && createdTeacherCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Registration Successful!</h3>
              <button onClick={() => setShowTeacherCredentialsModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Teacher Registered Successfully</h4>
              <p className="text-gray-600 text-sm">Login credentials have been sent to the email address.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Login ID</p>
                  <p className="font-mono text-gray-900 font-medium">{createdTeacherCredentials.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Password</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-gray-900 font-bold bg-white px-2 py-1 rounded border border-gray-200">{createdTeacherCredentials.password}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdTeacherCredentials.password);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isCopied ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-indigo-600 hover:bg-indigo-50'}`}
                      title="Copy Password"
                    >
                      {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowTeacherCredentialsModal(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Send Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-popIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Compose Notification</h3>
              <button onClick={() => setShowNotificationModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newSystemNotification.title} onChange={e => setNewSystemNotification({ ...newSystemNotification, title: e.target.value })} placeholder="Notification Title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newSystemNotification.audience} onChange={e => setNewSystemNotification({ ...newSystemNotification, audience: e.target.value })}>
                  <option value="all">All Users</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                  <option value="parents">Parents</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4" value={newSystemNotification.message} onChange={e => setNewSystemNotification({ ...newSystemNotification, message: e.target.value })} placeholder="Type your message here..."></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"><Send size={18} /> Send Notification</button>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-popIn">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Logout?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
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

export default ModernAdminDashboard;
