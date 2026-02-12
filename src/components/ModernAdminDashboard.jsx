import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

const ModernAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [recentActivities, setRecentActivities] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalStaff: 0,
    totalParents: 0,
    todayAttendance: 0,
    pendingApprovals: 0
  });

  // Mock data - replace with API calls
  useEffect(() => {
    // Simulate API calls
    setSystemStats({
      totalUsers: 1250,
      activeUsers: 1180,
      totalStudents: 800,
      totalTeachers: 120,
      totalStaff: 80,
      totalParents: 250,
      todayAttendance: 92.5,
      pendingApprovals: 15
    });

    setRecentActivities([
      { id: 1, type: 'login', user: 'John Doe', role: 'student', time: '2 minutes ago', status: 'success' },
      { id: 2, type: 'registration', user: 'Sarah Wilson', role: 'parent', time: '5 minutes ago', status: 'pending' },
      { id: 3, type: 'attendance', user: 'Mike Johnson', role: 'teacher', time: '10 minutes ago', status: 'marked' },
      { id: 4, type: 'login', user: 'Emma Davis', role: 'admin', time: '15 minutes ago', status: 'success' },
      { id: 5, type: 'registration', user: 'Alex Brown', role: 'student', time: '20 minutes ago', status: 'approved' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp size={14} className="mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'login': return <UserCheck size={16} />;
        case 'registration': return <Plus size={16} />;
        case 'attendance': return <CheckCircle size={16} />;
        default: return <Activity size={16} />;
      }
    };

    const getActivityColor = (status) => {
      switch (status) {
        case 'success': return 'text-green-600 bg-green-50';
        case 'pending': return 'text-yellow-600 bg-yellow-50';
        case 'approved': return 'text-blue-600 bg-blue-50';
        case 'marked': return 'text-purple-600 bg-purple-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.user} ({activity.role})
          </p>
          <p className="text-xs text-gray-500 capitalize">{activity.type} • {activity.time}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.status)}`}>
          {activity.status}
        </div>
      </div>
    );
  };

  const UserManagementTable = () => {
    const [users] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastLogin: '2 hours ago', qrCode: 'QR001' },
      { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'teacher', status: 'active', lastLogin: '1 hour ago', qrCode: 'QR002' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'staff', status: 'inactive', lastLogin: '1 day ago', qrCode: 'QR003' },
      { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'parent', status: 'active', lastLogin: '30 mins ago', qrCode: 'QR004' }
    ]);

    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole;
