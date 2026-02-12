import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import EduMindHomepage from './pages/EduMindHomepage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import SchoolCalendarPage from './pages/SchoolCalendarPage';
import ContactPage from './pages/ContactPage';
import HomeworkPage from './pages/HomeworkPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import NonTeachingStaffDashboard from './pages/NonTeachingStaffDashboard';
import UserManagement from './pages/UserManagement';
import ModernAdminDashboard from './pages/ModernAdminDashboard';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import NotificationsPage from './pages/NotificationsPage';
import AttendancePage from './pages/AttendancePage';
import FinancePage from './pages/FinancePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MaintenancePage from './pages/MaintenancePage';
import DriversPage from './pages/DriversPage';
import CalendarPage from './pages/CalendarPage';
import Settings from './pages/Settings';
import AdminProfilePage from './pages/AdminProfilePage';
import ThemeProvider from './context/ThemeContext';
import { logout } from './utils/auth';


function App() {
  const handleLogout = () => {
    logout();
  };

  const StaffDashboardWrapper = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const nonTeachingRoles = ['driver', 'accountant', 'peon', 'cleaning', 'cleaning-staff', 'cleaner', 'librarian', 'receptionist', 'security', 'office-staff'];

    // Check if staffType is explicitly non-teaching OR if the designation is in the non-teaching list
    // OR if the role itself is in the non-teaching list
    if (
      user.staffType === 'non-teaching' ||
      (user.designation && nonTeachingRoles.includes(user.designation.toLowerCase().replace(/\s+/g, '-'))) ||
      (user.role && nonTeachingRoles.includes(user.role.toLowerCase()))
    ) {
      return <NonTeachingStaffDashboard onLogout={onLogout} />;
    }

    // Default to TeacherDashboard for teaching staff or unspecified
    return <TeacherDashboard onLogout={onLogout} />;
  };

  return (
    <ThemeProvider>
      <style>{`
      :root {
        --bg-theme: #F4F6F9;
      }
      .themed-bg {
        background-color: var(--bg-theme);
        min-height: 100vh;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
      }
      @keyframes popIn {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      .animate-popIn {
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      .hover-card {
        transition: all 0.3s ease;
      }
      .hover-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      }
    `}</style>
      <Router>
        <Routes>
          {/* Home Page - Landing */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* Public Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <ModernAdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent"
            element={
              <ProtectedRoute requiredRole="parent">
                <ParentDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute requiredRole={['teacher', 'staff']}>
                <TeacherDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute requiredRole="staff">
                <StaffDashboardWrapper onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute requiredRole="admin">
                <StudentsPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute requiredRole="admin">
                <TeachersPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute requiredRole="admin">
                <NotificationsPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute requiredRole="admin">
                <AttendancePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/finance"
            element={
              <ProtectedRoute requiredRole="admin">
                <FinancePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <AnalyticsPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/maintenance"
            element={
              <ProtectedRoute requiredRole="admin">
                <MaintenancePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/drivers"
            element={
              <ProtectedRoute requiredRole="admin">
                <DriversPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/parents"
            element={
              <ProtectedRoute requiredRole="admin">
                <ParentsPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredRole="admin">
                <Settings onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/calendar"
            element={
              <ProtectedRoute requiredRole="admin">
                <CalendarPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminProfilePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />



        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
