import React from 'react';
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
  TrendingUp,
  UserCheck,
  UserX,
  User,
  Menu,
  Settings,
  Download,
  ShieldCheck,
  UserCog,
  Wrench
} from 'lucide-react';

const AttendancePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);
  const [attendanceActiveIndex, setAttendanceActiveIndex] = React.useState(null);
  const [showLowAttendance, setShowLowAttendance] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

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
    setIsLoaded(true);
  }, []);

  // Sample data for charts and tables
  const classAttendanceOverview = [
    { label: 'Class 1', value: 95 }, { label: 'Class 2', value: 92 },
    { label: 'Class 3', value: 90 }, { label: 'Class 4', value: 93 },
    { label: 'Class 5', value: 94 }, { label: 'Class 6', value: 89 },
    { label: 'Class 7', value: 91 }, { label: 'Class 8', value: 88 },
    { label: 'Class 9', value: 90 }, { label: 'Class 10', value: 92 },
  ];
  const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9"];

  const classAttendanceData = [
    { class: 'Class 10-A', totalStudents: 45, present: 42, absent: 3, percentage: 93 },
    { class: 'Class 9-B', totalStudents: 48, present: 44, absent: 4, percentage: 92 },
    { class: 'Class 11-C', totalStudents: 42, present: 38, absent: 4, percentage: 90 },
    { class: 'Class 8-A', totalStudents: 50, present: 47, absent: 3, percentage: 94 },
    { class: 'Class 7-B', totalStudents: 46, present: 41, absent: 5, percentage: 89 },
  ];

  const filteredClassAttendance = classAttendanceData.filter(row => {
    const matchesSearch = row.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLow = showLowAttendance ? row.percentage < 90 : true;
    return matchesSearch && matchesLow;
  });

  const exportChart = (chartId, fileName) => {
    const svgElement = document.getElementById(chartId)?.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.clientWidth * 2 || 1000;
      canvas.height = svgElement.clientHeight * 2 || 600;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${fileName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // Custom Simple Charts Components


/* SimpleBarChart replaced by shared SimplePieChart component */

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
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" active onClick={() => navigate('/admin/attendance')} />
          <NavItem icon={<Wrench size={20} />} label="Maintenance" onClick={() => navigate('/admin/maintenance')} />
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
        <header className="h-20 bg-card/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors border border-gray-200 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search for students, teachers, documents..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-sm text-text placeholder-text-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Bell size={28} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => navigate('/admin/profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 rounded-lg -ml-2 p-2 transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-text">{adminName}</p>
                <p className="text-xs text-text-secondary font-medium">Admin Administrator</p>
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
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-text mb-2">Attendance</h1>
              <p className="text-text-secondary">Monitor and manage student attendance across all classes</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard
                icon={<TrendingUp className="text-success" />}
                label="Average Attendance"
                value="92.8%"
                trend="+2.5%"
                color="bg-green-50 hover:bg-green-100"
              />
              <SummaryCard
                icon={<UserCheck className="text-success" />}
                label="Total Present"
                value="259"
                trend="+5.3%"
                color="bg-blue-50 hover:bg-blue-100"
              />
              <SummaryCard
                icon={<UserX className="text-danger" />}
                label="Total Absent"
                value="20"
                trend="-1.8%"
                color="bg-red-50 hover:bg-red-100"
              />
            </div>

            {/* Attendance Trend Chart */}
            <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-text">Class-Wise Attendance Overview</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => exportChart('attendance-trend-chart', 'attendance_trend')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" title="Export as PNG"><Download size={18} /></button>
                </div>
              </div>
              <div className="h-80 flex items-center">
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <SimplePieChart 
                    data={classAttendanceOverview} 
                    colors={COLORS} 
                    id="attendance-trend-chart" 
                    activeIndex={attendanceActiveIndex}
                    onHover={setAttendanceActiveIndex}
                    innerRadius={0.6}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-800">91.4%</span>
                    <span className="text-sm text-gray-500 font-medium">Avg Attendance</span>
                  </div>
                </div>
                <div className="w-1/2 pl-6">
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {classAttendanceOverview.map((d, idx) => (
                      <li key={idx} className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-colors ${attendanceActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setAttendanceActiveIndex(idx)} onMouseLeave={() => setAttendanceActiveIndex(null)}>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                          <span className="text-xs font-medium text-gray-700">{d.label}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-900">{d.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Attendance by Class Table */}
            <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-text">Attendance by Class</h3>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={showLowAttendance} 
                    onChange={(e) => setShowLowAttendance(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  Show Low Attendance (&lt;90%)
                </label>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 font-bold text-text-secondary text-sm">Class</th>
                      <th className="text-left py-3 px-4 font-bold text-text-secondary text-sm">Total Students</th>
                      <th className="text-left py-3 px-4 font-bold text-text-secondary text-sm">Present</th>
                      <th className="text-left py-3 px-4 font-bold text-text-secondary text-sm">Absent</th>
                      <th className="text-left py-3 px-4 font-bold text-text-secondary text-sm">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClassAttendance.map((row, index) => {
                      const rowColors = [
                        'bg-red-50 hover:bg-red-100',
                        'bg-green-50 hover:bg-green-100',
                        'bg-blue-50 hover:bg-blue-100',
                        'bg-orange-50 hover:bg-orange-100',
                        'bg-purple-50 hover:bg-purple-100'
                      ];
                      
                      let progressColor = 'bg-red-500';
                      let textColor = 'text-red-600';
                      if (row.percentage >= 90) {
                        progressColor = 'bg-green-500';
                        textColor = 'text-green-600';
                      } else if (row.percentage >= 70) {
                        progressColor = 'bg-blue-500';
                        textColor = 'text-blue-600';
                      } else if (row.percentage >= 50) {
                        progressColor = 'bg-orange-500';
                        textColor = 'text-orange-600';
                      }

                      return (
                      <tr key={index} className={`border-b border-gray-50 transition-colors ${rowColors[index % rowColors.length]}`}>
                        <td className="py-4 px-4 font-medium text-text">{row.class}</td>
                        <td className="py-4 px-4 text-text-secondary">{row.totalStudents}</td>
                        <td className="py-4 px-4 text-green-600 font-bold">{row.present}</td>
                        <td className="py-4 px-4 text-red-600 font-bold">{row.absent}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className={`font-bold ${textColor}`}>{row.percentage}%</span>
                            <div className="flex-1 bg-white/60 rounded-full h-2 border border-gray-100">
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ease-out ${progressColor}`}
                                style={{ width: isLoaded ? `${row.percentage}%` : '0%' }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
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

const SummaryCard = ({ icon, label, value, trend, color }) => (
  <div className={`bg-card p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${color}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3.5 rounded-xl ${color}`}>{icon}</div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${trend.includes('+') ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'}`}>{trend}</span>
    </div>
    <h4 className="text-text-secondary text-sm font-semibold mb-1">{label}</h4>
    <h2 className="text-2xl font-bold text-text">{value}</h2>
  </div>
);

export default AttendancePage;
