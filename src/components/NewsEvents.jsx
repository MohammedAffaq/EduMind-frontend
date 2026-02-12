import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, X } from 'lucide-react';

const NewsEvents = () => {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState(null);

  const news = [
    {
      id: 1,
      title: "Annual Science Fair Winners Announced",
      date: "March 15, 2026",
      excerpt: "Congratulations to all participants! The winners of this year's Science Fair have demonstrated exceptional innovation.",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      details: "We are proud to announce the winners of the 2026 Annual Science Fair. Over 200 students participated with innovative projects ranging from renewable energy solutions to robotics. The first prize goes to the 'Solar-Powered Water Purification System' by Class 10 students. We thank all the judges and parents for their support.",
      gallery: [
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      title: "New Sports Complex Inauguration",
      date: "March 10, 2026",
      excerpt: "Our state-of-the-art sports complex is now open for students, featuring an olympic-size swimming pool.",
      image: "/assets/sports.png",
      details: "The long-awaited Sports Complex is finally here! Inaugurated by the City Mayor, this facility boasts an Olympic-size swimming pool, two indoor basketball courts, a gymnasium, and a dedicated yoga studio. This complex is part of our commitment to holistic education and physical well-being.",
      gallery: [
        "/assets/sports.png",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576670159805-381a9de1e2b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      title: "Global Cultural Exchange Program",
      date: "March 05, 2026",
      excerpt: "Students from 10 different countries visited our campus for a week-long cultural exchange program.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      details: "Our school hosted a vibrant Cultural Exchange Program welcoming students from Japan, Germany, France, and Brazil. The week was filled with cultural performances, food festivals, and collaborative workshops. It was a fantastic opportunity for our students to learn about global traditions and make international friends.",
      gallery: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  const events = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "March 20, 2026",
      time: "9:00 AM - 12:00 PM",
      location: "Main Auditorium"
    },
    {
      id: 2,
      title: "Inter-School Debate Competition",
      date: "March 25, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Hall"
    },
    {
      id: 3,
      title: "Annual Sports Day",
      date: "April 05, 2026",
      time: "8:00 AM - 5:00 PM",
      location: "School Ground"
    },
    {
      id: 4,
      title: "Art Exhibition",
      date: "April 15, 2026",
      time: "11:00 AM - 6:00 PM",
      location: "Art Gallery"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="news-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Upcoming Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings and upcoming activities at EduMind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* News Section */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              Latest News
              <span className="ml-4 h-px flex-1 bg-gray-200"></span>
            </h3>
            <div className="grid gap-8">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-center">
                    <div className="text-sm text-indigo-600 font-semibold mb-2">{item.date}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                    <button 
                      onClick={() => setSelectedNews(item)}
                      className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center text-left"
                    >
                      Read More <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              Upcoming Events
              <span className="ml-4 h-px flex-1 bg-gray-200"></span>
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="bg-indigo-50 text-indigo-600 rounded-lg p-2">
                        <span className="block text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                        <span className="block text-xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={14} className="mr-1" />
                        {event.time}
                      </div>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/events')} className="w-full mt-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 sm:h-80">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">News</span>
                <span className="text-gray-500 text-sm font-medium">{selectedNews.date}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedNews.title}</h2>
              <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
                <p>{selectedNews.details}</p>
              </div>
              
              {selectedNews.gallery && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedNews.gallery.map((img, idx) => (
                      <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="rounded-lg object-cover h-40 w-full shadow-sm hover:shadow-md transition-shadow" />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsEvents;