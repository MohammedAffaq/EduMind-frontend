import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Target, History, CheckCircle, Shield, Users, Monitor, Clock, Bell, Phone, Mail, MapPin, Quote, Globe, BookOpen, Star, Heart, Lightbulb, Zap, Send } from 'lucide-react';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
    if (contactErrors[name]) {
      setContactErrors({ ...contactErrors, [name]: '' });
    }
  };

  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) errors.email = 'Email is required';
    if (!contactForm.subject.trim()) errors.subject = 'Subject is required';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = validateContactForm();
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully!');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <main>
        {/* Hero Section */}
        <section className="relative pt-2 pb-8 bg-white border-b border-gray-100">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-start gap-6">
              <img 
                src="/assets/logo.png" 
                alt="EduMind Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-md" 
              />
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  Welcome to EduMind
                </h1>
                <p className="text-2xl text-gray-600 font-medium">
                  Where Education Meets Innovation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6">
                  <History size={18} /> Who We Are
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">The Ultimate School Management Platform</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    EduMind is not just a school—it is a comprehensive <strong>website and digital platform</strong> designed to revolutionize how schools operate. We provide the digital infrastructure that connects students, teachers, parents, and administrators in one seamless ecosystem.
                  </p>
                  <p>
                    Our platform serves as a central hub for educational excellence, offering tools for learning management, real-time communication, and administrative automation for schools worldwide.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-100 rounded-3xl transform rotate-2"></div>
                <img
                  src="/assets/about.png" 
                  alt="School History" 
                  className="relative rounded-3xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-indigo-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[500px] lg:h-auto overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Principal" 
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-2xl font-bold">Dr. Eleanor Vance</p>
                    <p className="text-indigo-200 font-medium">Principal, EduMind School</p>
                  </div>
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center relative">
                  <Quote size={64} className="text-indigo-100 absolute top-10 right-10" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 relative z-10">Principal's Message</h2>
                  <blockquote className="text-xl lg:text-2xl text-gray-600 italic mb-8 leading-relaxed relative z-10 font-serif">
                    "At EduMind, we believe that education is not just about filling a pail, but the lighting of a fire. Our goal is to nurture curiosity, resilience, and compassion in every student, preparing them not just for exams, but for life."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="group bg-indigo-50 p-10 rounded-3xl shadow-sm border border-indigo-100 hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To create a universally accessible digital ecosystem where education is transparent, collaborative, and continuously monitored to support student growth globally.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="group bg-purple-50 p-10 rounded-3xl shadow-sm border border-indigo-100 hover:shadow-xl hover:bg-purple-100 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm">
                    <Target size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <ul className="space-y-3 text-lg text-gray-600 leading-relaxed">
                    <li className="flex gap-3 items-start"><CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={20} /> <span>To deliver high-quality education supported by smart technology</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={20} /> <span>To ensure real-time academic monitoring for students, parents, and teachers</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={20} /> <span>To build a safe, secure, and connected digital school ecosystem</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={20} /> <span>To simplify school operations through automation and analytics</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide our educational philosophy and daily operations.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Innovation", desc: "Embracing new technologies and methods.", icon: Lightbulb, color: "amber" },
                { title: "Integrity", desc: "Upholding honesty and strong moral principles.", icon: Shield, color: "indigo" },
                { title: "Inclusivity", desc: "Creating a welcoming environment for all.", icon: Users, color: "purple" },
                { title: "Excellence", desc: "Striving for the highest quality in everything we do.", icon: Star, color: "rose" },
              ].map((value, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 text-center group">
                  <div className={`w-14 h-14 mx-auto bg-${value.color}-100 text-${value.color}-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Guided by visionary leaders dedicated to educational excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Dr. Eleanor Vance", 
                  role: "Founder & Chairperson", 
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "With over 30 years in education, Dr. Vance founded EduMind to bridge the gap between traditional values and modern technology."
                },
                { 
                  name: "Prof. David Chen", 
                  role: "Principal", 
                  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "Prof. Chen brings a wealth of administrative experience and a passion for student-centric learning methodologies."
                },
                { 
                  name: "Mrs. Sarah Johnson", 
                  role: "Head of Academics", 
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "Sarah leads our curriculum development, ensuring our academic programs remain rigorous, relevant, and engaging."
                }
              ].map((leader, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                    <img 
                      src={leader.img} 
                      alt={leader.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-indigo-600 font-medium">{leader.role}</p>
                  <p className="text-gray-500 mt-3 text-sm">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Achievements */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Student Achievements</h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                Celebrating the outstanding accomplishments of our students in academics, sports, and arts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "National Science Olympiad",
                  student: "Aarav Patel",
                  grade: "Class 10",
                  desc: "Secured 1st Rank nationally in the 2025 Science Olympiad.",
                  icon: Award
                },
                {
                  title: "State Level Debate",
                  student: "Zara Khan",
                  grade: "Class 9",
                  desc: "Winner of the State Inter-School Debate Championship.",
                  icon: Star
                },
                {
                  title: "Junior Art Exhibition",
                  student: "Vihaan Singh",
                  grade: "Class 5",
                  desc: "Featured artist at the City Art Gallery for exceptional creativity.",
                  icon: Heart
                }
              ].map((achievement, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6 text-indigo-900">
                    <achievement.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-yellow-400 font-medium mb-2">{achievement.student} - {achievement.grade}</p>
                  <p className="text-indigo-100">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes EduMind Different */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes EduMind Different</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                EduMind is not just a school website—it is a complete online school management and learning platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <Monitor size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Online Monitoring</h3>
                <p className="text-gray-600 text-sm">Every activity is digitally tracked including student attendance (QR-based), academic progress, assignments, teacher activities, and parent communication.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Attendance System</h3>
                <p className="text-gray-600 text-sm">QR-code based attendance marking with instant presence/absence updates visible to students, teachers, parents, and admin.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Dashboards</h3>
                <p className="text-gray-600 text-sm">Dedicated dashboards for Admin, Teachers, Students, and Parents designed for clarity, security, and ease of use.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                  <Bell size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Communication</h3>
                <p className="text-gray-600 text-sm">Login alerts, attendance notifications, academic updates, and event announcements sent automatically via email and system notifications.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital-First & Security */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-indigo-300">Digital-First Learning Approach</h3>
                <p className="text-indigo-100 mb-6">EduMind embraces a blended learning model:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-indigo-300 mt-1 flex-shrink-0" size={20} />
                    <span>Classroom learning supported by digital tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-indigo-300 mt-1 flex-shrink-0" size={20} />
                    <span>Online assignments and submissions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-indigo-300 mt-1 flex-shrink-0" size={20} />
                    <span>Performance tracking and analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-indigo-300 mt-1 flex-shrink-0" size={20} />
                    <span>E-learning resources accessible anytime</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-400">Safety, Security & Transparency</h3>
                <p className="text-indigo-100 mb-6">Transparency ensures trust between students, parents, teachers, and school management.</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Shield className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>Secure login with OTP and hashed passwords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>No unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>Full data visibility for authorized roles only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>All activities logged and monitored by admin</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ className="bg-indigo-50" />

        {/* Commitment */}
        <section className="py-20 bg-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              At EduMind, we are committed to shaping the future of education by making learning smart, secure, and student-centric. Through continuous innovation and digital excellence, we aim to empower every learner and educator in our ecosystem.
            </p>
            <div className="mt-8 font-bold text-indigo-600 text-lg">
              EduMind – Where Education Meets Innovation
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We are here to answer any questions you may have about our school.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 group-hover:text-indigo-600 transition-colors">+1 (234) 567-8900</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 group-hover:text-indigo-600 transition-colors">eduadmin@gmail.com</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600 group-hover:text-indigo-600 transition-colors">123 Education Lane, Knowledge City</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Send us a Message</h2>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${contactErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`} 
                      placeholder="Your Name" 
                    />
                    {contactErrors.name && <p className="text-red-500 text-sm mt-1">{contactErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${contactErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`} 
                      placeholder="your@email.com" 
                    />
                    {contactErrors.email && <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${contactErrors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`} 
                    placeholder="How can we help?" 
                  />
                  {contactErrors.subject && <p className="text-red-500 text-sm mt-1">{contactErrors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all resize-none ${contactErrors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`} 
                    placeholder="Your message..."
                  ></textarea>
                  {contactErrors.message && <p className="text-red-500 text-sm mt-1">{contactErrors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="py-12 bg-gray-50 flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;