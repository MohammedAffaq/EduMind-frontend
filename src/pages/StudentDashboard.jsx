import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Calendar,
  GraduationCap,
  Clock,
  BookOpen,
  CreditCard,
  Bell,
  Menu,
  LogOut,
  Upload,
  Download,
  Edit,
  User,
  Camera,
  Trash2,
  FileText,
  Search,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Star,
  MessageSquare,
  Share2,
  Mail,
  Link as LinkIcon,
  Filter,
} from 'lucide-react';
import { getFullName, getUser } from '../utils/userUtils';
import SimplePieChart from '../components/SimplePieChart';

const StudentDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fileInputRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Assignment Due Reminder',
      description: 'Your History essay is due tomorrow. Please submit it before the deadline.',
      dateTime: '2024-05-20 09:00',
      category: 'Assignment',
      read: false,
    },
    {
      id: 2,
      title: 'Grade Updated',
      description: 'Your Science quiz grade has been updated to 92%.',
      dateTime: '2024-05-19 14:30',
      category: 'Grade',
      read: true,
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for May 28, 2024 at 10:00 AM.',
      dateTime: '2024-05-18 11:15',
      category: 'Meeting',
      read: true,
    },
    {
      id: 4,
      title: 'Fee Payment Due',
      description: 'Your fee payment of $50 is due by May 30, 2024.',
      dateTime: '2024-05-17 08:00',
      category: 'Fee',
      read: false,
    },
    {
      id: 5,
      title: 'School Holiday Notice',
      description: 'School will remain closed on May 26, 2024 due to public holiday.',
      dateTime: '2024-05-16 16:45',
      category: 'Notice',
      read: true,
    },
  ]);

  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    section: '',
    dob: '',
    parentName: '',
    parentContact: '',
    email: '',
    address: '',
    profileImage: null,
  });

  useEffect(() => {
    const fetchStudentData = () => {
      try {
        const currentUser = getUser();

        setStudentData(prevData => ({
          ...prevData,
          name: getFullName() || 'Student',
          rollNumber: currentUser.rollNumber || prevData.rollNumber || 'STU001',
          class: currentUser.class || currentUser.studentClass || prevData.class || 'Grade 10',
          section: currentUser.section || prevData.section || 'A',
          email: currentUser.email || prevData.email || 'student@school.edu',
          parentName: currentUser.parentName || prevData.parentName || 'Parent',
          parentContact: currentUser.parentContact || prevData.parentContact || '+1 234 567 8900',
          address: currentUser.address || prevData.address || '123 School St',
          dob: currentUser.dob || prevData.dob || '2008-01-01',
        }));
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  // Mock data for dashboard
  const dashboardData = {
    attendancePercentage: 95,
    upcomingExam: 'Mathematics Final Exam - May 25, 2024',
    pendingAssignments: 3,
    feeDue: '.00',
    recentNotifications: [
      { id: 1, title: 'Assignment Due', message: 'History essay due tomorrow', date: '2024-05-20', read: false },
      { id: 2, title: 'Grade Updated', message: 'Science quiz grade: 92%', date: '2024-05-19', read: true },
      { id: 3, title: 'Parent Meeting', message: 'PTM scheduled for next week', date: '2024-05-18', read: true },
    ],
  };

  // Mock data for attendance
  const attendanceData = {
    totalWorkingDays: 180,
    daysPresent: 171,
    daysAbsent: 9,
    percentage: 95,
    monthlyData: [
      { month: 'Jan', present: 22, absent: 1 },
      { month: 'Feb', present: 20, absent: 2 },
      { month: 'Mar', present: 23, absent: 0 },
      { month: 'Apr', present: 21, absent: 2 },
      { month: 'May', present: 18, absent: 3 },
    ],
    dateWiseStatus: [
      { date: '2024-05-01', status: 'Present' },
      { date: '2024-05-02', status: 'Present' },
      { date: '2024-05-03', status: 'Absent' },
      { date: '2024-05-04', status: 'Present' },
      { date: '2024-05-05', status: 'Leave' },
    ],
  };

  // Mock data for marks/results
  const marksData = [
    {
      examName: 'Unit Test 1',
      subjects: [
        { name: 'Mathematics', marks: 85, total: 100, percentage: 85, grade: 'A', status: 'Pass' },
        { name: 'Science', marks: 92, total: 100, percentage: 92, grade: 'A+', status: 'Pass' },
        { name: 'English', marks: 78, total: 100, percentage: 78, grade: 'B+', status: 'Pass' },
        { name: 'History', marks: 88, total: 100, percentage: 88, grade: 'A', status: 'Pass' },
      ],
      totalMarks: 343,
      maxMarks: 400,
      percentage: 85.75,
      grade: 'A',
      status: 'Pass',
      teacherRemarks: 'Excellent performance. Keep it up!',
    },
    {
      examName: 'Mid-term Exam',
      subjects: [
        { name: 'Mathematics', marks: 90, total: 100, percentage: 90, grade: 'A+', status: 'Pass' },
        { name: 'Science', marks: 87, total: 100, percentage: 87, grade: 'A', status: 'Pass' },
        { name: 'English', marks: 82, total: 100, percentage: 82, grade: 'A-', status: 'Pass' },
        { name: 'History', marks: 91, total: 100, percentage: 91, grade: 'A+', status: 'Pass' },
      ],
      totalMarks: 350,
      maxMarks: 400,
      percentage: 87.5,
      grade: 'A',
      status: 'Pass',
      teacherRemarks: 'Consistent improvement shown.',
    },
  ];

  // Mock data for timetable
  const timetableData = {
    Monday: [
      { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '11:15-12:15', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
    ],
    Tuesday: [
      { time: '08:00-09:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Geography', teacher: 'Ms. Brown', room: 'Room 104' },
      { time: '11:15-12:15', subject: 'Art', teacher: 'Mr. Lee', room: 'Art Room' },
    ],
    Wednesday: [
      { time: '08:00-09:00', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '09:00-10:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '11:15-12:15', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym' },
    ],
    Thursday: [
      { time: '08:00-09:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
      { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '11:15-12:15', subject: 'Computer Science', teacher: 'Ms. Chen', room: 'Computer Lab' },
    ],
    Friday: [
      { time: '08:00-09:00', subject: 'Geography', teacher: 'Ms. Brown', room: 'Room 104' },
      { time: '09:00-10:00', subject: 'Art', teacher: 'Mr. Lee', room: 'Art Room' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '11:15-12:15', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
    ],
  };

  // Mock data for assignments
  const [assignmentsData, setAssignmentsData] = useState([
    {
      id: 1,
      title: 'History Essay: World War II',
      subject: 'History',
      assignedDate: '2024-05-15',
      dueDate: '2024-05-25',
      status: 'Pending',
      feedback: '',
    },
    {
      id: 2,
      title: 'Math Problem Set 5',
      subject: 'Mathematics',
      assignedDate: '2024-05-10',
      dueDate: '2024-05-22',
      status: 'Submitted',
      feedback: 'Well done! All problems solved correctly.',
    },
    {
      id: 3,
      title: 'Science Experiment Report',
      subject: 'Science',
      assignedDate: '2024-05-12',
      dueDate: '2024-05-20',
      status: 'Overdue',
      feedback: '',
    },
  ]);

  // Mock data for study materials
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Algebra Formulas Cheat Sheet', subject: 'Mathematics', class: 'Grade 10', type: 'Study Material', teacher: 'Mr. Smith', date: '2024-05-10', size: '2.4 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 2, title: 'Physics Laws of Motion', subject: 'Science', class: 'Grade 10', type: 'Study Material', teacher: 'Ms. Johnson', date: '2024-05-12', size: '1.8 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 3, title: 'Math Final Exam 2023', subject: 'Mathematics', class: 'Grade 10', type: 'Question Paper', teacher: 'Mr. Smith', date: '2024-04-20', size: '5.1 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 4, title: 'World War II Timeline', subject: 'History', class: 'Grade 10', type: 'Study Material', teacher: 'Mr. Wilson', date: '2024-05-15', size: '3.2 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 5, title: 'Science Model Question Paper', subject: 'Science', class: 'Grade 10', type: 'Question Paper', teacher: 'Ms. Johnson', date: '2024-04-25', size: '4.5 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 6, title: 'Kannada Grammar Basics', subject: 'Kannada', class: 'Grade 10', type: 'Study Material', teacher: 'Ms. Kumar', date: '2024-05-11', size: '1.5 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 7, title: 'English Literature Notes', subject: 'English', class: 'Grade 10', type: 'Study Material', teacher: 'Mrs. Davis', date: '2024-05-13', size: '2.0 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 8, title: 'Hindi Vocabulary Builder', subject: 'Hindi', class: 'Grade 10', type: 'Question Paper', teacher: 'Mr. Sharma', date: '2024-05-14', size: '1.3 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 9, title: 'General Knowledge Quiz', subject: 'General Knowledge', class: 'Grade 10', type: 'Study Material', teacher: 'Ms. Patel', date: '2024-05-16', size: '1.7 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 10, title: 'Biology Cell Structure', subject: 'Biology', class: 'Grade 10', type: 'Study Material', teacher: 'Mr. Lee', date: '2024-05-17', size: '2.1 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 11, title: 'Chemistry Periodic Table', subject: 'Chemistry', class: 'Grade 10', type: 'Question Paper', teacher: 'Ms. Chen', date: '2024-05-18', size: '2.5 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 12, title: 'Physics Electricity Notes', subject: 'Physics', class: 'Grade 10', type: 'Study Material', teacher: 'Mr. Taylor', date: '2024-05-19', size: '1.9 MB', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    // Additional materials for Maths and Science grades 1-5
    { id: 13, title: 'Basic Addition Worksheets', subject: 'Mathematics', class: 'Grade 1', type: 'Study Material', teacher: 'Ms. Davis', date: '2024-05-01', size: '1.2 MB' },
    { id: 14, title: 'Simple Subtraction Practice', subject: 'Mathematics', class: 'Grade 1', type: 'Question Paper', teacher: 'Ms. Davis', date: '2024-05-03', size: '0.8 MB' },
    { id: 15, title: 'Animal Kingdom Basics', subject: 'Science', class: 'Grade 1', type: 'Study Material', teacher: 'Mr. Lee', date: '2024-05-05', size: '2.1 MB' },
    { id: 16, title: 'Plant Life Quiz', subject: 'Science', class: 'Grade 1', type: 'Question Paper', teacher: 'Mr. Lee', date: '2024-05-07', size: '1.5 MB' },
    { id: 17, title: 'Multiplication Tables 1-5', subject: 'Mathematics', class: 'Grade 2', type: 'Study Material', teacher: 'Ms. Brown', date: '2024-05-02', size: '1.0 MB' },
    { id: 18, title: 'Division Basics', subject: 'Mathematics', class: 'Grade 2', type: 'Question Paper', teacher: 'Ms. Brown', date: '2024-05-04', size: '0.9 MB' },
    { id: 19, title: 'Solar System Overview', subject: 'Science', class: 'Grade 2', type: 'Study Material', teacher: 'Mr. Chen', date: '2024-05-06', size: '2.3 MB' },
    { id: 20, title: 'Earth and Moon Test', subject: 'Science', class: 'Grade 2', type: 'Question Paper', teacher: 'Mr. Chen', date: '2024-05-08', size: '1.7 MB' },
    { id: 21, title: 'Fractions Introduction', subject: 'Mathematics', class: 'Grade 3', type: 'Study Material', teacher: 'Ms. Taylor', date: '2024-05-09', size: '1.4 MB' },
    { id: 22, title: 'Geometry Shapes', subject: 'Mathematics', class: 'Grade 3', type: 'Question Paper', teacher: 'Ms. Taylor', date: '2024-05-11', size: '1.1 MB' },
    { id: 23, title: 'Matter and States', subject: 'Science', class: 'Grade 3', type: 'Study Material', teacher: 'Mr. Wilson', date: '2024-05-13', size: '2.0 MB' },
    { id: 24, title: 'Energy Forms Quiz', subject: 'Science', class: 'Grade 3', type: 'Question Paper', teacher: 'Mr. Wilson', date: '2024-05-15', size: '1.3 MB' },
    { id: 25, title: 'Decimals and Percentages', subject: 'Mathematics', class: 'Grade 4', type: 'Study Material', teacher: 'Ms. Garcia', date: '2024-05-10', size: '1.6 MB' },
    { id: 26, title: 'Word Problems Practice', subject: 'Mathematics', class: 'Grade 4', type: 'Question Paper', teacher: 'Ms. Garcia', date: '2024-05-12', size: '1.2 MB' },
    { id: 27, title: 'Human Body Systems', subject: 'Science', class: 'Grade 4', type: 'Study Material', teacher: 'Mr. Patel', date: '2024-05-14', size: '2.5 MB' },
    { id: 28, title: 'Nutrition and Health Test', subject: 'Science', class: 'Grade 4', type: 'Question Paper', teacher: 'Mr. Patel', date: '2024-05-16', size: '1.8 MB' },
    { id: 29, title: 'Advanced Algebra', subject: 'Mathematics', class: 'Grade 5', type: 'Study Material', teacher: 'Ms. Johnson', date: '2024-05-17', size: '2.2 MB' },
    { id: 30, title: 'Equations Practice', subject: 'Mathematics', class: 'Grade 5', type: 'Question Paper', teacher: 'Ms. Johnson', date: '2024-05-19', size: '1.9 MB' },
    { id: 31, title: 'Chemical Reactions', subject: 'Science', class: 'Grade 5', type: 'Study Material', teacher: 'Mr. Smith', date: '2024-05-21', size: '2.7 MB' },
    { id: 32, title: 'Acids and Bases Quiz', subject: 'Science', class: 'Grade 5', type: 'Question Paper', teacher: 'Mr. Smith', date: '2024-05-23', size: '1.4 MB' },
    // More materials for new subjects
    { id: 33, title: 'Kannada Proverbs', subject: 'Kannada', class: 'Grade 5', type: 'Study Material', teacher: 'Ms. Kumar', date: '2024-05-20', size: '1.6 MB' },
    { id: 34, title: 'English Comprehension Test', subject: 'English', class: 'Grade 5', type: 'Question Paper', teacher: 'Mrs. Davis', date: '2024-05-22', size: '1.4 MB' },
    { id: 35, title: 'Hindi Story Book', subject: 'Hindi', class: 'Grade 5', type: 'Study Material', teacher: 'Mr. Sharma', date: '2024-05-24', size: '2.0 MB' },
    { id: 36, title: 'GK Current Affairs', subject: 'General Knowledge', class: 'Grade 5', type: 'Study Material', teacher: 'Ms. Patel', date: '2024-05-25', size: '1.8 MB' },
    { id: 37, title: 'Biology Photosynthesis', subject: 'Biology', class: 'Grade 5', type: 'Study Material', teacher: 'Mr. Lee', date: '2024-05-26', size: '2.2 MB' },
    { id: 38, title: 'Chemistry Elements Quiz', subject: 'Chemistry', class: 'Grade 5', type: 'Question Paper', teacher: 'Ms. Chen', date: '2024-05-27', size: '1.5 MB' },
    { id: 39, title: 'Physics Magnetism Notes', subject: 'Physics', class: 'Grade 5', type: 'Study Material', teacher: 'Mr. Taylor', date: '2024-05-28', size: '1.7 MB' },
  ]);

  const [materialFilters, setMaterialFilters] = useState({
    subject: 'All',
    type: 'All',
    class: 'All'
  });

  // Study Materials state
  const [materialRequest, setMaterialRequest] = useState({ subject: '', title: '', description: '' });
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [materialSearchTerm, setMaterialSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [bookmarkedMaterials, setBookmarkedMaterials] = useState([]);
  const [activeMaterialTab, setActiveMaterialTab] = useState('All');
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [materialRatings, setMaterialRatings] = useState({});
  const [viewMaterial, setViewMaterial] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [rateMaterial, setRateMaterial] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMaterial, setShareMaterial] = useState(null);
  const [materialStartDate, setMaterialStartDate] = useState('');
  const [materialEndDate, setMaterialEndDate] = useState('');
  const [assignmentSubjectFilter, setAssignmentSubjectFilter] = useState('All');

  // Study Materials functions
  const openRateModal = (material) => {
    setShowRateModal(true);
    setRateMaterial(material);
  };

  const toggleBookmark = (id) => {
    setBookmarkedMaterials(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const addToRecent = (material) => {
    setRecentMaterials(prev => [material, ...prev.filter(m => m.id !== material.id)].slice(0, 10));
  };

  const openShareModal = (material) => {
    setShareMaterial(material);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareMaterial(null);
  };

  const shareViaEmail = () => {
    if (!shareMaterial) return;
    const subject = encodeURIComponent(`Check out this study material: ${shareMaterial.title}`);
    const body = encodeURIComponent(`I found this useful study material on EduMind:\n\nTitle: ${shareMaterial.title}\nSubject: ${shareMaterial.subject}\nLink: ${shareMaterial.fileUrl || 'Link not available'}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    closeShareModal();
  };

  const shareViaWhatsApp = () => {
    if (!shareMaterial) return;
    const text = encodeURIComponent(`Check out this study material: ${shareMaterial.title}\n${shareMaterial.fileUrl || 'Link not available'}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    closeShareModal();
  };

  const copyLink = () => {
    if (!shareMaterial) return;
    navigator.clipboard.writeText(shareMaterial.fileUrl || 'Link not available');
    alert('Link copied to clipboard!');
    closeShareModal();
  };

  const handleRateSubmit = (rating) => {
    if (rateMaterial) {
      setMaterialRatings(prev => ({
        ...prev,
        [rateMaterial.id]: { rating }
      }));
      setShowRateModal(false);
      setRateMaterial(null);
    }
  };

  const handleDownload = (material) => {
    if (material.fileUrl) {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('File not available for download.');
    }
    addToRecent(material);
  };

  // Mock data for fee & payments
  const feeData = {
    totalFee: 1200.00,
    paidAmount: 1150.00,
    pendingAmount: 50.00,
    dueDate: '2024-05-30',
    status: 'Partial',
    paymentHistory: [
      { date: '2024-01-15', amount: 300.00, method: 'Online', receipt: 'REC001' },
      { date: '2024-02-15', amount: 300.00, method: 'Cash', receipt: 'REC002' },
      { date: '2024-03-15', amount: 300.00, method: 'Online', receipt: 'REC003' },
      { date: '2024-04-15', amount: 250.00, method: 'Online', receipt: 'REC004' },
    ],
  };

  // Mock data for notifications
  const notificationsData = [
    {
      id: 1,
      title: 'Assignment Due Reminder',
      description: 'Your History essay is due tomorrow. Please submit it before the deadline.',
      dateTime: '2024-05-20 09:00',
      category: 'Assignment',
      read: false,
    },
    {
      id: 2,
      title: 'Grade Updated',
      description: 'Your Science quiz grade has been updated to 92%.',
      dateTime: '2024-05-19 14:30',
      category: 'Grade',
      read: true,
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for May 28, 2024 at 10:00 AM.',
      dateTime: '2024-05-18 11:15',
      category: 'Meeting',
      read: true,
    },
    {
      id: 4,
      title: 'Fee Payment Due',
      description: 'Your fee payment of  is due by May 30, 2024.',
      dateTime: '2024-05-17 08:00',
      category: 'Fee',
      read: false,
    },
    {
      id: 5,
      title: 'School Holiday Notice',
      description: 'School will remain closed on May 26, 2024 due to public holiday.',
      dateTime: '2024-05-16 16:45',
      category: 'Notice',
      read: true,
    },
  ];

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Home },
    { id: 'Attendance', label: 'Attendance', icon: Calendar },
    { id: 'Marks/Results', label: 'Marks/Results', icon: GraduationCap },
    { id: 'Timetable', label: 'Timetable', icon: Clock },
    { id: 'Assignments', label: 'Assignments', icon: BookOpen },
    { id: 'Study Materials', label: 'Study Materials', icon: FileText },
    { id: 'Fee & Payments', label: 'Fee & Payments', icon: CreditCard },
    { id: 'Announcements', label: 'Announcements', icon: Bell },
    { id: 'Calendar', label: 'Calendar', icon: Clock },
    { id: 'Reports', label: 'Reports', icon: GraduationCap },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleMaterialRequestSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send a request to the backend.
    console.log('Submitting material request:', materialRequest);
    alert(`Request for "${materialRequest.title}" in ${materialRequest.subject} has been sent to the teachers.`);
    setShowRequestModal(false);
    setMaterialRequest({ subject: '', title: '', description: '' });
  };

  const handleAssignmentUpload = (assignmentId) => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Update assignment status to "Submitted"
        setAssignmentsData(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === assignmentId
              ? { ...assignment, status: 'Submitted' }
              : assignment
          )
        );
        alert(`Assignment "${file.name}" uploaded successfully! Status updated to Submitted.`);
      }
    };
    input.click();
  };

  const handleDownloadReceipt = (receiptId) => {
    // Mock download functionality - create a simple text file
    const element = document.createElement('a');
    const file = new Blob([`Receipt ID: \nAmount: .00\nDate: 2024-01-15\nMethod: Online\nStatus: Paid`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt_.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleUpdateProfile = () => {
    // Mock update functionality
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentData(prevData => ({
          ...prevData,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setStudentData(prevData => ({
      ...prevData,
      profileImage: null
    }));
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const renderStudyMaterials = () => {
    // Filter materials based on search and filters
    const filteredMaterials = materials.filter(item => {
      const searchMatch = materialSearchTerm === '' ||
        item.title.toLowerCase().includes(materialSearchTerm.toLowerCase()) ||
        item.teacher.toLowerCase().includes(materialSearchTerm.toLowerCase());

      const isFavoriteMatch = !showFavoritesOnly || bookmarkedMaterials.includes(item.id);

      const itemDate = new Date(item.date);
      const startDateMatch = !materialStartDate || itemDate >= new Date(materialStartDate);
      const endDateMatch = !materialEndDate || itemDate <= new Date(materialEndDate);

      return searchMatch &&
        isFavoriteMatch &&
        (materialFilters.subject === 'All' || item.subject === materialFilters.subject) &&
        (materialFilters.type === 'All' || item.type === materialFilters.type) &&
        (materialFilters.class === 'All' || item.class === materialFilters.class) &&
        startDateMatch &&
        endDateMatch;
    });

    const displayMaterials = activeMaterialTab === 'Recent' ? recentMaterials : filteredMaterials;

    const totalPages = Math.ceil(displayMaterials.length / itemsPerPage);
    const paginatedMaterials = displayMaterials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const uniqueSubjects = ['All', ...new Set(materials.map(m => m.subject))];
    const uniqueTypes = ['All', ...new Set(materials.map(m => m.type))];
    const uniqueClasses = ['All', ...new Set(materials.map(m => m.class))];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <h3 className="text-xl font-bold text-gray-900">Study Materials & Question Papers</h3>
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              Request Material
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveMaterialTab('All')}
              className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeMaterialTab === 'All' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All Materials
              {activeMaterialTab === 'All' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></span>}
            </button>
            <button
              onClick={() => setActiveMaterialTab('Recent')}
              className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeMaterialTab === 'Recent' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Recent
              {activeMaterialTab === 'Recent' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></span>}
            </button>
          </div>

          {/* Filters */}
          {activeMaterialTab === 'All' && (
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search by Title or Teacher</label>
                <input
                  type="text"
                  placeholder="e.g., Algebra or Mr. Smith"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={materialSearchTerm}
                  onChange={(e) => setMaterialSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={materialFilters.subject}
                  onChange={(e) => setMaterialFilters({ ...materialFilters, subject: e.target.value })}
                >
                  {uniqueSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={materialFilters.type}
                  onChange={(e) => setMaterialFilters({ ...materialFilters, type: e.target.value })}
                >
                  {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={materialStartDate}
                    onChange={(e) => setMaterialStartDate(e.target.value)}
                    title="Start Date"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={materialEndDate}
                    onChange={(e) => setMaterialEndDate(e.target.value)}
                    title="End Date"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`px-4 py-2 rounded-lg font-medium border transition-colors flex items-center gap-2 ${showFavoritesOnly
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Bookmark size={18} className={showFavoritesOnly ? "fill-current" : ""} />
                  Favorites
                </button>
              </div>
            </div>
          )}

          {/* List */}
          <div className="space-y-4">
            {paginatedMaterials.length > 0 ? (
              paginatedMaterials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${material.type === 'Question Paper' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{material.title}</h4>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-600">
                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200">{material.subject}</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200">{material.class}</span>
                        <span>• Uploaded by {material.teacher}</span>
                        <span>• {material.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={`${(materialRatings[material.id]?.rating || 0) >= star
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{material.size}</span>
                    <button
                      onClick={() => openRateModal(material)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                      title="Rate & Review"
                    >
                      <MessageSquare size={20} />
                    </button>
                    <button
                      onClick={() => toggleBookmark(material.id)}
                      className={`p-2 rounded-full transition-colors ${bookmarkedMaterials.includes(material.id) ? 'text-yellow-600 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                      title={bookmarkedMaterials.includes(material.id) ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Bookmark size={20} className={bookmarkedMaterials.includes(material.id) ? "fill-current" : ""} />
                    </button>
                    <button
                      onClick={() => {
                        setViewMaterial(material);
                        addToRecent(material);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="View"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => openShareModal(material)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                      title="Share"
                    >
                      <Share2 size={20} />
                    </button>
                    <button onClick={() => handleDownload(material)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Download">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No materials found matching your filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, displayMaterials.length)} of {displayMaterials.length} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {studentData.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <p className="text-sm text-gray-600">Class & Section</p>
            <p className="text-xl font-bold text-accent">{studentData.class} - {studentData.section}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <p className="text-sm text-gray-600">Roll Number</p>
            <p className="text-xl font-bold text-green-600">{studentData.rollNumber}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <p className="text-sm text-gray-600">Attendance %</p>
            <p className="text-xl font-bold text-purple-600">{dashboardData.attendancePercentage}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <p className="text-sm text-gray-600">Pending Assignments</p>
            <p className="text-xl font-bold text-orange-600">{dashboardData.pendingAssignments}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Upcoming Exam</p>
            <p className="font-semibold text-yellow-800">{dashboardData.upcomingExam}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Fee Due</p>
            <p className="font-semibold text-red-800">{dashboardData.feeDue}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Trend</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Jan</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${95 >= 90 ? 'bg-green-600' : 95 >= 70 ? 'bg-blue-600' : 95 >= 50 ? 'bg-orange-600' : 'bg-red-600'}`} style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feb</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${92 >= 90 ? 'bg-green-600' : 92 >= 70 ? 'bg-blue-600' : 92 >= 50 ? 'bg-orange-600' : 'bg-red-600'}`} style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mar</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${98 >= 90 ? 'bg-green-600' : 98 >= 70 ? 'bg-blue-600' : 98 >= 50 ? 'bg-orange-600' : 'bg-red-600'}`} style={{ width: '98%' }}></div>
              </div>
              <span className="text-sm">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Apr</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${96 >= 90 ? 'bg-green-600' : 96 >= 70 ? 'bg-blue-600' : 96 >= 50 ? 'bg-orange-600' : 'bg-red-600'}`} style={{ width: '96%' }}></div>
              </div>
              <span className="text-sm">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">May</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${94 >= 90 ? 'bg-green-600' : 94 >= 70 ? 'bg-blue-600' : 94 >= 50 ? 'bg-orange-600' : 'bg-red-600'}`} style={{ width: '94%' }}></div>
              </div>
              <span className="text-sm">94%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Marks Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mathematics</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Science</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">English</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">History</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">88%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Subject Performance</h3>
            <div className="flex items-center justify-center">
              <SimplePieChart
                data={[
                  { label: 'Mathematics', value: 85 },
                  { label: 'Science', value: 92 },
                  { label: 'English', value: 78 },
                  { label: 'History', value: 88 }
                ]}
                size={200}
                colors={['#ef4444', '#10b981', '#f59e0b', '#3b82f6']}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {dashboardData.recentNotifications.map(notification => (
            <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${notification.read ? 'border-gray-300 bg-gray-50' : 'border-accent bg-gray-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-accent rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm hover-card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">15</p>
            <p className="text-sm text-gray-600">Total Subjects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Exams This Year</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">4.5</p>
            <p className="text-sm text-gray-600">Average GPA</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Working Days</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceData.totalWorkingDays}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Days Present</p>
          <p className="text-2xl font-bold text-green-600">{attendanceData.daysPresent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Days Absent</p>
          <p className="text-2xl font-bold text-red-600">{attendanceData.daysAbsent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Attendance %</p>
          <p className="text-2xl font-bold text-accent">{attendanceData.percentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Attendance Trend</h3>
          <div className="space-y-3">
            {attendanceData.monthlyData.map(month => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{month.month}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className={`h-4 rounded-full ${(month.present / (month.present + month.absent)) * 100 >= 90 ? 'bg-green-600' :
                      (month.present / (month.present + month.absent)) * 100 >= 70 ? 'bg-blue-600' :
                        (month.present / (month.present + month.absent)) * 100 >= 50 ? 'bg-orange-600' : 'bg-red-600'
                      }`} style={{ width: `${(month.present / (month.present + month.absent)) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{Math.round((month.present / (month.present + month.absent)) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Overview</h3>
          <div className="flex items-center justify-center mb-4">
            <SimplePieChart
              data={[
                { label: 'Present', value: attendanceData.daysPresent },
                { label: 'Absent', value: attendanceData.daysAbsent }
              ]}
              size={200}
              colors={['#10b981', '#ef4444']}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Present</span>
              </div>
              <span className="text-sm font-medium">{attendanceData.daysPresent} days ({attendanceData.percentage}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Absent</span>
              </div>
              <span className="text-sm font-medium">{attendanceData.daysAbsent} days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.dateWiseStatus.slice(0, 10).map((record, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium">{record.date}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-sm ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-2">All Subjects</td>
                  <td className="py-2 text-sm text-gray-600">
                    {record.status === 'Present' ? 'Attended all classes' :
                      record.status === 'Absent' ? 'Medical leave' :
                        'Late arrival'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent">95%</p>
            <p className="text-sm text-gray-700">Current Goal</p>
            <p className="text-xs text-accent mt-1">Achieved ✅</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">98%</p>
            <p className="text-sm text-green-800">Next Target</p>
            <p className="text-xs text-green-600 mt-1">Keep it up!</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-purple-800">Perfect Attendance</p>
            <p className="text-xs text-purple-600 mt-1">Challenge yourself</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarksResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Overall Grade</p>
          <p className="text-3xl font-bold text-green-600">A</p>
          <p className="text-xs text-gray-500">Grade 10 Average</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Average Percentage</p>
          <p className="text-3xl font-bold text-accent">87.5%</p>
          <p className="text-xs text-gray-500">This Year</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Subjects Passed</p>
          <p className="text-3xl font-bold text-purple-600">15/15</p>
          <p className="text-xs text-gray-500">All Subjects</p>
        </div>
      </div>

      {marksData.map((exam, examIndex) => (
        <div key={examIndex} className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{exam.examName}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h4>
              <div className="space-y-3">
                {exam.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{subject.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div className={`h-3 rounded-full ${subject.percentage >= 90 ? 'bg-green-500' :
                            subject.percentage >= 70 ? 'bg-blue-500' :
                              subject.percentage >= 50 ? 'bg-orange-500' :
                                'bg-red-500'
                            }`} style={{ width: `${subject.percentage}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{subject.marks}/{subject.total}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-gray-100 text-accent' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {subject.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">A Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs font-medium">3 subjects</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">A- Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-xs font-medium">1 subject</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">B+ Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-xs font-medium">0 subjects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Subject</th>
                  <th className="text-center py-2">Marks</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-center py-2">Percentage</th>
                  <th className="text-center py-2">Grade</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {exam.subjects.map((subject, subjectIndex) => (
                  <tr key={subjectIndex} className="border-b">
                    <td className="py-2 font-medium">{subject.name}</td>
                    <td className="py-2 text-center">{subject.marks}</td>
                    <td className="py-2 text-center">{subject.total}</td>
                    <td className="py-2 text-center">{subject.percentage}%</td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-gray-100 text-accent' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${subject.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {subject.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Marks</p>
              <p className="text-xl font-bold text-gray-900">{exam.totalMarks}/{exam.maxMarks}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-xl font-bold text-accent">{exam.percentage}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Grade</p>
              <p className="text-xl font-bold text-green-600">{exam.grade}</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Teacher Remarks</p>
            <p className="text-gray-800">{exam.teacherRemarks}</p>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Improvement</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mathematics</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +5%</span>
                  <span className="text-sm font-medium">85% → 90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Science</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +3%</span>
                  <span className="text-sm font-medium">89% → 92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">English</span>
                <div className="flex items-center gap-2">
                  <span className="text-red-600 text-sm">↘️ -2%</span>
                  <span className="text-sm font-medium">80% → 78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">History</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +7%</span>
                  <span className="text-sm font-medium">81% → 88%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Exam-wise Comparison</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Unit Test 1</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85.75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mid-term Exam</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '87.5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">87.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Final Exam</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm font-medium">90% (Predicted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetable = () => {
    const days = Object.keys(timetableData);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Timetable</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium ${selectedDay === day ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {timetableData[selectedDay].map((slot, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${slot.subject === 'Break' ? 'bg-gray-50 border-gray-300' : 'bg-white border-accent'
                }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{slot.subject}</p>
                    {slot.subject !== 'Break' && (
                      <p className="text-sm text-gray-600">Teacher: {slot.teacher}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{slot.time}</p>
                    {slot.room && <p className="text-sm text-gray-600">{slot.room}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAssignments = () => {
    const uniqueSubjects = ['All', ...new Set(assignmentsData.map(a => a.subject))];
    const filteredAssignments = assignmentsData.filter(a =>
      assignmentSubjectFilter === 'All' || a.subject === assignmentSubjectFilter
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-end items-center mb-2">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={assignmentSubjectFilter}
              onChange={(e) => setAssignmentSubjectFilter(e.target.value)}
              className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
            >
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject === 'All' ? 'All Subjects' : subject}</option>
              ))}
            </select>
          </div>
        </div>
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-gray-600">Subject: {assignment.subject}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' :
                assignment.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                {assignment.status}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Assigned Date</p>
                <p className="font-medium">{assignment.assignedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className={`font-medium ${assignment.status === 'Overdue' ? 'text-red-600' : ''}`}>
                  {assignment.dueDate}
                </p>
              </div>
            </div>
            {assignment.status === 'Submitted' && assignment.feedback && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Teacher Feedback</p>
                <p className="text-gray-800">{assignment.feedback}</p>
              </div>
            )}
            {assignment.status !== 'Submitted' && (
              <button
                onClick={() => handleAssignmentUpload(assignment.id)}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:opacity-95 transition-colors"
              >
                <Upload size={16} />
                Upload Assignment
              </button>
            )}
          </div>
        ))}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
            No assignments found for the selected subject.
          </div>
        )}
      </div>
    )
  };

  const renderFeePayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Fee</p>
          <p className="text-2xl font-bold text-gray-900">${feeData.totalFee}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Paid Amount</p>
          <p className="text-2xl font-bold text-green-600">${feeData.paidAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Pending Amount</p>
          <p className="text-2xl font-bold text-red-600">${feeData.pendingAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Due Date</p>
          <p className="text-lg font-bold text-orange-600">{feeData.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Distribution</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="96, 4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeDasharray="4, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">96%</p>
                  <p className="text-sm text-gray-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Paid Amount</span>
              </div>
              <span className="text-sm font-medium"> (96%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Pending Amount</span>
              </div>
              <span className="text-sm font-medium"> (4%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Trend</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Jan</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs font-medium">$300 (100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feb</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs font-medium">$300 (100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mar</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs font-medium">$300 (100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Apr</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <span className="text-xs font-medium">$250 (83%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">May</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                </div>
                <span className="text-xs font-medium">$0 (0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Method</th>
                <th className="text-left py-2">Receipt</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeData.paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{payment.date}</td>
                  <td className="py-2">${payment.amount}</td>
                  <td className="py-2">{payment.method}</td>
                  <td className="py-2">{payment.receipt}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDownloadReceipt(payment.receipt)}
                      className="flex items-center gap-1 text-accent hover:opacity-90"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent"></p>
            <p className="text-sm text-gray-700">Tuition Fee</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600"></p>
            <p className="text-sm text-green-800">Transportation</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600"></p>
            <p className="text-sm text-purple-800">Books & Materials</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600"></p>
            <p className="text-sm text-orange-800">Other Fees</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notificationsData.map(notification => (
        <div key={notification.id} className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${notification.read ? 'border-gray-300' : 'border-accent'
          }`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${notification.category === 'Assignment' ? 'bg-gray-100 text-accent' :
                notification.category === 'Grade' ? 'bg-green-100 text-green-800' :
                  notification.category === 'Meeting' ? 'bg-purple-100 text-purple-800' :
                    notification.category === 'Fee' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                }`}>
                {notification.category}
              </span>
              {!notification.read && <div className="w-2 h-2 bg-accent rounded-full"></div>}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{notification.description}</p>
          <p className="text-sm text-gray-500">{notification.dateTime}</p>
        </div>
      ))}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">School Announcements</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent">
            <h4 className="font-semibold text-accent">Parent-Teacher Meeting</h4>
            <p className="text-gray-700 mt-1">Scheduled for May 28, 2024 at 10:00 AM in the auditorium.</p>
            <p className="text-sm text-gray-600 mt-2">Posted: May 18, 2024</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900">Sports Day</h4>
            <p className="text-green-800 mt-1">Annual sports day will be held on June 5, 2024. All students must participate.</p>
            <p className="text-sm text-green-600 mt-2">Posted: May 15, 2024</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-900">Exam Schedule Update</h4>
            <p className="text-yellow-800 mt-1">Final exams will start from May 30, 2024. Check the timetable for details.</p>
            <p className="text-sm text-yellow-600 mt-2">Posted: May 12, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar - May 2024</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div>
                <h4 className="font-semibold text-red-900">May 15, 2024</h4>
                <p className="text-red-800 text-sm">Unit Test 1 - All Subjects</p>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-accent">
              <div>
                <h4 className="font-semibold text-accent">May 20, 2024</h4>
                <p className="text-gray-700 text-sm">Assignment Submission Deadline</p>
              </div>
              <span className="text-xs bg-gray-100 text-accent px-2 py-1 rounded">Assignment</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div>
                <h4 className="font-semibold text-green-900">May 25, 2024</h4>
                <p className="text-green-800 text-sm">Mathematics Final Exam</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div>
                <h4 className="font-semibold text-purple-900">May 28, 2024</h4>
                <p className="text-purple-800 text-sm">Parent-Teacher Meeting</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Meeting</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div>
                <h4 className="font-semibold text-orange-900">May 30, 2024</h4>
                <p className="text-orange-800 text-sm">School Holiday - Public Holiday</p>
              </div>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Holiday</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar - June 2024</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <div>
                <h4 className="font-semibold text-indigo-900">June 1, 2024</h4>
                <p className="text-indigo-800 text-sm">Science Practical Exam</p>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <div>
                <h4 className="font-semibold text-pink-900">June 5, 2024</h4>
                <p className="text-pink-800 text-sm">Annual Sports Day</p>
              </div>
              <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">Event</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <div>
                <h4 className="font-semibold text-teal-900">June 10, 2024</h4>
                <p className="text-teal-800 text-sm">Mid-term Break Begins</p>
              </div>
              <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Holiday</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <h4 className="font-semibold text-yellow-900">June 15, 2024</h4>
                <p className="text-yellow-800 text-sm">School Picnic</p>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Event</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-500">
              <div>
                <h4 className="font-semibold text-gray-900">June 20, 2024</h4>
                <p className="text-gray-800 text-sm">Classes Resume</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Academic</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-red-800">Exams This Month</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent">2</p>
            <p className="text-sm text-gray-700">Assignments Due</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-sm text-green-800">PTM Scheduled</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">2</p>
            <p className="text-sm text-purple-800">School Events</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">Term End</h4>
            <p className="text-gray-600 text-sm">June 30, 2024 - All final exams completed</p>
          </div>
          <div className="border-l-4 border-accent pl-4">
            <h4 className="font-semibold text-gray-900">Result Declaration</h4>
            <p className="text-gray-600 text-sm">July 15, 2024 - Report cards distributed</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">New Term Begins</h4>
            <p className="text-gray-600 text-sm">August 1, 2024 - Classes resume for new academic year</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Academic Performance Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Academic Performance Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent">A</p>
            <p className="text-sm text-gray-700">Overall Grade</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">87.5%</p>
            <p className="text-sm text-green-800">Average Score</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">4.2</p>
            <p className="text-sm text-purple-800">GPA</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">15/15</p>
            <p className="text-sm text-orange-800">Subjects Passed</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Performance</h3>
        <div className="space-y-3">
          {marksData[0].subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">{subject.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: `${subject.percentage}%` }}></div>
                </div>
                <span className="text-sm font-medium">{subject.marks}/{subject.total}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                  subject.grade.startsWith('B') ? 'bg-gray-100 text-accent' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {subject.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{attendanceData.daysPresent}</p>
            <p className="text-sm text-green-800">Days Present</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{attendanceData.daysAbsent}</p>
            <p className="text-sm text-red-800">Days Absent</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent">{attendanceData.percentage}%</p>
            <p className="text-sm text-gray-700">Overall Percentage</p>
          </div>
        </div>
      </div>

      {/* Fee Payment Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Payment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">${feeData.paidAmount}</p>
            <p className="text-sm text-green-800">Paid Amount</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">${feeData.pendingAmount}</p>
            <p className="text-sm text-red-800">Pending Amount</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-accent">{feeData.status}</p>
            <p className="text-sm text-gray-700">Payment Status</p>
          </div>
        </div>
      </div>

      {/* Assignments Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Assignments Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-accent">{assignmentsData.filter(a => a.status === 'Submitted').length}</p>
            <p className="text-sm text-gray-700">Submitted</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{assignmentsData.filter(a => a.status === 'Pending').length}</p>
            <p className="text-sm text-yellow-800">Pending</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{assignmentsData.filter(a => a.status === 'Overdue').length}</p>
            <p className="text-sm text-red-800">Overdue</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-accent">Assignment Submitted</p>
              <p className="text-xs text-gray-600">History Essay submitted on May 20, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-green-900">Grade Updated</p>
              <p className="text-xs text-green-700">Science quiz grade updated to 92%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-purple-900">Fee Payment</p>
              <p className="text-xs text-purple-700"> fee payment made on April 15, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <img
              src={studentData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=c7d2fe&color=3730a3&size=128`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700 transition-colors shadow-sm border-2 border-white"
              title="Upload Photo"
            >
              <Camera size={14} />
            </button>
            {studentData.profileImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm border-2 border-white"
                title="Remove Photo"
              >
                <Trash2 size={14} />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
            <p className="text-gray-600">{studentData.class} - {studentData.section} | Roll: {studentData.rollNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={studentData.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              defaultValue={studentData.rollNumber}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <input
              type="text"
              defaultValue={studentData.class}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <input
              type="text"
              defaultValue={studentData.section}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              defaultValue={studentData.dob}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={studentData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              defaultValue={studentData.address}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Parent Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
              <input
                type="text"
                defaultValue={studentData.parentName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Contact</label>
              <input
                type="tel"
                defaultValue={studentData.parentContact}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-accent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateProfile}
            className="flex items-center gap-2 bg-accent text-white px-6 py-2 rounded-lg hover:opacity-95 transition-colors"
          >
            <Edit size={16} />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return renderDashboard();
      case 'Attendance':
        return renderAttendance();
      case 'Marks/Results':
        return renderMarksResults();
      case 'Timetable':
        return renderTimetable();
      case 'Assignments':
        return renderAssignments();
      case 'Study Materials':
        return renderStudyMaterials();
      case 'Fee & Payments':
        return renderFeePayments();
      case 'Announcements':
        return renderAnnouncements();
      case 'Calendar':
        return renderCalendar();
      case 'Reports':
        return renderReports();
      case 'Notifications':
        return renderNotifications();
      case 'Profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen themed-bg font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#008080] border-r border-teal-600 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img src="/assets/logo.png" alt="EduMind Logo" className="h-32 w-auto max-w-full object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => handleSectionChange(item.id)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 text-teal-100 hover:bg-teal-700 hover:text-white w-full p-3 rounded-xl transition-colors duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">{activeSection}</h1>
          </div>
          <div className="flex items-center gap-8 ml-auto">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
              >
                <Bell size={28} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Notifications</span>
                    <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-xs text-indigo-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? <p className="text-sm text-gray-500 p-4 text-center">No notifications</p> :
                      notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${!n.read ? 'bg-indigo-50/50' : ''}`}>
                          <p className="text-sm text-gray-800">{n.title}</p>
                          <p className="text-xs text-gray-500">{n.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.dateTime}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleSectionChange('Profile')}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors z-20 relative"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{studentData.name}</p>
                <p className="text-xs text-gray-500 font-medium">{studentData.class} - {studentData.section}</p>
              </div>
              <img
                src={studentData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=c7d2fe&color=3730a3&size=40`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer"
              />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 themed-bg animate-fadeIn" key={activeSection}>
          {renderContent()}
        </main>
      </div>

      {/* Request Material Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Request Study Material</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleMaterialRequestSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={materialRequest.subject}
                  onChange={(e) => setMaterialRequest({ ...materialRequest, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science', 'Art'].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={materialRequest.title}
                  onChange={(e) => setMaterialRequest({ ...materialRequest, title: e.target.value })}
                  placeholder="e.g., Thermodynamics Notes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  value={materialRequest.description}
                  onChange={(e) => setMaterialRequest({ ...materialRequest, description: e.target.value })}
                  placeholder="Any specific details..."
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rate Material Modal */}
      {showRateModal && rateMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Rate Material</h3>
              <button onClick={() => setShowRateModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900">{rateMaterial.title}</h4>
                <p className="text-sm text-gray-500">{rateMaterial.subject}</p>
              </div>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRateSubmit(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={32}
                      className={`${(materialRatings[rateMaterial.id]?.rating || 0) >= star
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        } hover:text-yellow-400`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center text-sm text-gray-500">
                Click a star to rate
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Material Modal */}
      {viewMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-popIn">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{viewMaterial.title}</h3>
                <p className="text-sm text-gray-500">{viewMaterial.subject} • {viewMaterial.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDownload(viewMaterial)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Download">
                  <Download size={20} />
                </button>
                <button onClick={() => setViewMaterial(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 p-4 overflow-y-auto flex items-center justify-center">
              {viewMaterial.fileUrl ? (
                <iframe src={viewMaterial.fileUrl} className="w-full h-full rounded-lg shadow-sm bg-white" title="Material Preview"></iframe>
              ) : (
                <div className="text-center text-gray-500">
                  <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Preview not available</p>
                  <p className="text-sm mb-6">This is a mock preview. In a real app, the PDF or document would be rendered here.</p>
                  <button onClick={() => handleDownload(viewMaterial)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Material Modal */}
      {showShareModal && shareMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Share Material</h3>
              <button onClick={closeShareModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600 mb-4">Share <strong>{shareMaterial.title}</strong> via:</p>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={shareViaEmail} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </button>
                <button onClick={shareViaWhatsApp} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                </button>
                <button onClick={copyLink} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group">
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <LinkIcon size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Copy Link</span>
                </button>
              </div>
            </div>
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
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${active ? 'bg-white/20 text-white font-bold' : 'text-teal-100 hover:bg-white/10 hover:text-white font-medium'}`}
  >
    <Icon size={20} className={active ? 'text-white' : 'text-teal-200 group-hover:text-white transition-colors'} />
    <span className="flex-1 text-left">{label}</span>
  </button>
);

export default StudentDashboard;
