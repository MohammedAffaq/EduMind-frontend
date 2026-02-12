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
  DollarSign as DollarIcon,
  AlertTriangle,
  User,
  Download,
  Menu,
  ArrowUpDown,
  Settings,
  Plus,
  X,
  Mail,
  Printer,
  ShieldCheck,
  UserCog,
  Wrench,
  CreditCard
} from 'lucide-react';

const FinancePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterHighDefaulters, setFilterHighDefaulters] = React.useState(false);
  const [selectedDefaulterYear, setSelectedDefaulterYear] = React.useState('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newDefaulter, setNewDefaulter] = React.useState({
    name: '',
    class: '',
    pendingFees: '',
    percentage: '',
    dueDate: ''
  });
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedFee, setSelectedFee] = React.useState(null);
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);
  const [expenseActiveIndex, setExpenseActiveIndex] = React.useState(null);
  const [yearlyActiveIndex, setYearlyActiveIndex] = React.useState(null);
  const [overviewActiveIndex, setOverviewActiveIndex] = React.useState(null);

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
  }, [startDate, endDate, searchTerm, filterHighDefaulters]);

  // Sample data for charts and tables
  const schoolFeesBreakdownData = [
    { label: 'Tuition Fees', value: 45 },
    { label: 'Transport Fees', value: 25 },
    { label: 'Library Fees', value: 15 },
    { label: 'Lab Fees', value: 15 },
  ];
  const FEE_COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

  const yearlyFeeCollectionData = [
    { label: 'Jan', value: 45000 }, { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 }, { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 }, { label: 'Jun', value: 67000 },
    { label: 'Jul', value: 62000 }, { label: 'Aug', value: 72000 },
    { label: 'Sep', value: 68000 }, { label: 'Oct', value: 75000 },
    { label: 'Nov', value: 71000 }, { label: 'Dec', value: 82000 },
  ];
  const YEARLY_COLORS = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1"
  ];

  const financeOverviewData = [
    { label: 'Collected', value: 287000 },
    { label: 'Pending', value: 27100 },
    { label: 'Expenses', value: 45200 },
  ];
  const OVERVIEW_COLORS = ["#22c55e", "#eab308", "#ef4444"];

  const totalCollection = yearlyFeeCollectionData.reduce((acc, curr) => acc + curr.value, 0);

  const [defaultersData, setDefaultersData] = React.useState([
    { name: 'John Smith', class: '10-A', pendingFees: 2500, percentage: 15, dueDate: '2024-01-15', email: 'john.parent@example.com' },
    { name: 'Sarah Johnson', class: '9-B', pendingFees: 3200, percentage: 20, dueDate: '2024-02-01', email: 'sarah.parent@example.com' },
    { name: 'Mike Davis', class: '11-C', pendingFees: 1800, percentage: 10, dueDate: '2024-01-20', email: 'mike.parent@example.com' },
    { name: 'Emma Wilson', class: '8-A', pendingFees: 4100, percentage: 25, dueDate: '2024-01-10', email: 'emma.parent@example.com' },
    { name: 'Alex Brown', class: '7-B', pendingFees: 2900, percentage: 18, dueDate: '2024-02-15', email: 'alex.parent@example.com' },
    { name: 'Sophia Lee', class: '12-A', pendingFees: 5500, percentage: 30, dueDate: '2024-03-01', email: 'sophia.parent@example.com' },
    { name: 'Daniel Kim', class: '6-C', pendingFees: 1200, percentage: 8, dueDate: '2024-01-25', email: 'daniel.parent@example.com' },
    { name: 'Olivia Martinez', class: '9-A', pendingFees: 3800, percentage: 22, dueDate: '2024-02-10', email: 'olivia.parent@example.com' },
    { name: 'Lucas Singh', class: '10-B', pendingFees: 2100, percentage: 12, dueDate: '2024-03-05', email: 'lucas.parent@example.com' },
    { name: 'Isabella Chen', class: '5-A', pendingFees: 4500, percentage: 28, dueDate: '2024-02-20', email: 'isabella.parent@example.com' },
  ]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSendReminder = (defaulter) => {
    const subject = `Fee Reminder: ${defaulter.name}`;
    const body = `Dear Parent/Guardian,\n\nThis is a reminder regarding the pending fees of $${defaulter.pendingFees} for ${defaulter.name} (Class ${defaulter.class}).\n\nPlease clear the dues by ${defaulter.dueDate}.\n\nRegards,\nSchool Administration`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleBulkReminder = () => {
    const emails = processedDefaulters.map(d => d.email).filter(Boolean).join(',');
    if (!emails) return alert('No emails found for filtered students.');
    
    const subject = 'Urgent: Fee Payment Reminder';
    const body = 'Dear Parent/Guardian,\n\nThis is a reminder to clear the pending school fees for your child.\n\nPlease ignore this message if already paid.\n\nRegards,\nSchool Administration';
    
    window.open(`mailto:?bcc=${emails}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleExportPDF = () => {
    const printContent = document.getElementById('defaulters-table-container');
    if (!printContent) return;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Fee Defaulters List</title>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; font-family: sans-serif; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } h2 { text-align: center; font-family: sans-serif; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Fee Defaulters List</h2>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handlePayNow = (defaulter) => {
    setSelectedFee(defaulter);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    setPaymentProcessing(true);
    try {
      const token = localStorage.getItem('token');
      // In a real scenario, you'd get studentId from the selectedFee or context
      // For this mock data, we don't have studentId on selectedFee, so we'll mock it or use a fallback
      const studentId = selectedFee.studentId || "65f1a2b3c4d5e6f7a8b9c0d1"; // Fallback ID

      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedFee.pendingFees,
          studentId: studentId,
          paymentMethod: 'Credit Card'
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Payment of $${selectedFee.pendingFees} successful! Transaction ID: ${result.transactionId}`);
        setShowPaymentModal(false);
        // Optionally refresh data here
      } else {
        alert('Payment failed: ' + result.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing payment.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleAddDefaulter = (e) => {
    e.preventDefault();
    const defaulter = {
      ...newDefaulter,
      pendingFees: Number(newDefaulter.pendingFees)
    };
    setDefaultersData([...defaultersData, defaulter]);
    setShowAddModal(false);
    setNewDefaulter({ name: '', class: '', pendingFees: '', percentage: '', dueDate: '' });
  };

  let processedDefaulters = defaultersData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterHighDefaulters ? item.percentage > 50 : true;
    const itemYear = new Date(item.dueDate).getFullYear().toString();
    const matchesYear = selectedDefaulterYear === 'All' || itemYear === selectedDefaulterYear;

    if (!startDate && !endDate) return matchesSearch && matchesFilter && matchesYear;
    const itemDate = new Date(item.dueDate);
    const start = startDate ? new Date(startDate) : new Date('1900-01-01');
    const end = endDate ? new Date(endDate) : new Date('2100-01-01');
    return matchesSearch && matchesFilter && itemDate >= start && itemDate <= end && matchesYear;
  });

  if (sortConfig.key) {
    processedDefaulters.sort((a, b) => {
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
  const currentItems = processedDefaulters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedDefaulters.length / itemsPerPage);

  const handleDownloadReport = () => {
    // Define headers
    const headers = ['Student Name', 'Class', 'Pending Fees', 'Remaining %', 'Due Date'];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...processedDefaulters.map(row => [
        `"${row.name}"`,
        `"${row.class}"`,
        row.pendingFees,
        `${row.percentage}%`,
        `"${row.dueDate}"`
      ].join(','))
    ];

    // Create blob and download link
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fee_defaulters_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
  /* SimpleBarChart replaced by SimplePieChart */

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
          <NavItem icon={<DollarSign size={20} />} label="Finance" active onClick={() => navigate('/admin/finance')} />
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
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors border border-gray-200 lg:hidden"
            >
              <Menu size={24} />
            </button>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">Finance</h1>
                <p className="text-text-secondary">Manage school fees, payments, and financial records</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>
                <button onClick={handleDownloadReport} className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm h-[42px]">
                  <Download size={20} />
                  Download Report
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard
                icon={<DollarIcon className="text-success" />}
                label="Total Fees Collected"
                value="$287,000"
                trend="+12.5%"
                color="bg-green-50"
              />
              <SummaryCard
                icon={<AlertTriangle className="text-warning" />}
                label="Pending Fees"
                value="$27,100"
                trend="-8.2%"
                color="bg-yellow-50"
              />
              <SummaryCard
                icon={<TrendingUp className="text-primary" />}
                label="Expenses"
                value="$45,200"
                trend="+5.1%"
                color="bg-gray-50"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* School Fees Breakdown */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-text">School Fees Breakdown</h3>
                  <div className="flex items-center gap-3">
                    <button onClick={() => exportChart('fees-breakdown-chart', 'fees_breakdown')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" title="Export as PNG"><Download size={18} /></button>
                  </div>
                </div>
                <div className="h-64 flex items-center">
                  <div className="flex-1 h-full flex items-center justify-center">
                    <SimplePieChart 
                      size={240} 
                      data={schoolFeesBreakdownData} 
                      colors={FEE_COLORS} 
                      id="fees-breakdown-chart" 
                      activeIndex={expenseActiveIndex}
                      onHover={setExpenseActiveIndex}
                    />
                  </div>
                  <div className="w-40 pl-4">
                    <ul className="space-y-2">
                      {schoolFeesBreakdownData.map((d, idx) => (
                        <li key={idx} className={`flex items-center justify-between p-1 rounded cursor-pointer ${expenseActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setExpenseActiveIndex(idx)} onMouseLeave={() => setExpenseActiveIndex(null)}>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ background: FEE_COLORS[idx % FEE_COLORS.length] }} />
                            <span className="text-xs font-medium text-gray-700">{d.label}</span>
                          </div>
                          <div className="text-xs font-bold text-gray-900">{d.value}%</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finance Overview */}
              <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-text">Financial Overview</h3>
                  <div className="flex items-center gap-3">
                    <button onClick={() => exportChart('finance-overview-chart', 'finance_overview')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" title="Export as PNG"><Download size={18} /></button>
                  </div>
                </div>
                <div className="h-64 flex items-center">
                  <div className="flex-1 h-full flex items-center justify-center relative">
                    <SimplePieChart 
                      size={240} 
                      data={financeOverviewData} 
                      colors={OVERVIEW_COLORS} 
                      id="finance-overview-chart" 
                      activeIndex={overviewActiveIndex}
                      onHover={setOverviewActiveIndex}
                      innerRadius={0.6}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-sm text-gray-500 font-medium">Net Balance</span>
                      <span className="text-xl font-bold text-gray-800">${(financeOverviewData[0].value - financeOverviewData[2].value).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-40 pl-4">
                    <ul className="space-y-2">
                      {financeOverviewData.map((d, idx) => (
                        <li key={idx} className={`flex items-center justify-between p-1 rounded cursor-pointer ${overviewActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setOverviewActiveIndex(idx)} onMouseLeave={() => setOverviewActiveIndex(null)}>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ background: OVERVIEW_COLORS[idx] }} />
                            <span className="text-xs font-medium text-gray-700">{d.label}</span>
                          </div>
                          <div className="text-xs font-bold text-gray-900">${(d.value / 1000).toFixed(1)}k</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Yearly Fee Collection Trend */}
            <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-text">Yearly Fee Collection Trend</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => exportChart('yearly-collection-chart', 'yearly_collection')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" title="Export as PNG"><Download size={18} /></button>
                </div>
              </div>
              <div className="h-80 flex items-center">
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <SimplePieChart 
                    size={300} 
                    data={yearlyFeeCollectionData} 
                    colors={YEARLY_COLORS} 
                    id="yearly-collection-chart" 
                    activeIndex={yearlyActiveIndex}
                    onHover={setYearlyActiveIndex}
                    innerRadius={0.6}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-800">${(totalCollection / 1000).toFixed(0)}k</span>
                    <span className="text-sm text-gray-500 font-medium">Total Collection</span>
                  </div>
                </div>
                <div className="flex-1 pl-6">
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {yearlyFeeCollectionData.map((d, idx) => (
                      <li key={idx} className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-colors ${yearlyActiveIndex === idx ? 'bg-gray-50' : ''}`} onMouseEnter={() => setYearlyActiveIndex(idx)} onMouseLeave={() => setYearlyActiveIndex(null)}>
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: YEARLY_COLORS[idx % YEARLY_COLORS.length] }} />
                          <span className="text-sm font-medium text-gray-700">{d.label}</span>
                        </div>
                        <div className="text-sm text-gray-500">${Number(d.value).toLocaleString()}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Fee Defaulters Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-gray-900">Fee Defaulters</h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedDefaulterYear}
                    onChange={(e) => setSelectedDefaulterYear(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
                  >
                    <option value="All">All Years</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterHighDefaulters}
                      onChange={(e) => setFilterHighDefaulters(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">&gt; 50% Remaining</span>
                  </label>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <button
                    onClick={handleBulkReminder}
                    className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
                    title="Send Bulk Reminder"
                  >
                    <Mail size={20} />
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors flex-shrink-0"
                    title="Add Defaulter"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
                    title="Export as PDF"
                  >
                    <Printer size={20} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto" id="defaulters-table-container">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('name')}>
                        <div className="flex items-center gap-1">
                          Student Name
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('class')}>
                        <div className="flex items-center gap-1">
                          Class
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Year</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('pendingFees')}>
                        <div className="flex items-center gap-1">
                          Pending Fees
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('percentage')}>
                        <div className="flex items-center gap-1">
                          Remaining %
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm cursor-pointer hover:bg-gray-50" onClick={() => requestSort('dueDate')}>
                        <div className="flex items-center gap-1">
                          Due Date
                          <ArrowUpDown size={14} className="text-gray-400" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((defaulter, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-4 px-4 font-medium text-gray-900">{defaulter.name}</td>
                        <td className="py-4 px-4 text-gray-600">{defaulter.class}</td>
                        <td className="py-4 px-4 text-gray-600">{new Date(defaulter.dueDate).getFullYear()}</td>
                        <td className="py-4 px-4 text-gray-700">${defaulter.pendingFees.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600">
                            {defaulter.percentage}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{defaulter.dueDate}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleSendReminder(defaulter)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                          >
                            <Mail size={14} />
                            Send Reminder
                          </button>
                          <button
                            onClick={() => handlePayNow(defaulter)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors ml-2"
                          >
                            <CreditCard size={14} />
                            Pay Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  Showing {processedDefaulters.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, processedDefaulters.length)} of {processedDefaulters.length} entries
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
                          ? 'bg-purple-600 text-white border-purple-600'
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
          </div>
        </main>
      </div>

      {/* Add Defaulter Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Add Fee Defaulter</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddDefaulter} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  value={newDefaulter.name}
                  onChange={(e) => setNewDefaulter({ ...newDefaulter, name: e.target.value })}
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  value={newDefaulter.class}
                  onChange={(e) => setNewDefaulter({ ...newDefaulter, class: e.target.value })}
                  placeholder="e.g., 10-A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pending Fees</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  value={newDefaulter.pendingFees}
                  onChange={(e) => setNewDefaulter({ ...newDefaulter, pendingFees: e.target.value })}
                  placeholder="e.g., 5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Percentage (%)</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  value={newDefaulter.percentage}
                  onChange={(e) => setNewDefaulter({ ...newDefaulter, percentage: e.target.value })}
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  value={newDefaulter.dueDate}
                  onChange={(e) => setNewDefaulter({ ...newDefaulter, dueDate: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors mt-4"
              >
                Add Defaulter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Secure Payment Gateway</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between mb-2"><span className="text-gray-600">Student:</span> <span className="font-semibold">{selectedFee.name}</span></div>
                <div className="flex justify-between mb-2"><span className="text-gray-600">Class:</span> <span className="font-semibold">{selectedFee.class}</span></div>
                <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-gray-800 font-bold">Total Amount:</span> <span className="text-indigo-600 font-bold text-lg">${selectedFee.pendingFees}</span></div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Card Details</label>
                <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                  <CreditCard className="text-gray-400" />
                  <input type="text" placeholder="Card Number" className="flex-1 outline-none text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="border border-gray-200 rounded-xl p-3 outline-none text-sm" />
                  <input type="text" placeholder="CVC" className="border border-gray-200 rounded-xl p-3 outline-none text-sm" />
                </div>
              </div>

              <button 
                onClick={processPayment} 
                disabled={paymentProcessing}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {paymentProcessing ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing...</> : `Pay $${selectedFee.pendingFees}`}
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

const SummaryCard = ({ icon, label, value, trend, color }) => (
  <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3.5 rounded-xl ${color}`}>{icon}</div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${trend.includes('+') ? 'bg-green-50 text-success' : trend.includes('-') ? 'bg-red-50 text-danger' : 'bg-gray-50 text-accent'}`}>{trend}</span>
    </div>
    <h4 className="text-text-secondary text-sm font-semibold mb-1">{label}</h4>
    <h2 className="text-2xl font-bold text-text">{value}</h2>
  </div>
);

export default FinancePage;
