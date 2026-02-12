import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, CheckCircle, Clock, Filter, Search, Download, HelpCircle, FileText, Video } from 'lucide-react';
import Footer from '../components/Footer';
import SimplePieChart from '../components/SimplePieChart';

const HomeworkPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Mock data for homework
  const assignments = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Algebra Worksheet',
      dueDate: '2026-03-22',
      status: 'Pending',
      description: 'Complete exercises 5.1 to 5.4 from the textbook. Show all working steps.'
    },
    {
      id: 2,
      subject: 'Science',
      title: 'Physics Lab Report',
      dueDate: '2026-03-24',
      status: 'Submitted',
      description: 'Submit the lab report for the pendulum experiment including graphs and conclusion.'
    },
    {
      id: 3,
      subject: 'English',
      title: 'Essay on Shakespeare',
      dueDate: '2026-03-28',
      status: 'Pending',
      description: 'Write a 500-word essay on the themes of ambition in Macbeth.'
    },
    {
      id: 4,
      subject: 'History',
      title: 'World War II Timeline',
      dueDate: '2026-03-30',
      status: 'Pending',
      description: 'Create a detailed timeline of major events in WWII from 1939 to 1945.'
    },
    {
      id: 5,
      subject: 'Geography',
      title: 'Map Marking',
      dueDate: '2026-04-02',
      status: 'Pending',
      description: 'Mark the major rivers and mountains on the physical map of India.'
    },
    {
      id: 6,
      subject: 'Computer Science',
      title: 'HTML Basics',
      dueDate: '2026-04-05',
      status: 'Submitted',
      description: 'Create a simple webpage using HTML tags including headings, paragraphs, and lists.'
    }
  ];

  const resources = [
    { title: 'Math Formula Sheet', type: 'PDF', size: '2.4 MB' },
    { title: 'History Timeline', type: 'Image', size: '1.8 MB' },
    { title: 'Science Lab Safety', type: 'Video', size: '15 MB' },
    { title: 'English Grammar Guide', type: 'PDF', size: '1.2 MB' },
    { title: 'Periodic Table', type: 'Image', size: '3.5 MB' },
    { title: 'World Map', type: 'PDF', size: '5.0 MB' }
  ];

  const completedCount = assignments.filter(a => a.status === 'Submitted').length;
  const pendingCount = assignments.filter(a => a.status === 'Pending').length;
  const progressData = [
    { label: 'Completed', value: completedCount },
    { label: 'Pending', value: pendingCount }
  ];

  const filteredAssignments = assignments.filter(a => {
    const matchesFilter = filter === 'All' || a.status === filter;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Student Homework</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">Assignments & Tasks</h2>
          <p className="text-indigo-100">Track your homework, deadlines, and submissions in one place.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Tracker */}
        <div className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Progress Tracker</h3>
            <button 
              onClick={() => alert("Downloading progress report...")}
              className="flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <Download size={18} />
              Download Report
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex-shrink-0">
              <SimplePieChart data={progressData} colors={['#10b981', '#f59e0b']} size={200} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-gray-600 font-medium">Completed: <span className="text-gray-900 font-bold">{completedCount}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600 font-medium">Pending: <span className="text-gray-900 font-bold">{pendingCount}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search assignments..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'Pending', 'Submitted'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  filter === status 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    assignment.subject === 'Mathematics' ? 'bg-blue-50 text-blue-600' :
                    assignment.subject === 'Science' ? 'bg-green-50 text-green-600' :
                    assignment.subject === 'English' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                    <p className="text-sm font-medium text-gray-500">{assignment.subject}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold mt-2 md:mt-0 ${
                  assignment.status === 'Submitted' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}>
                  {assignment.status}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
                <p className="text-gray-700">{assignment.description}</p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                {assignment.status === 'Pending' && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock size={16} />
                    <span>{Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days left</span>
                  </div>
                )}
                {assignment.status === 'Submitted' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span>Completed</span>
                  </div>
                )}
                {assignment.status === 'Pending' && (
                  <button className="ml-auto text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                    Submit Now &rarr;
                  </button>
                )}
              </div>
            </div>
          ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="text-gray-400 mb-4"><BookOpen size={48} className="mx-auto" /></div>
              <h3 className="text-lg font-medium text-gray-900">No assignments found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

        {/* Study Resources & Help Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Study Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                      {res.type === 'Video' ? <Video size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{res.title}</p>
                      <p className="text-xs text-gray-500">{res.type} • {res.size}</p>
                    </div>
                  </div>
                  <Download size={18} className="text-gray-400 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={24} />
              <h3 className="text-xl font-bold">Need Help?</h3>
            </div>
            <p className="text-indigo-100 mb-6">Stuck on an assignment? Reach out to your subject teachers for guidance or check the resource library.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Contact Teacher
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeworkPage;