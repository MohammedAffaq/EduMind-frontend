import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Phone,
  Mail,
  Plus,
  User,
  X,
  Trash2,
  AlertCircle,
  Menu,
  Settings,
  Download,
  CheckCircle,
  Copy,
  ShieldCheck,
  UserCog,
  Wrench
} from 'lucide-react';
import { validateAuth, logout } from '../utils/auth';

const ParentsPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const [selectedParent, setSelectedParent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parentToDelete, setParentToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParent, setNewParent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    children: [{ name: '', grade: '' }],
    relationship: 'Parent'
  });
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  // Fetch parents from API
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const result = await response.json();
        if (result.success) {
          const parentUsers = result.users.filter(user => user.role === 'parent');
          const mappedParents = parentUsers.map(user => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.profileImage || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=10B981&color=fff`,
            date: new Date(user.createdAt || Date.now()).toISOString().split('T')[0],
            childName: user.children && user.children.length > 0 ? user.children[0].name : 'N/A',
            childGrade: user.children && user.children.length > 0 ? user.children[0].grade : 'N/A',
            relationship: user.relationship || 'Parent',
            email: user.email,
            phone: user.phone
          }));
          setParents(mappedParents);
        }
      } catch (error) {
        console.error('Error fetching parents:', error);
      }
    };

    fetchParents();
  }, []);

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
  }, [searchTerm, selectedFilter]);

  // Sample parent data
  const [parents, setParents] = useState([]);

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);
  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    // Define headers
    const headers = ['ID', 'Name', 'Date', 'Child Name', 'Child Grade', 'Relationship', 'Phone', 'Email'];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(','),
      ...filteredParents.map(parent => [
        `"${parent.id}"`,
        `"${parent.name}"`,
        `"${parent.date}"`,
        `"${parent.childName}"`,
        `"${parent.childGrade}"`,
        `"${parent.relationship}"`,
        `"${parent.phone}"`,
        `"${parent.email}"`
      ].join(','))
    ];

    // Create blob and download link
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'parents_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProfile = (parent) => {
    setSelectedParent(parent);
    setShowProfileModal(true);
  };

  const confirmDelete = (parent) => {
    setParentToDelete(parent);
    setShowDeleteModal(true);
  };

  const handleDeleteParent = () => {
    setParents(parents.filter(p => p.id !== parentToDelete.id));
    setShowDeleteModal(false);
    setParentToDelete(null);
  };

  const addChild = () => {
    setNewParent({
      ...newParent,
      children: [...newParent.children, { name: '', grade: '' }]
    });
  };

  const updateChild = (index, field, value) => {
    const updatedChildren = newParent.children.map((child, i) =>
      i === index ? { ...child, [field]: value } : child
    );
    setNewParent({
      ...newParent,
      children: updatedChildren
    });
  };

  const removeChild = (index) => {
    if (newParent.children.length > 1) {
      setNewParent({
        ...newParent,
        children: newParent.children.filter((_, i) => i !== index)
      });
    }
  };

  const handleAddParent = async (e) => {
    e.preventDefault();

    // Validate authentication before proceeding
    const authValidation = validateAuth();
    if (!authValidation.isValid) {
      if (authValidation.error === 'Session expired. Please login again.') {
        alert('Your session has expired. Please login again.');
        logout();
        return;
      }
      alert(authValidation.error);
      return;
    }

    // Validate that at least one child is filled
    const hasValidChild = newParent.children.some(child => child.name.trim() && child.grade);
    if (!hasValidChild) {
      alert('Please add at least one child with name and grade.');
      return;
    }

    // Prepare user data for backend
    const userData = {
      firstName: newParent.firstName,
      lastName: newParent.lastName,
      email: newParent.email.toLowerCase(),
      role: 'parent',
      children: newParent.children.filter(child => child.name.trim() && child.grade),
      relationship: newParent.relationship,
      phone: newParent.phone
    };

    try {
      // Call backend API to register user and send email
      const response = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authValidation.token}`,
        },
        body: JSON.stringify({
          firstName: newParent.firstName,
          lastName: newParent.lastName,
          email: newParent.email.toLowerCase(),
          phone: newParent.phone,
          role: 'parent'
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Parent registered successfully via backend!');
        // Note: Password is generated by backend and sent via email
        // We don't show the password in frontend for security
        setCreatedCredentials({
          email: newParent.email,
          password: 'Sent via email',
          role: 'Parent'
        });
        setShowCredentialsModal(true);

        // Add to local parents list for display
        const firstChild = newParent.children.find(child => child.name.trim() && child.grade);
        const parent = {
          id: `PAR00${parents.length + 1}`,
          name: `${newParent.firstName} ${newParent.lastName}`,
          avatar: `https://ui-avatars.com/api/?name=${newParent.firstName}+${newParent.lastName}&background=10B981&color=fff`,
          date: new Date().toISOString().split('T')[0],
          childName: firstChild ? firstChild.name : 'Multiple Children',
          childGrade: firstChild ? firstChild.grade : 'Multiple Grades',
          relationship: newParent.relationship,
          email: newParent.email,
          phone: newParent.phone
        };
        setParents([...parents, parent]);

        setShowAddModal(false);
        setNewParent({ firstName: '', lastName: '', email: '', phone: '', children: [{ name: '', grade: '' }], relationship: 'Parent' });
      } else {
        if (result.error === 'Invalid token or authorization error.' ||
            result.error === 'Unauthorized. Admin access required.' ||
            result.error === 'Invalid token') {
          alert('Your session has expired. Please login again.');
          logout();
          return;
        }
        alert('Failed to register parent: ' + result.error);
      }
    } catch (error) {
      console.error('Error registering parent:', error);
      alert('Failed to register parent. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-gray-800 overflow-hidden">
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
          <NavItem icon={<User size={20} />} label="Parents" active onClick={() => navigate('/admin/parents')} />
          <NavItem icon={<Bus size={20} />} label="Driver & Vehicles" onClick={() => navigate('/admin/drivers')} />
          <NavItem icon={<DollarSign size={20} />} label="Finance" onClick={() => navigate('/admin/finance')} />
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" onClick={() => navigate('/admin/attendance')} />
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
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search parents..."
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
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">Parents</h1>
                <p className="text-text-secondary">Manage and view all parent information</p>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => setShowAddModal(true)} className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Plus size={18} />
                  Add Parent
                </button>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-card border border-gray-200 text-text-secondary rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
                <button onClick={handleExportCSV} className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>

            {/* Parents Table */}
            <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Child Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Child Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Relationship</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParents.map((parent, index) => (
                      <tr key={parent.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={parent.avatar}
                              alt={parent.name}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            />
                            <span className="font-medium text-text">{parent.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary font-medium">{parent.id}</td>
                        <td className="px-6 py-4 text-text-secondary">{parent.date}</td>
                        <td className="px-6 py-4 text-text-secondary">{parent.childName}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                            {parent.childGrade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">{parent.relationship}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => window.open(`tel:${parent.phone}`, '_self')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title={`Call ${parent.phone}`}
                            >
                              <Phone size={16} />
                            </button>
                            <button
                              onClick={() => window.open(`mailto:${parent.email}`, '_self')}
                              className="p-1.5 text-accent hover:bg-gray-50 rounded-lg transition-colors"
                              title={`Email ${parent.email}`}
                            >
                              <Mail size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewProfile(parent)}
                              className="p-2 text-text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                              title="View Profile"
                            >
                              <User size={18} />
                            </button>
                            <button
                              onClick={() => confirmDelete(parent)}
                              className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Parent"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-text-secondary">
                  Showing {paginatedParents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredParents.length)} of {filteredParents.length} parents
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm text-text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${currentPage === page ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm text-text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Parent Profile Modal */}
      {showProfileModal && selectedParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Parent Details</h3>
              <button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedParent.avatar} alt={selectedParent.name} className="w-20 h-20 rounded-full border-4 border-gray-50" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedParent.name}</h4>
                  <p className="text-gray-500 text-sm">{selectedParent.id}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 bg-green-100 text-green-800`}>
                    {selectedParent.relationship}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Contact Information</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      <span>{selectedParent.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone size={16} className="text-gray-400" />
                      <span>{selectedParent.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Child Information</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Child Name:</span>
                      <span className="font-medium text-gray-900">{selectedParent.childName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Child Grade:</span>
                      <span className="font-medium text-gray-900">{selectedParent.childGrade}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Registration Date</label>
                  <p className="mt-1 text-gray-700">{selectedParent.date}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && parentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Parent?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete <strong>{parentToDelete.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteParent}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Parent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Add New Parent</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddParent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    value={newParent.firstName}
                    onChange={(e) => setNewParent({...newParent, firstName: e.target.value})}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    value={newParent.lastName}
                    onChange={(e) => setNewParent({...newParent, lastName: e.target.value})}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    value={newParent.email}
                    onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    value={newParent.phone}
                    onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                    placeholder="9876543210"
                  />
                </div>
              </div>

              {/* Children Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Children *</label>
                  <button
                    type="button"
                    onClick={addChild}
                    className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Add Child
                  </button>
                </div>

                {newParent.children.map((child, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Child {index + 1}</h4>
                      {newParent.children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChild(index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Child Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                          value={child.name}
                          onChange={(e) => updateChild(index, 'name', e.target.value)}
                          placeholder="Alice Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Child Grade *</label>
                        <select
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                          value={child.grade}
                          onChange={(e) => updateChild(index, 'grade', e.target.value)}
                        >
                          <option value="">Select Grade</option>
                          {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    value={newParent.relationship}
                    onChange={(e) => setNewParent({...newParent, relationship: e.target.value})}
                  >
                    <option value="Parent">Parent</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors mt-4"
              >
                Add Parent
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {showCredentialsModal && createdCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">
                Credentials have been generated.
              </p>
              
              <div className="w-full bg-gray-50 rounded-xl p-4 text-left space-y-3 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Login ID</p>
                  <p className="font-mono text-gray-900 font-medium">{createdCredentials.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Password</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-gray-900 font-bold bg-white px-2 py-1 rounded border border-gray-200">{createdCredentials.password}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdCredentials.password);
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
              onClick={() => setShowCredentialsModal(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
            >
              Done
            </button>
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

export default ParentsPage;
