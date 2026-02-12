import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Footer from '../components/Footer';

const SchoolCalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const holidays = {
    '2026-01-01': "New Year's Day",
    '2026-01-26': "Republic Day",
    '2026-03-25': "Holi",
    '2026-04-14': "Dr. Ambedkar Jayanti",
    '2026-08-15': "Independence Day",
    '2026-10-02': "Gandhi Jayanti",
    '2026-11-01': "Diwali",
    '2026-12-25': "Christmas"
  };

  const schoolEvents = {
    '2026-03-15': "Science Fair",
    '2026-03-20': "Parent-Teacher Meeting",
    '2026-04-05': "Annual Sports Day",
    '2026-04-15': "Art Exhibition",
    '2026-05-10': "Summer Camp Begins"
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 border border-gray-100"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const holiday = holidays[dateStr];
      const event = schoolEvents[dateStr];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div key={day} className={`h-24 md:h-32 border border-gray-100 p-2 relative transition-colors hover:bg-gray-50 ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <span className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'} ${holiday ? 'text-red-500' : ''}`}>
            {day}
          </span>
          
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-24px)] custom-scrollbar">
            {holiday && (
              <div className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium truncate" title={holiday}>
                {holiday}
              </div>
            )}
            {event && (
              <div className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium truncate" title={event}>
                {event}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">School Calendar</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="text-indigo-600" />
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={handlePrevMonth} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm">
                Today
              </button>
              <button onClick={handleNextMonth} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 bg-indigo-600 text-white">
            {daysOfWeek.map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 bg-gray-200 gap-px border border-gray-200">
            {renderCalendar()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchoolCalendarPage;