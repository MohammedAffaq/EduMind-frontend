import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Tag } from 'lucide-react';
import Footer from '../components/Footer';

const EventsPage = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "March 20, 2026",
      time: "9:00 AM - 12:00 PM",
      location: "Main Auditorium",
      description: "Annual meeting to discuss student progress and school developments.",
      category: "Meeting"
    },
    {
      id: 2,
      title: "Inter-School Debate Competition",
      date: "March 25, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Hall",
      description: "Students from 10 schools will compete in this prestigious debate championship.",
      category: "Competition"
    },
    {
      id: 3,
      title: "Annual Sports Day",
      date: "April 05, 2026",
      time: "8:00 AM - 5:00 PM",
      location: "School Ground",
      description: "A day filled with athletic events, team sports, and spirit.",
      category: "Sports"
    },
    {
      id: 4,
      title: "Art Exhibition",
      date: "April 15, 2026",
      time: "11:00 AM - 6:00 PM",
      location: "Art Gallery",
      description: "Showcasing the creative works of our talented students.",
      category: "Arts"
    },
    {
      id: 5,
      title: "Science Fair",
      date: "May 10, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Science Block",
      description: "Innovative projects and experiments by students from all grades.",
      category: "Academic"
    },
    {
      id: 6,
      title: "Annual Day Celebration",
      date: "December 20, 2026",
      time: "5:00 PM - 9:00 PM",
      location: "School Auditorium",
      description: "A grand evening of cultural performances, awards, and celebration of school achievements.",
      category: "Cultural"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">School Events</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl p-4 w-24 h-24">
                  <span className="text-sm font-bold uppercase">{event.date.split(' ')[0]}</span>
                  <span className="text-3xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                  <span className="text-xs text-gray-500">{event.date.split(' ')[2]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 flex items-center gap-1">
                      <Tag size={12} />
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;