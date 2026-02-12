import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Shield, Menu, X, Play, CheckCircle, Mail, Star, Award, Heart, Lightbulb } from 'lucide-react';
import SchoolGallery from '../components/SchoolGallery';
import FAQ from '../components/FAQ';
import NewsEvents from '../components/NewsEvents';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const currentUserStr = localStorage.getItem('currentUser');

    if (isLoggedIn && userRole && currentUserStr && currentUserStr !== 'undefined') {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser && (currentUser._id || currentUser.id || currentUser.email || currentUser.staffId)) {
          if (userRole === 'admin') navigate('/admin');
          else if (userRole === 'student') navigate('/student');
          else if (userRole === 'parent') navigate('/parent');
          else if (userRole === 'teacher') navigate('/teacher');
          else if (userRole === 'staff') {
            const nonTeachingRoles = ['driver', 'accountant', 'peon', 'cleaning', 'cleaning-staff', 'cleaner', 'librarian', 'receptionist', 'security', 'office-staff'];
            const designation = currentUser.designation ? currentUser.designation.toLowerCase().replace(/\s+/g, '-') : '';

            if (currentUser.staffType === 'non-teaching' || nonTeachingRoles.includes(designation)) {
              navigate('/staff');
            } else {
              navigate('/teacher');
            }
          }
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, [navigate]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing!');
    setEmail('');
  };

  // Custom styles for animations and hover effects
  const customStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .hover-pop:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  `;

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '#academics' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'School Life', href: '#life' },
    { name: 'Contact', href: '#contact' }
  ];

  const featuresContent = {
    'Academic Excellence': {
      overview: "EduMind follows a well-structured and standards-aligned curriculum designed to build strong academic foundations while encouraging critical thinking and problem-solving skills.",
      sections: [
        { title: "What We Offer", items: ["Curriculum aligned with national and academic education standards", "Subject-wise syllabus planning for Classes 1–10", "Continuous assessment through tests, assignments, and projects", "Performance tracking and progress analytics", "Focus on conceptual clarity and practical understanding"] },
        { title: "Learning Outcomes", items: ["Strong fundamentals in core subjects", "Improved academic performance", "Consistent progress monitoring"] }
      ]
    },
    'Smart Learning': {
      overview: "EduMind integrates technology-enabled learning to make education more interactive, engaging, and effective.",
      sections: [
        { title: "Key Features", items: ["Digital classrooms with smart teaching tools", "Online assignments and submissions", "QR-based attendance system", "Real-time progress and attendance reports", "Access to e-learning materials anytime"] },
        { title: "Benefits", items: ["Enhanced student engagement", "Transparent academic tracking", "Faster communication between students, teachers, and parents"] }
      ]
    },
    'Expert Teachers': {
      overview: "Our educators are the backbone of EduMind. We employ qualified, experienced, and passionate teachers who are committed to student success.",
      sections: [
        { title: "Teacher Strengths", items: ["Subject matter expertise", "Student-centric teaching approach", "Continuous professional development", "Use of modern teaching tools and methods", "Regular feedback and performance evaluation"] },
        { title: "Student Support", items: ["Personalized attention", "Doubt-clearing sessions", "Academic guidance and mentoring"] }
      ]
    },
    'Safe Campus': {
      overview: "EduMind ensures a safe, secure, and supportive campus environment where students can learn with confidence.",
      sections: [
        { title: "Safety Measures", items: ["CCTV-monitored premises", "Secure entry and exit systems", "Anti-bullying and discipline policies", "Emergency preparedness protocols", "Student counseling and support services"] },
        { title: "Our Promise", items: ["A caring environment for physical and emotional well-being", "Zero tolerance for unsafe practices"] }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{customStyles}</style>
      {/* Header/Navbar */}
      <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-indigo-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-indigo-600 font-semibold text-lg transition-all duration-300 hover:scale-110 relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 font-bold hover:text-indigo-800 transition-all hover:scale-105 px-6 py-2.5 border-2 border-indigo-100 hover:border-indigo-200 rounded-full"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:text-indigo-600 font-medium text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-left"
                  >
                    Register
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-24 lg:py-32 overflow-hidden scroll-mt-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/assets/logo.png"
                    alt="EduMind Logo"
                    className="w-40 h-40 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                  <span className="text-4xl md:text-5xl font-bold text-indigo-700 tracking-tight">
                    Welcome to EduMind
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                  Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Young Minds</span> for a Brighter Tomorrow
                </h1>
                <p className="text-xl text-gray-600 mt-6 max-w-lg leading-relaxed">
                  Join EduMind to experience a world-class education system. We provide a modern, secure, and digital learning environment for students from Class 1 to 10, designed to support academic excellence and holistic development.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => document.getElementById('academics').scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-yellow-400 text-indigo-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <div className="bg-white/30 p-1 rounded-full group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  Explore Programs
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-600/40 hover:-translate-y-1 border-2 border-transparent hover:border-indigo-400"
                >
                  Join EduMind
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 1000+ Parents & Students</p>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative group perspective animate-fade-in-up delay-200">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
              <img
                src="/assets/school.png"
                alt="EduMind Campus"
                className="relative w-full h-auto rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1 object-cover border-4 border-white/50"
              />

              {/* Floating Cards */}
              <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-700 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Success Rate</p>
                    <p className="text-lg font-bold text-gray-900">98.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="about" className="py-24 bg-white scroll-mt-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm bg-indigo-50 px-4 py-1 rounded-full">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 mt-4">
              Reimagining Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond traditional schooling to provide comprehensive educational solutions that nurture both academic excellence and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, color: 'blue', title: 'Academic Excellence', desc: 'Well-structured curriculum aligned with academic standards.' },
              { icon: Lightbulb, color: 'green', title: 'Smart Learning', desc: 'Technology-enabled classrooms with online assignments.' },
              { icon: Users, color: 'purple', title: 'Expert Teachers', desc: 'Qualified, experienced, and passionate educators.' },
              { icon: Shield, color: 'red', title: 'Safe Campus', desc: 'Secure infrastructure and a caring environment.' }
            ].map((feature, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover-pop transition-all duration-300 group animate-fade-in-up delay-${idx * 100}`}>
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.desc}</p>
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className={`text-${feature.color}-600 font-bold hover:underline flex items-center gap-1`}
                >
                  Learn More <span className="text-lg">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="academics" className="py-24 bg-indigo-900 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-yellow-400 font-bold tracking-wide uppercase text-sm">Academics</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 mt-2 leading-tight">Programs & Levels</h2>
              <p className="text-indigo-200 mb-10 text-lg leading-relaxed">
                We offer a comprehensive learning path from primary to high school, ensuring a seamless educational journey with a focus on holistic development.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Primary School (Class 1-4)', desc: 'Focus on basic skills, creativity, moral values, and joyful learning.' },
                  { title: 'Middle School (Class 5-7)', desc: 'Builds analytical skills, subject depth, and independent thinking.' },
                  { title: 'High School (Class 8-10)', desc: 'Board exam preparation, career guidance, and academic excellence.' },
                  { title: 'Digital Learning Support', desc: '24/7 access to learning resources, online classes, and dashboards.' }
                ].map((program, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate('/academics')}
                  >
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                      {program.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span>
                    </h3>
                    <p className="text-indigo-100">{program.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white text-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100 sticky top-24 animate-fade-in-up delay-200 transform hover:scale-[1.01] transition-transform duration-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Why EduMind?</h3>
              <div className="space-y-6">
                {[
                  'Student-centric teaching methods',
                  'Strong parent–teacher communication',
                  'Live attendance & academic tracking',
                  'Secure QR-based attendance system'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded-full mt-1">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900">Interactive Learning</p>
                    <p className="text-sm text-gray-600">Modern tools for better engagement</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/about')}
                className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
              >
                Know More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-24 bg-gradient-to-b from-purple-50 to-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-yellow-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500"></div>
              <img
                src="/assets/admission.png"
                alt="Admissions"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 border-4 border-white"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs">
                <p className="font-bold text-gray-900 text-lg">"Education is the passport to the future."</p>
                <p className="text-indigo-600 font-semibold mt-2">- Malcolm X</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in-up">
              <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm bg-indigo-100 px-3 py-1 rounded-full">Join Us</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 mt-4">Admissions Open for 2026-27</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We welcome students from all backgrounds to join our diverse and inclusive community. Our admission process is designed to be simple, transparent, and student-friendly.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { step: 1, title: 'Online Registration', desc: 'Fill out the application form on our website.' },
                  { step: 2, title: 'Entrance Assessment', desc: 'A simple assessment to understand the student\'s level.' },
                  { step: 3, title: 'Parent Interaction', desc: 'Meet with our principal and coordinators.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center flex-shrink-0 font-bold text-xl text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* School Gallery */}
      <div className="bg-gray-50 py-12">
        <SchoolGallery />
      </div>

      {/* News & Events Section */}
      <div className="bg-white">
        <NewsEvents />
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <FAQ />
      </div>

      {/* Contact Us Component */}
      <div className="bg-white">
        <ContactUs />
      </div>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">Stay Connected with EduMind</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Get the latest updates, events, and educational insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500 shadow-xl outline-none"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-indigo-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-xl hover:shadow-yellow-400/50 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Quick Links Sidebar */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 rounded-3xl shadow-2xl p-10 border border-gray-700 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Star, color: 'blue', title: 'Events Calendar', desc: 'View school events', path: '/events' },
                { icon: BookOpen, color: 'green', title: 'Homework Plans', desc: 'Weekly assignments', path: '/homework' },
                { icon: Heart, color: 'orange', title: 'Bullying Prevention', desc: 'Safety policy', path: '/about' },
                { icon: Shield, color: 'purple', title: 'Registration Forms', desc: 'Download forms', path: '/signup' }
              ].map((link, idx) => (
                <div key={idx} onClick={() => navigate(link.path)} className="text-center group cursor-pointer hover:bg-gray-700/50 p-6 rounded-2xl transition-all duration-300">
                  <div className={`w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-${link.color}-600 transition-colors duration-300 shadow-lg`}>
                    <link.icon className={`w-10 h-10 text-${link.color}-400 group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-2">{link.title}</h3>
                  <p className="text-gray-400 text-sm">{link.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Feature Details Modal */}
      {selectedFeature && featuresContent[selectedFeature.title] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedFeature(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="p-8 relative">
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className={`w-16 h-16 bg-${selectedFeature.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                <selectedFeature.icon className={`w-8 h-8 text-${selectedFeature.color}-600`} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedFeature.title}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{featuresContent[selectedFeature.title].overview}</p>

              <div className="space-y-6">
                {featuresContent[selectedFeature.title].sections.map((section, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle size={18} className={`text-${selectedFeature.color}-600 mt-1 flex-shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
