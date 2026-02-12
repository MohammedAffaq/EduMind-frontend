import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, BookOpen, GraduationCap } from 'lucide-react';
import Footer from '../components/Footer';

const FacultyPage = () => {
  const navigate = useNavigate();

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      subject: "Mathematics",
      qualification: "Ph.D. in Mathematics",
      experience: "12 Years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "sarah.wilson@edumind.school"
    },
    {
      id: 2,
      name: "Mr. James Rodriguez",
      subject: "Physics",
      qualification: "M.Sc. in Physics",
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "james.rodriguez@edumind.school"
    },
    {
      id: 3,
      name: "Ms. Emily Chen",
      subject: "Chemistry",
      qualification: "M.Sc. in Chemistry",
      experience: "10 Years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "emily.chen@edumind.school"
    },
    {
      id: 4,
      name: "Mr. Michael Brown",
      subject: "English Literature",
      qualification: "M.A. in English",
      experience: "15 Years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "michael.brown@edumind.school"
    },
    {
      id: 5,
      name: "Mrs. Anita Patel",
      subject: "Biology",
      qualification: "M.Sc. in Botany",
      experience: "9 Years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "anita.patel@edumind.school"
    },
    {
      id: 6,
      name: "Mr. David Kim",
      subject: "Computer Science",
      qualification: "M.Tech in Computer Science",
      experience: "6 Years",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "david.kim@edumind.school"
    },
    {
      id: 7,
      name: "Ms. Laura Martinez",
      subject: "History",
      qualification: "M.A. in History",
      experience: "11 Years",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "laura.martinez@edumind.school"
    },
    {
      id: 8,
      name: "Mr. Robert Taylor",
      subject: "Physical Education",
      qualification: "B.P.Ed",
      experience: "7 Years",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      email: "robert.taylor@edumind.school"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Our Faculty</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Educators</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of experienced teachers is committed to nurturing young minds and fostering a love for learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <a href={`mailto:${teacher.email}`} className="text-white flex items-center gap-2 hover:text-indigo-200 transition-colors">
                    <Mail size={16} />
                    <span className="text-sm">Contact</span>
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{teacher.subject}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-gray-400" />
                    <span>{teacher.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-400" />
                    <span>{teacher.experience} Experience</span>
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

export default FacultyPage;