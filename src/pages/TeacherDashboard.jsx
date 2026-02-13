import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplePieChart from '../components/SimplePieChart';
import { getFullName, getUser } from '../utils/userUtils';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Bell,
  Menu,
  LogOut,
  Users,
  Plus,
  UserMinus,
  X,
  Award,
  MessageSquare,
  Calendar,
  Settings,
  UserCheck,
  MessageCircle,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  FileText,
  PieChart as PieChartIcon,
  Paperclip,
  Send,
  Video,
  MoreVertical,
  Trash2,
  Mic,
  MicOff,
  PhoneOff,
  VideoOff,
  BellOff,
  Ban,
  XCircle,
  Upload
} from 'lucide-react';

// Mock Data for Chat
const contactsData = [
  { id: 'parent-1', name: 'Mr. Sharma (Parent of Aarav)', avatar: 'https://i.pravatar.cc/150?u=parent1', online: true, lastSeen: 'Online' },
  { id: 'parent-2', name: 'Mrs. Gupta (Parent of Vivaan)', avatar: 'https://i.pravatar.cc/150?u=parent2', online: false, lastSeen: '2 hours ago' },
  { id: 'student-1', name: 'Aditya Patel (Class 10-A)', avatar: 'https://i.pravatar.cc/150?u=student1', online: true, lastSeen: 'Online' },
  { id: 'admin-1', name: 'Principal', avatar: 'https://i.pravatar.cc/150?u=principal', online: false, lastSeen: 'Yesterday' },
];

const messagesData = {
  'parent-1': [
    { id: 1, sender: 'other', text: 'Hello, I wanted to discuss Aarav\'s progress.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Sure, Mr. Sharma. He is doing well in Mathematics.', time: '10:32 AM' },
  ],
  'parent-2': [
    { id: 1, sender: 'other', text: 'Will there be extra classes this Saturday?', time: 'Yesterday' },
  ],
  'student-1': [
    { id: 1, sender: 'me', text: 'Please submit your assignment by tomorrow.', time: '2 days ago' },
    { id: 2, sender: 'other', text: 'Yes sir, I am working on it.', time: '2 days ago' },
  ],
  'admin-1': [],
};

const ContactItem = ({ contact, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-4 cursor-pointer transition-colors border-l-4 ${isSelected ? 'bg-gray-50 border-accent' : 'border-transparent hover:bg-gray-50'
      }`}
  >
    <div className="relative">
      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
      <span
        className={`absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full border-2 border-white ${contact.online ? 'bg-green-500' : 'bg-gray-400'
          }`}
      ></span>
    </div>
    <div className="ml-4 flex-1">
      <div className="flex justify-between items-center">
        <p className={`font-semibold ${contact.unread ? 'text-gray-900 font-bold' : 'text-gray-800'}`}>{contact.name}</p>
        {contact.unread && <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>}
      </div>
      <p className={`text-sm ${contact.unread ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>{contact.lastSeen}</p>
      {contact.muted && <BellOff size={14} className="text-gray-400 mt-1" />}
    </div>
  </div>
);

const MessageBubble = ({ message, onDelete }) => {
  const isOutgoing = message.sender === 'me';
  return (
    <div className={`flex my-2 ${isOutgoing ? 'justify-end' : 'justify-start'} group items-center`}>
      {isOutgoing && (
        <button
          onClick={() => onDelete(message.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-opacity mr-2"
          title="Delete message"
        >
          <Trash2 size={16} />
        </button>
      )}
      <div
        className={`max-w-sm lg:max-w-lg px-5 py-3 rounded-3xl shadow-sm ${isOutgoing
          ? 'bg-indigo-600 text-white rounded-br-lg'
          : 'bg-gray-100 text-gray-800 rounded-bl-lg'
          }`}
      >
        {message.attachment && (
          <div className={`flex items-center gap-2 mb-2 p-2 rounded-lg ${isOutgoing ? 'bg-white/20' : 'bg-white/40'}`}>
            <Paperclip size={16} />
            <span className="text-xs font-medium truncate max-w-[200px]">{message.attachment.name}</span>
          </div>
        )}
        {message.text && <p className="text-sm">{message.text}</p>}
        <p className={`text-xs mt-1.5 ${isOutgoing ? 'text-indigo-200' : 'text-gray-500'} text-right`}>
          {message.time}
        </p>
      </div>
      {!isOutgoing && (
        <button
          onClick={() => onDelete(message.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-opacity ml-2"
          title="Delete message"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

const ChatSection = () => {
  const [contacts, setContacts] = useState(contactsData.map(c => ({ ...c, unread: false, muted: false, blocked: false })));
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(messagesData[selectedContact.id] || []);
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages(messagesData[selectedContact.id] || []);
    scrollToBottom();
    setActiveCall(null);
    setShowMoreOptions(false);
    setSearchQuery('');
    setShowSearch(false);
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachment) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: attachment ? { name: attachment.name, type: attachment.type } : null
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
    setAttachment(null);

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          sender: 'other',
          text: 'This is an automated response.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 3000);
    }, 1000);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
  };

  const filteredMessages = messages.filter(msg =>
    (msg.text || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAsUnread = () => {
    setContacts(prev => prev.map(c => c.id === selectedContact.id ? { ...c, unread: true } : c));
    setShowMoreOptions(false);
  };

  const handleMuteToggle = () => {
    const updatedContacts = contacts.map(c => c.id === selectedContact.id ? { ...c, muted: !c.muted } : c);
    setContacts(updatedContacts);
    setSelectedContact(updatedContacts.find(c => c.id === selectedContact.id));
    setShowMoreOptions(false);
  };

  const handleBlockToggle = () => {
    const updatedContacts = contacts.map(c => c.id === selectedContact.id ? { ...c, blocked: !c.blocked } : c);
    setContacts(updatedContacts);
    setSelectedContact(updatedContacts.find(c => c.id === selectedContact.id));
    setShowMoreOptions(false);
  };

  return (
    <div className="flex h-full font-sans bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <aside className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search contacts..." className="w-full pl-12 pr-4 py-2 bg-gray-50 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} isSelected={selectedContact.id === contact.id} onClick={() => {
              setSelectedContact(contact);
              setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, unread: false } : c));
            }} />
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-gray-50 relative">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center">
            <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-900">{selectedContact.name}</p>
              {isTyping ? (
                <p className="text-sm text-indigo-600 font-medium animate-pulse">is typing...</p>
              ) : (
                <p className="text-sm text-gray-500">{selectedContact.lastSeen}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSearch(!showSearch)} className={`p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors ${showSearch ? 'bg-gray-100 text-indigo-600' : ''}`}><Search size={20} /></button>
            <button onClick={() => setActiveCall('voice')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><Phone size={20} /></button>
            <button onClick={() => setActiveCall('video')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><Video size={20} /></button>
            <div className="relative">
              <button onClick={() => setShowMoreOptions(!showMoreOptions)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><MoreVertical size={20} /></button>
              {showMoreOptions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button onClick={handleMuteToggle} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <BellOff size={16} /> {selectedContact.muted ? 'Unmute Notifications' : 'Mute Notifications'}
                  </button>
                  <button onClick={handleBlockToggle} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Ban size={16} /> {selectedContact.blocked ? 'Unblock User' : 'Block User'}
                  </button>
                  <button onClick={handleMarkAsUnread} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <MessageSquare size={16} /> Mark as Unread
                  </button>
                  <button onClick={() => { setMessages([]); setShowMoreOptions(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <Trash2 size={16} /> Clear Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {showSearch && (
          <div className="bg-white border-b border-gray-200 p-3 animate-fadeIn">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in conversation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {activeCall && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white/20 shadow-2xl animate-pulse">
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{selectedContact.name}</h3>
            <p className="text-slate-400 mb-12 animate-pulse">{activeCall === 'video' ? 'Video Calling...' : 'Voice Calling...'}</p>
            <div className="flex items-center gap-6">
              <button onClick={() => setActiveCall(null)} className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 transform hover:scale-110">
                <PhoneOff size={32} />
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto">
          {filteredMessages.map(message => (<MessageBubble key={message.id} message={message} onDelete={handleDeleteMessage} />))}
          <div ref={messagesEndRef} />
        </div>
        <footer className="bg-white border-t border-gray-200 p-4">
          {selectedContact.blocked ? (
            <div className="text-center text-gray-500 py-2 bg-gray-50 rounded-lg">
              You have blocked this user. <button onClick={handleBlockToggle} className="text-indigo-600 hover:underline">Unblock</button> to send messages.
            </div>
          ) : (
            <>
              {attachment && (
                <div className="flex items-center justify-between bg-gray-50 p-2 px-4 rounded-lg mb-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Paperclip size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700 truncate max-w-xs">{attachment.name}</span>
                  </div>
                  <button onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><Paperclip size={20} /></button>
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:ring-2 focus:ring-indigo-500 outline-none" />
                <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors" disabled={!inputText.trim() && !attachment}><Send size={20} /></button>
              </form>
            </>
          )}
        </footer>
      </main>
    </div>
  );
};

const TeacherDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [newStudentRequest, setNewStudentRequest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rollNumber: '',
    className: '',
    reason: ''
  });
  const [deleteStudentRequest, setDeleteStudentRequest] = useState({
    studentId: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', class: '', dueDate: '', description: '' });
  const [submittedAssignments, setSubmittedAssignments] = useState([
    { title: 'Algebra Worksheet', class: 'Class 10-A', submitted: 28, total: 32, date: '2024-01-15' },
    { title: 'Physics Lab Report', class: 'Class 10-B', submitted: 25, total: 30, date: '2024-01-18' },
    { title: 'History Essay', class: 'Class 9-A', submitted: 20, total: 28, date: '2024-01-20' },
    { title: 'Geometry Quiz', class: 'Class 11-A', submitted: 30, total: 33, date: '2024-01-22' },
  ]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [selectedAssignmentForMarks, setSelectedAssignmentForMarks] = useState(null);
  const [studentMarksList, setStudentMarksList] = useState([]);
  const [showClassDetailsModal, setShowClassDetailsModal] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'them', text: 'Hello teacher, I have a question about the assignment.', time: '10:30 AM' }
  ]);
  const [assignmentClassFilter, setAssignmentClassFilter] = useState('All');
  const [studentClassFilter, setStudentClassFilter] = useState('All');
  const [studentCurrentPage, setStudentCurrentPage] = useState(1);
  const [studentItemsPerPage] = useState(5);
  const [showStudentProfileModal, setShowStudentProfileModal] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    joiningDate: '',
    address: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment submission from Class 10-A', time: '2 mins ago', unread: true },
    { id: 2, text: 'Staff meeting at 2:00 PM', time: '1 hour ago', unread: false },
    { id: 3, text: 'Salary credited for January', time: 'Yesterday', unread: false }
  ]);
  const csvInputRef = useRef(null);

  // Data Definitions (Moved to top for scope visibility)
  const classes = [
    { name: 'Class 10-A', subject: 'Mathematics', students: 32, status: 'Active' },
    { name: 'Class 10-B', subject: 'Mathematics', students: 30, status: 'Active' },
  ];

  const studentsList = [
    { id: 1, name: 'Aarav Sharma', roll: '101', class: '10-A', performance: 'Excellent', attendance: '95%', email: 'aarav@example.com' },
    { id: 2, name: 'Vivaan Gupta', roll: '102', class: '10-A', performance: 'Good', attendance: '88%', email: 'vivaan@example.com' },
    { id: 3, name: 'Aditya Patel', roll: '103', class: '10-A', performance: 'Average', attendance: '75%', email: 'aditya@example.com' },
    { id: 4, name: 'Vihaan Kumar', roll: '104', class: '10-A', performance: 'Good', attendance: '92%', email: 'vihaan@example.com' },
    { id: 5, name: 'Arjun Singh', roll: '105', class: '10-A', performance: 'Excellent', attendance: '98%', email: 'arjun@example.com' },
    { id: 6, name: 'Sai Krishna', roll: '106', class: '10-A', performance: 'Average', attendance: '80%', email: 'sai@example.com' },
    { id: 7, name: 'Reyansh Reddy', roll: '107', class: '10-A', performance: 'Good', attendance: '90%', email: 'reyansh@example.com' },
    { id: 8, name: 'Ayaan Khan', roll: '108', class: '10-A', performance: 'Excellent', attendance: '96%', email: 'ayaan@example.com' },
    { id: 9, name: 'Karan Mehta', roll: '201', class: '10-B', performance: 'Good', attendance: '85%', email: 'karan@example.com' },
    { id: 10, name: 'Riya Singh', roll: '202', class: '10-B', performance: 'Excellent', attendance: '97%', email: 'riya@example.com' },
    { id: 11, name: 'Dev Patel', roll: '203', class: '10-B', performance: 'Average', attendance: '78%', email: 'dev@example.com' },
    { id: 12, name: 'Ananya Sharma', roll: '204', class: '10-B', performance: 'Good', attendance: '90%', email: 'ananya@example.com' },
  ];


  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar Helpers
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));


  // Mock Data for Charts
  useEffect(() => {
    setStudentCurrentPage(1);
  }, [studentClassFilter]);

  const attendanceChartData = [
    { label: 'Present', value: 88 },
    { label: 'Absent', value: 12 },
  ];
  const ATTENDANCE_COLORS = ['#22c55e', '#ef4444'];

  const gradeDistributionData = [
    { label: 'A', value: 30 },
    { label: 'B', value: 45 },
    { label: 'C', value: 15 },
    { label: 'D', value: 10 },
  ];
  const GRADE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const handleExportClassPerformance = () => {
    const headers = ['Grade', 'Percentage'];
    const csvRows = [
      headers.join(','),
      ...gradeDistributionData.map(item => `"${item.label}","${item.value}%"`)
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'class_performance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    try {
      const currentUser = getUser();

      setProfileData({
        name: getFullName() || 'Teacher',
        email: currentUser.email || 'teacher@school.com',
        phone: currentUser.phone || '+1 234 567 890',
        department: currentUser.subject || 'Mathematics',
        joiningDate: currentUser.joinDate || '15 Aug 2020',
        address: currentUser.address || '123 Teacher Lane, Education City'
      });
    } catch (error) {
      console.error('Error fetching staff type:', error);
    }
  }, []);

  const handleAddRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError('');
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'staff')) {
        throw new Error('Authentication error: Not authorized.');
      }
      const token = currentUser?.token;

      const response = await fetch('http://localhost:5000/api/student-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'add',
          studentData: {
            firstName: newStudentRequest.firstName,
            lastName: newStudentRequest.lastName,
            email: newStudentRequest.email,
            phone: newStudentRequest.phone,
            rollNumber: newStudentRequest.rollNumber,
            className: newStudentRequest.className,
          },
          reason: newStudentRequest.reason,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Request to add student submitted successfully.');
        setShowAddRequestModal(false);
        setNewStudentRequest({ firstName: '', lastName: '', email: '', phone: '', rollNumber: '', className: '', reason: '' });
      } else {
        setRequestError(result.error || 'Failed to submit request.');
      }
    } catch (error) {
      setRequestError('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError('');
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'staff')) {
        throw new Error('Authentication error: Not a teacher.');
      }
      const token = currentUser?.token;

      const response = await fetch('http://localhost:5000/api/student-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'delete', studentData: { studentId: deleteStudentRequest.studentId }, reason: deleteStudentRequest.reason }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Request to remove student submitted successfully.');
        setShowDeleteRequestModal(false);
        setDeleteStudentRequest({ studentId: '', reason: '' });
      } else {
        setRequestError(result.error || 'Failed to submit request.');
      }
    } catch (error) {
      setRequestError('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const newAssignmentData = {
      title: newAssignment.title,
      class: newAssignment.class,
      submitted: 0,
      total: classes.find(cls => cls.name === newAssignment.class)?.students || 0,
      date: newAssignment.dueDate
    };
    setSubmittedAssignments(prev => [...prev, newAssignmentData]);
    alert(`Assignment "${newAssignment.title}" created successfully!`);
    setShowAssignmentModal(false);
    setNewAssignment({ title: '', class: '', dueDate: '', description: '' });
  };

  const handleTakeAttendance = (cls) => {
    setSelectedClassForAttendance(cls);
    setAttendanceList(Array.from({ length: cls.students }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      roll: 100 + i + 1,
      status: Math.random() > 0.1 ? 'Present' : 'Absent' // Simulate attendance data
    })));
    setShowAttendanceModal(true);
  };

  const toggleAttendanceStatus = (id) => {
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s));
  };

  const submitAttendance = () => {
    alert(`Attendance submitted for ${selectedClassForAttendance.name}`);
    setShowAttendanceModal(false);
  };

  const handleEnterMarks = (assignment) => {
    setSelectedAssignmentForMarks(assignment);

    // Try to find students for this class from our mock data
    const classId = assignment.class.replace('Class ', '');
    const classStudents = studentsList.filter(s => s.class === classId);

    if (classStudents.length > 0) {
      setStudentMarksList(classStudents.map(s => ({ id: s.id, name: s.name, marks: '' })));
    } else {
      // Fallback to dummy data if no students found for class
      setStudentMarksList(Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        marks: ''
      })));
    }
    setShowMarksModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result;
        const lines = csv.split('\n');
        const newMarksList = [...studentMarksList];
        let updatedCount = 0;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const parts = line.split(',');
          if (parts.length >= 2) {
            const name = parts[0].trim();
            const marks = parts[1].trim();
            const studentIndex = newMarksList.findIndex(s => s.name.toLowerCase() === name.toLowerCase());
            if (studentIndex !== -1) {
              newMarksList[studentIndex].marks = marks;
              updatedCount++;
            }
          }
        }
        setStudentMarksList(newMarksList);
        alert(`Successfully imported marks for ${updatedCount} students.`);
        e.target.value = '';
      };
      reader.readAsText(file);
    }
  };

  const submitMarks = () => {
    // Here you would typically send the marks to the backend
    // For now, we'll just show an alert
    const submittedMarks = studentMarksList.filter(student => student.marks.trim() !== '').length;
    alert(`Marks submitted for ${selectedAssignmentForMarks.title}. ${submittedMarks} students marked.`);
    setShowMarksModal(false);
    setSelectedAssignmentForMarks(null);
    setStudentMarksList([]);
  };

  const handleViewClassDetails = (cls) => {
    setSelectedClassDetails(cls);
    setShowClassDetailsModal(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: 'me', text: chatMessage, time: 'Just now' }]);
    setChatMessage('');
  };

  const handleViewStudentProfile = (student) => {
    setSelectedStudentProfile(student);
    setShowStudentProfileModal(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  const teacherStats = {
    totalStudents: 128,
    classesPerDay: 4,
    assignmentsPending: 45,
    attendanceAverage: '88%',
  };


  const todaySchedule = [
    { time: '09:00 AM', class: 'Class 10-A', subject: 'Mathematics' },
    { time: '10:15 AM', class: 'Class 10-B', subject: 'Mathematics' },
    { time: '11:30 AM', class: 'Class 11-A', subject: 'Mathematics' },
    { time: '02:00 PM', class: 'Class 12-B', subject: 'Mathematics' },
  ];

  const handleDownloadTimetable = () => {
    alert("Downloading Timetable PDF...");
  };

  const filteredStudents = studentsList.filter(student => studentClassFilter === 'All' || student.class === studentClassFilter);
  const totalStudentPages = Math.ceil(filteredStudents.length / studentItemsPerPage);
  const displayedStudents = filteredStudents.slice((studentCurrentPage - 1) * studentItemsPerPage, studentCurrentPage * studentItemsPerPage);

  const recentActivities = [
    { action: 'Posted Assignment', target: 'Class 10-A', time: '2 hours ago' },
    { action: 'Marked Attendance', target: 'Class 10-B', time: '4 hours ago' },
    { action: 'Uploaded Study Material', target: 'Algebra Notes', time: 'Yesterday' },
    { action: 'Graded Test', target: 'Class 11-A', time: 'Yesterday' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const teacherName = profileData.name || 'Teacher';

  const teacherMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: activeView === 'dashboard', onClick: () => setActiveView('dashboard') },
    { icon: <GraduationCap size={20} />, label: 'My Classes', active: activeView === 'classes', onClick: () => setActiveView('classes') },
    { icon: <BookOpen size={20} />, label: 'Assignments', active: activeView === 'assignments', onClick: () => setActiveView('assignments') },
    { icon: <CalendarCheck size={20} />, label: 'Attendance', active: activeView === 'attendance', onClick: () => setActiveView('attendance') },
    { icon: <Users size={20} />, label: 'Students', active: activeView === 'students', onClick: () => setActiveView('students') },
    { icon: <Award size={20} />, label: 'Marks / Grades', active: activeView === 'marks', onClick: () => setActiveView('marks') },
    { icon: <MessageSquare size={20} />, label: 'Messages', active: activeView === 'messages', onClick: () => setActiveView('messages') },
    { icon: <Calendar size={20} />, label: 'Timetable', active: activeView === 'timetable', onClick: () => setActiveView('timetable') },
    { icon: <Settings size={20} />, label: 'Profile / Settings', active: activeView === 'profile', onClick: () => setActiveView('profile') },
  ];

  return (
    <div className="flex min-h-screen themed-bg font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img
            src="/assets/logo.png"
            alt="EduMind Logo"
            className="h-32 w-auto max-w-full object-contain cursor-pointer"
            onClick={() => setActiveView('dashboard')}
          />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {teacherMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${item.active ? 'bg-sky-50 text-sky-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 text-gray-600 hover:bg-red-50 hover:text-red-600 w-full p-3 rounded-xl transition-colors duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
          </div>

          <div className="flex items-center gap-6 relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Bell size={28} />
              {notifications.some(n => n.unread) && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>

            {showNotifications && (
              <div className="absolute top-16 right-20 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Notifications</span>
                  <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} className="text-xs text-indigo-600 hover:underline">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? <p className="text-sm text-gray-500 p-4 text-center">No notifications</p> :
                    notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${n.unread ? 'bg-indigo-50/50' : ''}`}>
                        <p className="text-sm text-gray-800">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            <button onClick={() => setActiveView('messages')} className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <MessageSquare size={28} />
            </button>
            <button type="button" onClick={() => setActiveView('profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 rounded-lg -ml-2 p-2 transition-colors z-20 relative">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{teacherName}</p>
                <p className="text-xs text-gray-500 font-medium">Teacher</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacherName)}&background=c7d2fe&color=3730a3`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 themed-bg animate-fadeIn" key={activeView}>
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {teacherName}</h1>
                <p className="text-gray-600 mt-2">Here's your teaching dashboard overview for today.</p>
              </div>

              {/* Summary Cards */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <p className="text-gray-600 text-sm">Classes Today</p>
                  <p className="text-3xl font-bold text-accent">{teacherStats.classesPerDay}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-green-600">{teacherStats.totalStudents}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <p className="text-gray-600 text-sm">Pending Attendance</p>
                  <p className="text-3xl font-bold text-orange-600">12</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <p className="text-gray-600 text-sm">Upcoming Assignments</p>
                  <p className="text-3xl font-bold text-purple-600">{teacherStats.assignmentsPending}</p>
                </div>
              </section>

              {/* Quick Action Buttons */}
              <div className="bg-white rounded-lg shadow p-6 hover-card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => setShowAssignmentModal(true)} className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Plus size={24} className="text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Add Assignment</span>
                  </button>
                  <button onClick={() => setActiveView('marks')} className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Award size={24} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Enter Grades</span>
                  </button>
                  <button onClick={() => setActiveView('messages')} className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <MessageSquare size={24} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-900">Message Class</span>
                  </button>
                </div>
              </div>

              {/* Today's Schedule & Calendar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Today's Schedule */}
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
                  <div className="space-y-3">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="text-2xl">📚</div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.class}</p>
                          <p className="text-sm text-gray-600">{item.subject}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Widget */}
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
                    <div className="flex gap-2">
                      <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                      </button>
                      <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-indigo-600 mb-4">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-xs font-bold text-gray-400 uppercase">{day}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-8"></div>
                        ))}
                        {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                          const day = i + 1;
                          const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
                          return (
                            <div key={day} className={`h-8 flex items-center justify-center text-sm rounded-full ${isToday ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-gray-200 cursor-pointer'}`}>
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Student Attendance Overview</h3>
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex-shrink-0">
                      <SimplePieChart data={attendanceChartData} colors={ATTENDANCE_COLORS} />
                    </div>
                    <div className="space-y-2">
                      {attendanceChartData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ATTENDANCE_COLORS[index] }}></div>
                          <span className="text-sm text-gray-600">{item.label}: <span className="font-bold text-gray-900">{item.value}%</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Distribution</h3>
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex-shrink-0">
                      <SimplePieChart data={gradeDistributionData} colors={GRADE_COLORS} />
                    </div>
                    <div className="space-y-2">
                      {gradeDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GRADE_COLORS[index] }}></div>
                          <span className="text-sm text-gray-600">{item.label}: <span className="font-bold text-gray-900">{item.value}%</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Feed & Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity Feed */}
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivities.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {(item.user || item.action || 'A').charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow p-6 hover-card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="text-center">
                        <p className="text-xs font-bold text-blue-600">JAN</p>
                        <p className="text-lg font-bold text-gray-900">20</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Science Fair</p>
                        <p className="text-sm text-gray-600">School Auditorium • 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="text-center">
                        <p className="text-xs font-bold text-purple-600">JAN</p>
                        <p className="text-lg font-bold text-gray-900">25</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Staff Meeting</p>
                        <p className="text-sm text-gray-600">Conference Room • 02:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Classes */}
              <div className="bg-white rounded-lg shadow p-6 hover-card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.subject}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">👥 {item.students} Students</p>
                      <button onClick={() => handleViewClassDetails(item)} className="text-indigo-600 text-sm font-medium hover:underline cursor-pointer">View Details</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Submissions */}
              <div className="bg-white rounded-lg shadow p-6 hover-card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assignment Submissions</h2>
                <div className="space-y-4">
                  {submittedAssignments.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.class}</p>
                        </div>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${(item.submitted / item.total) * 100 >= 90 ? 'bg-green-600' :
                              (item.submitted / item.total) * 100 >= 70 ? 'bg-blue-600' :
                                (item.submitted / item.total) * 100 >= 50 ? 'bg-orange-600' : 'bg-red-600'
                              }`}
                            style={{ width: `${(item.submitted / item.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {item.submitted}/{item.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="bg-white rounded-lg shadow p-6 hover-card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">92%</p>
                    <p className="text-sm text-blue-800">Student Satisfaction</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">4.8/5</p>
                    <p className="text-sm text-green-800">Teaching Rating</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">95%</p>
                    <p className="text-sm text-purple-800">Attendance Rate</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">87%</p>
                    <p className="text-sm text-orange-800">Assignment Completion</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance Trends</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm font-medium text-gray-900">Mathematics - Class 10-A</span>
                        <span className="text-sm font-bold text-green-600">↑ 5%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm font-medium text-gray-900">Mathematics - Class 10-B</span>
                        <span className="text-sm font-bold text-green-600">↑ 3%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm font-medium text-gray-900">Mathematics - Class 11-A</span>
                        <span className="text-sm font-bold text-red-600">↓ 2%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <p className="text-sm text-green-800">"Excellent teaching methods and clear explanations."</p>
                        <p className="text-xs text-green-600 mt-1">- Parent of Aarav Sharma</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-blue-800">"Very helpful and patient with students."</p>
                        <p className="text-xs text-blue-600 mt-1">- Class 10-A Student</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
                        <p className="text-sm text-yellow-800">"Could provide more practice problems."</p>
                        <p className="text-xs text-yellow-600 mt-1">- Parent of Vivaan Gupta</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Management Requests */}
              <div className="bg-white rounded-lg shadow p-6 hover-card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Student Management</h2>
                <p className="text-gray-600 mb-6">Request to add or remove students from your classes. All requests require admin approval.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowAddRequestModal(true)}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Plus className="text-white" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-green-800">Add New Student</p>
                      <p className="text-sm text-green-600">Request to enroll a new student</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowDeleteRequestModal(true)}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div className="p-2 bg-red-500 rounded-lg">
                      <UserMinus className="text-white" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-800">Remove Student</p>
                      <p className="text-sm text-red-600">Request to remove a student</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}



          {/* Add Student Request Modal */}
          {showAddRequestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Request to Add Student</h3>
                  <button onClick={() => setShowAddRequestModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <form onSubmit={handleAddRequestSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  {requestError && <p className="text-red-500 text-sm">{requestError}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" required value={newStudentRequest.firstName} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, firstName: e.target.value })} placeholder="First Name" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" required value={newStudentRequest.lastName} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, lastName: e.target.value })} placeholder="Last Name" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="email" required value={newStudentRequest.email} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, email: e.target.value })} placeholder="Email" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="tel" required value={newStudentRequest.phone} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, phone: e.target.value })} placeholder="Phone" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" required value={newStudentRequest.rollNumber} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, rollNumber: e.target.value })} placeholder="Roll Number" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" required value={newStudentRequest.className} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, className: e.target.value })} placeholder="Class (e.g., 10-A)" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                  </div>
                  <textarea value={newStudentRequest.reason} onChange={(e) => setNewStudentRequest({ ...newStudentRequest, reason: e.target.value })} placeholder="Reason for adding student..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" rows="3"></textarea>
                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowAddRequestModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium disabled:opacity-50">
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Student Request Modal */}
          {showDeleteRequestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Request to Remove Student</h3>
                  <button onClick={() => setShowDeleteRequestModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <form onSubmit={handleDeleteRequestSubmit} className="p-6 space-y-4">
                  {requestError && <p className="text-red-500 text-sm">{requestError}</p>}
                  <input type="text" required value={deleteStudentRequest.studentId} onChange={(e) => setDeleteStudentRequest({ ...deleteStudentRequest, studentId: e.target.value })} placeholder="Student ID (e.g., STU001)" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                  <textarea required value={deleteStudentRequest.reason} onChange={(e) => setDeleteStudentRequest({ ...deleteStudentRequest, reason: e.target.value })} placeholder="Reason for removal..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" rows="4"></textarea>
                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowDeleteRequestModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium disabled:opacity-50">
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Attendance Modal */}
          {showAttendanceModal && selectedClassForAttendance && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Mark Attendance</h3>
                    <p className="text-sm text-gray-500">{selectedClassForAttendance.name} • {new Date().toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => setShowAttendanceModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {attendanceList.map((student) => (
                      <div
                        key={student.id}
                        onClick={() => toggleAttendanceStatus(student.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${student.status === 'Present'
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-gray-900">{student.roll}</span>
                          {student.status === 'Present' ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <XCircle className="text-red-600" size={20} />
                          )}
                        </div>
                        <p className="font-medium text-gray-800 truncate">{student.name}</p>
                        <p className={`text-xs font-bold mt-1 ${student.status === 'Present' ? 'text-green-700' : 'text-red-700'}`}>
                          {student.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Present: <span className="font-bold text-green-600">{attendanceList.filter(s => s.status === 'Present').length}</span> •
                    Absent: <span className="font-bold text-red-600">{attendanceList.filter(s => s.status === 'Absent').length}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowAttendanceModal(false)} className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-100 font-medium">Cancel</button>
                    <button onClick={submitAttendance} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-200">Submit Attendance</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Marks Modal */}
          {showMarksModal && selectedAssignmentForMarks && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Enter Marks</h3>
                    <p className="text-sm text-gray-500">{selectedAssignmentForMarks.title} • {selectedAssignmentForMarks.class}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".csv"
                      ref={csvInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      onClick={() => csvInputRef.current.click()}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <Upload size={16} /> Import CSV
                    </button>
                    <button onClick={() => setShowMarksModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Roll No</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Marks (Out of 100)</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {studentMarksList.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-600">{101 + index}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              max="100"
                              value={student.marks}
                              onChange={(e) => {
                                const newMarks = [...studentMarksList];
                                newMarks[index].marks = e.target.value;
                                setStudentMarksList(newMarks);
                              }}
                              className="w-24 px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="0-100"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${!student.marks ? 'bg-gray-100 text-gray-500' :
                              parseInt(student.marks) >= 90 ? 'bg-green-100 text-green-700' :
                                parseInt(student.marks) >= 75 ? 'bg-blue-100 text-blue-700' :
                                  parseInt(student.marks) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                              }`}>
                              {!student.marks ? '-' :
                                parseInt(student.marks) >= 90 ? 'A' :
                                  parseInt(student.marks) >= 75 ? 'B' :
                                    parseInt(student.marks) >= 50 ? 'C' : 'D'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                  <button onClick={() => setShowMarksModal(false)} className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-100 font-medium">Cancel</button>
                  <button onClick={submitMarks} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-200">Save Marks</button>
                </div>
              </div>
            </div>
          )}

          {/* Assignment Creation Modal */}
          {showAssignmentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Create Assignment</h3>
                  <button onClick={() => setShowAssignmentModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <form onSubmit={handleCreateAssignment} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} placeholder="Assignment Title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newAssignment.class} onChange={(e) => setNewAssignment({ ...newAssignment, class: e.target.value })}>
                      <option value="">Select Class</option>
                      {classes.map((cls, idx) => (
                        <option key={idx} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="3" value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} placeholder="Assignment details..."></textarea>
                  </div>
                  <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowAssignmentModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium">Create</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeView === 'classes' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Classes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <GraduationCap size={24} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {cls.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                    <p className="text-gray-500 mb-4">{cls.subject}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-sm text-gray-600 flex items-center gap-2"><Users size={16} /> {cls.students} Students</span>
                      <button onClick={() => handleViewClassDetails(cls)} className="text-indigo-600 text-sm font-medium hover:underline cursor-pointer">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={assignmentClassFilter}
                    onChange={(e) => setAssignmentClassFilter(e.target.value)}
                  >
                    {['All', ...new Set(submittedAssignments.map(a => a.class))].map((cls, idx) => (
                      <option key={idx} value={cls}>{cls === 'All' ? 'All Classes' : cls}</option>
                    ))}
                  </select>
                  <button onClick={() => setShowAssignmentModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                    <Plus size={20} /> Create Assignment
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Submissions</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {submittedAssignments
                      .filter(assignment => assignmentClassFilter === 'All' || assignment.class === assignmentClassFilter)
                      .map((assignment, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{assignment.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{assignment.class}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{assignment.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{assignment.submitted}/{assignment.total}</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'attendance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="space-y-4">
                    {classes.map((cls, idx) => (
                      <div key={idx} onClick={() => handleTakeAttendance(cls)} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors group border border-transparent hover:border-indigo-100">
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-indigo-700">{cls.name}</p>
                          <p className="text-sm text-gray-500">{cls.students} Students</p>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-indigo-500" size={20} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Today's Overview</h3>
                  <div className="flex justify-center mb-4">
                    <SimplePieChart data={[{ label: 'Present', value: 88 }, { label: 'Absent', value: 12 }]} colors={['#22c55e', '#ef4444']} size={200} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">88%</p>
                      <p className="text-xs text-green-800">Present</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">12%</p>
                      <p className="text-xs text-red-800">Absent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'students' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Students Directory</h2>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={studentClassFilter}
                    onChange={(e) => setStudentClassFilter(e.target.value)}
                  >
                    <option value="All">All Classes</option>
                    {[...new Set(studentsList.map(s => s.class))].sort().map((cls, idx) => (
                      <option key={idx} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Roll No</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {displayedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.roll}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Class {student.class}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${student.performance === 'Excellent' ? 'bg-green-100 text-green-700' : student.performance === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{student.performance}</span></td>
                        <td className="px-6 py-4 text-sm text-indigo-600 cursor-pointer hover:underline" onClick={() => handleViewStudentProfile(student)}>View Profile</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Showing {filteredStudents.length > 0 ? (studentCurrentPage - 1) * studentItemsPerPage + 1 : 0} to {Math.min(studentCurrentPage * studentItemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStudentCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={studentCurrentPage === 1}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalStudentPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setStudentCurrentPage(i + 1)}
                        className={`px-3 py-1 border border-gray-200 rounded-lg text-sm ${studentCurrentPage === i + 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setStudentCurrentPage(prev => Math.min(prev + 1, totalStudentPages))}
                      disabled={studentCurrentPage === totalStudentPages || totalStudentPages === 0}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'marks' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Marks & Grades</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Assessments</h3>
                  <div className="space-y-4">
                    {submittedAssignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{assignment.title}</p>
                          <p className="text-sm text-gray-500">{assignment.class}</p>
                        </div>
                        <button onClick={() => handleEnterMarks(assignment)} className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium">Enter Marks</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Class Performance</h3>
                    <button onClick={handleExportClassPerformance} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Export CSV">
                      <Download size={20} />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-6">
                    <SimplePieChart data={gradeDistributionData} colors={GRADE_COLORS} size={200} />
                    <div className="w-full space-y-3">
                      {gradeDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GRADE_COLORS[index] }}></div>
                            <span className="text-sm font-medium text-gray-700">Grade {item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'messages' && (
            <div className="h-[calc(100vh-12rem)]">
              <ChatSection />
            </div>
          )}

          {activeView === 'timetable' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Weekly Timetable</h2>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
                  <Download size={18} /> Print / Save PDF
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-x-auto print:shadow-none print:border-none">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-7 gap-4 mb-4 border-b border-gray-200 pb-4">
                    <div className="font-bold text-gray-500">Time</div>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-bold text-gray-900">{day}</div>)}
                  </div>
                  {[
                    { time: '09:00 AM', classes: ['Class 9-A', 'Class 8-A', 'Class 7-A', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                    { time: '10:00 AM', classes: ['Class 9-A', 'Class 8-A', 'Class 7-A', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                    { time: '11:00 AM', classes: ['Class 9-A', 'Class 8-A', 'Class 7-A', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                    { time: '12:00 PM', classes: ['Class 9-A', 'Class 8-A', 'Break', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                    { time: '01:00 PM', classes: ['Class 9-A', 'Class 8-A', 'Class 7-A', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                    { time: '02:00 PM', classes: ['Class 9-A', 'Class 8-A', 'Class 7-A', 'Class 6-A', 'Class 5-A', 'Class 4-A'] },
                  ].map((slot, i) => (
                    <div key={i} className="grid grid-cols-7 gap-4 mb-4">
                      <div className="text-sm text-gray-500 font-medium">{slot.time}</div>
                      {slot.classes.map((cls, idx) => (
                        <div key={idx} className={`p-3 rounded-lg text-sm ${cls === 'Break' ? 'bg-gray-100 text-gray-500 italic' : 'bg-indigo-50 text-indigo-700'}`}>
                          {cls}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'profile' && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
                  {(profileData.name || 'T').charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">Senior Mathematics Teacher</p>
                  <p className="text-sm text-gray-500 mt-1">ID: TCH-2024-001</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} readOnly={!isEditingProfile} className={`w-full px-4 py-2 border rounded-lg ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} readOnly={!isEditingProfile} className={`w-full px-4 py-2 border rounded-lg ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" value={profileData.department} readOnly className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                  <input type="text" value={profileData.joiningDate} readOnly className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea rows="2" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} readOnly={!isEditingProfile} className={`w-full px-4 py-2 border rounded-lg ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}></textarea>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                {isEditingProfile ? (
                  <div className="flex gap-3">
                    <button onClick={() => setIsEditingProfile(false)} className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={handleSaveProfile} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Save Changes</button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingProfile(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Edit Profile</button>
                )}
              </div>
            </div>
          )}

          {/* Class Details Modal */}
          {showClassDetailsModal && selectedClassDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedClassDetails.name} Details</h3>
                    <p className="text-sm text-gray-500">{selectedClassDetails.subject} • {selectedClassDetails.students} Students</p>
                  </div>
                  <button onClick={() => setShowClassDetailsModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentsList.filter(s => s.class === selectedClassDetails.name.replace('Class ', '')).map(student => (
                      <div key={student.id} className="p-4 border border-gray-200 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">Roll: {student.roll}</p>
                        </div>
                      </div>
                    ))}
                    {studentsList.filter(s => s.class === selectedClassDetails.name.replace('Class ', '')).length === 0 && (
                      <p className="text-gray-500 col-span-2 text-center py-4">No students found for this class.</p>
                    )}
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                  <button onClick={() => setShowClassDetailsModal(false)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium">Close</button>
                </div>
              </div>
            </div>
          )}

          {/* Student Profile Modal */}
          {showStudentProfileModal && selectedStudentProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-popIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Student Profile</h3>
                  <button onClick={() => setShowStudentProfileModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
                      {selectedStudentProfile.name.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStudentProfile.name}</h2>
                    <p className="text-gray-500">Class {selectedStudentProfile.class} • Roll {selectedStudentProfile.roll}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Performance</span>
                      <span className="font-medium text-gray-900">{selectedStudentProfile.performance}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Attendance</span>
                      <span className="font-medium text-gray-900">{selectedStudentProfile.attendance}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-gray-900">{selectedStudentProfile.email}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                  <button onClick={() => setShowStudentProfileModal(false)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium">Close</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

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
}

export default TeacherDashboard;
