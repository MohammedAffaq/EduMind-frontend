import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, X, Clock, Trash2, Edit2 } from 'lucide-react';

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [customEvents, setCustomEvents] = useState(() => {
    const saved = localStorage.getItem('schoolCalendarEvents');
    return saved ? JSON.parse(saved) : {};
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('schoolCalendarEvents', JSON.stringify(customEvents));
  }, [customEvents]);

  // Dynamic holidays based on the current year view
  const getHolidays = (year) => ({
    [`${year}-01-01`]: 'New Year\'s Day',
    [`${year}-01-15`]: 'Makar Sankranti / Pongal',
    [`${year}-01-26`]: 'Republic Day',
    [`${year}-03-08`]: 'Maha Shivaratri',
    [`${year}-03-25`]: 'Holi',
    [`${year}-03-29`]: 'Good Friday',
    [`${year}-04-09`]: 'Ugadi / Gudi Padwa',
    [`${year}-04-11`]: 'Eid-ul-Fitr',
    [`${year}-04-14`]: 'Dr. B.R. Ambedkar Jayanti',
    [`${year}-04-17`]: 'Ram Navami',
    [`${year}-05-01`]: 'Labour Day',
    [`${year}-06-17`]: 'Bakrid / Eid al-Adha',
    [`${year}-07-17`]: 'Muharram',
    [`${year}-08-15`]: 'Independence Day',
    [`${year}-08-19`]: 'Raksha Bandhan',
    [`${year}-08-26`]: 'Janmashtami',
    [`${year}-09-07`]: 'Ganesh Chaturthi',
    [`${year}-09-16`]: 'Eid-e-Milad',
    [`${year}-10-02`]: 'Gandhi Jayanti',
    [`${year}-10-12`]: 'Dussehra',
    [`${year}-11-01`]: 'Diwali',
    [`${year}-11-15`]: 'Guru Nanak Jayanti',
    [`${year}-12-25`]: 'Christmas Day',
  });

  const holidays = getHolidays(currentDate.getFullYear());

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

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${d}`;
    setSelectedDateStr(dateStr);
    setNewEventTitle('');
    setEditIndex(null);
    setShowModal(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    setCustomEvents(prev => ({
      ...prev, 
      [selectedDateStr]: editIndex !== null 
        ? prev[selectedDateStr].map((ev, i) => i === editIndex ? newEventTitle : ev)
        : [...(prev[selectedDateStr] || []), newEventTitle]
    }));
    setNewEventTitle('');
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEditEvent = (dateStr, index, title) => {
    setSelectedDateStr(dateStr);
    setNewEventTitle(title);
    setEditIndex(index);
    setShowModal(false);
    // Small timeout to allow modal to close/re-open cleanly or just set state and open
    setTimeout(() => setShowModal(true), 0);
  };

  const handleDeleteEvent = (dateStr, index) => {
    setCustomEvents(prev => {
      const dayEvents = [...(prev[dateStr] || [])];
      dayEvents.splice(index, 1);
      const newEvents = { ...prev };
      if (dayEvents.length > 0) {
        newEvents[dateStr] = dayEvents;
      } else {
        delete newEvents[dateStr];
      }
      return newEvents;
    });
  };

  const getUpcomingHolidays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return Object.entries(holidays)
      .map(([date, name]) => ({ date, name, type: 'holiday' }))
      .concat(
        Object.entries(customEvents).flatMap(([date, events]) => 
          events.map((name, index) => ({ date, name, type: 'event', index }))
        )
      )
      .filter(item => new Date(item.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  };

  const isHoliday = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays[dateStr];
  };

  const getCustomEventsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return customEvents[dateStr] || [];
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const holiday = isHoliday(day);
      const dayEvents = getCustomEventsForDay(day);
      const today = isToday(day);
      const hasEvents = dayEvents.length > 0;
      
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 md:h-12 flex flex-col items-center justify-center text-xs md:text-sm font-medium rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg relative group ${
            holiday
              ? 'bg-red-50 text-red-600 border border-red-100'
              : today
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : hasEvents
              ? 'bg-purple-50 text-purple-600 border border-purple-100'
              : isWeekend
              ? 'bg-orange-50 text-orange-600'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          {day}
          {(holiday || hasEvents) && (
            <div className="flex gap-0.5 mt-0.5">
              {holiday && <div className={`w-1 h-1 rounded-full ${today ? 'bg-white' : 'bg-red-500'}`}></div>}
              {hasEvents && <div className={`w-1 h-1 rounded-full ${today ? 'bg-white' : 'bg-purple-500'}`}></div>}
            </div>
          )}
          
          {/* Tooltip */}
          {(holiday || hasEvents) && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-max max-w-[150px] bg-gray-900 text-white text-[10px] rounded-lg py-2 px-3 shadow-xl">
              {holiday && <div className="font-semibold text-red-200">{holiday}</div>}
              {dayEvents.map((ev, i) => (
                <div key={i} className="truncate">{ev}</div>
              ))}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 h-auto hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar size={24} className="text-blue-500" />
          School Calendar - Public Holidays
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm md:text-lg font-semibold text-gray-800 min-w-[120px] md:min-w-[150px] text-center">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-3 mb-6">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs border-t border-gray-100 pt-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Public Holiday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Event</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
          <span>Weekend</span>
        </div>
      </div>

      {/* Upcoming Holidays List */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          Upcoming Events & Holidays
        </h4>
        <div className="space-y-3">
          {getUpcomingHolidays().length > 0 ? (
            getUpcomingHolidays().map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg ${item.type === 'holiday' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
                  <span className="text-xs font-bold">{new Date(item.date).getDate()}</span>
                  <span className="text-[10px] font-medium uppercase">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {item.type === 'holiday' ? 'Public Holiday' : 'Custom Event'}
                  </p>
                </div>
                {item.type === 'event' && (
                  <div className="flex gap-1">
                    <button onClick={() => handleEditEvent(item.date, item.index, item.name)} className="text-gray-400 hover:text-indigo-600 transition-colors p-1">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDeleteEvent(item.date, item.index)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">No upcoming events.</p>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-[20px]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100 transform scale-100 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-900">{editIndex !== null ? 'Edit Event' : 'Add Event'}</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">Date: {selectedDateStr}</p>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Event Title"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {editIndex !== null ? 'Update Event' : 'Add Event'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayCalendar;
