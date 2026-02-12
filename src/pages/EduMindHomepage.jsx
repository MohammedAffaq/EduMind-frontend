import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Lightbulb,
  Users,
  School,
  GraduationCap,
  CheckCircle,
  Mail,
  Send,
  Calendar,
  FileText,
  Shield,
  User,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Chrome,
  Minus,
  Square,
  X
} from 'lucide-react';

export default function EduMindHomepage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Desktop Web Frame - 1440px Canvas */}
      <div className="w-[1440px] mx-auto bg-gray-100 rounded-t-xl p-2 shadow-lg">
        <div className="bg-white rounded-lg shadow-xl">
          {/* Browser Chrome */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-lg border-b">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Chrome size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">edumind.edu</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Minus size={16} className="text-gray-400" />
              <Square size={14} className="text-gray-400" />
              <X size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Header/Navbar */}
          <header className="bg-white shadow-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lightbulb size={16} className="text-white" />
                  </div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full -ml-2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-bold text-blue-600">EduMind</span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium border-b-2 border-blue-500 pb-1">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About Us</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Academics</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Admissions</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">School Life</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium">Login</button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Register
                </button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 px-6 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Empowering Young Minds for a<br />
                  <span className="text-blue-600">Brighter Tomorrow</span>
                </h1>
                <p className="text-xl text-gray-600">
                  A holistic learning environment for students (Class 1 to 10)
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    Explore Programs
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Join EduMind
                  </button>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-2xl shadow-lg p-8 h-full flex items-center justify-center">
                  {/* Teacher Illustration */}
                  <div className="relative">
                    {/* Teacher */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        {/* Teacher Body */}
                        <div className="w-24 h-32 bg-teal-400 rounded-full relative">
                          {/* Teacher Face */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-200 rounded-full border-4 border-white">
                            {/* Eyes */}
                            <div className="absolute top-4 left-3 w-2 h-2 bg-black rounded-full"></div>
                            <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full"></div>
                            {/* Smile */}
                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-black rounded-b-full"></div>
                          </div>
                          {/* Teacher Hair */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-600 rounded-full"></div>
                        </div>
                        {/* Book in hand */}
                        <div className="absolute -right-4 top-8 w-8 h-12 bg-yellow-400 rounded-lg border-2 border-yellow-600 transform rotate-12">
                          <div className="w-full h-1 bg-yellow-600 mt-1"></div>
                          <div className="w-3/4 h-1 bg-yellow-600 mt-1"></div>
                        </div>
                      </div>
                    </div>

                    {/* Students Row 1 */}
                    <div className="flex justify-center space-x-6 mb-6">
                      {/* Student 1 - Boy */}
                      <div className="relative">
                        <div className="w-16 h-20 bg-blue-400 rounded-full relative">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-200 rounded-full border-3 border-white">
                            <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>
                          </div>
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-blue-600 rounded-full"></div>
                        </div>
                        {/* School Bag */}
                        <div className="absolute -right-2 bottom-2 w-6 h-8 bg-red-400 rounded-lg border-2 border-red-600">
                          <div className="w-full h-1 bg-red-600 mt-1"></div>
                        </div>
                        {/* Waving Hand */}
                        <div className="absolute -top-2 -right-2 w-4 h-6 bg-yellow-200 rounded-full transform rotate-45"></div>
                      </div>

                      {/* Student 2 - Girl */}
                      <div className="relative">
                        <div className="w-16 h-20 bg-pink-400 rounded-full relative">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-200 rounded-full border-3 border-white">
                            <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>
                          </div>
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-pink-600 rounded-full"></div>
                        </div>
                        {/* School Bag */}
                        <div className="absolute -right-2 bottom-2 w-6 h-8 bg-green-400 rounded-lg border-2 border-green-600">
                          <div className="w-full h-1 bg-green-600 mt-1"></div>
                        </div>
                        {/* Raised Hand */}
                        <div className="absolute -top-3 -left-1 w-3 h-5 bg-yellow-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Students Row 2 */}
                    <div className="flex justify-center space-x-6">
                      {/* Student 3 - Boy */}
                      <div className="relative">
                        <div className="w-16 h-20 bg-green-400 rounded-full relative">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-200 rounded-full border-3 border-white">
                            <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>
                          </div>
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-green-600 rounded-full"></div>
                        </div>
                        {/* School Bag */}
                        <div className="absolute -right-2 bottom-2 w-6 h-8 bg-purple-400 rounded-lg border-2 border-purple-600">
                          <div className="w-full h-1 bg-purple-600 mt-1"></div>
                        </div>
                        {/* Waving */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-200 rounded-full"></div>
                      </div>

                      {/* Student 4 - Girl */}
                      <div className="relative">
                        <div className="w-16 h-20 bg-orange-400 rounded-full relative">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-200 rounded-full border-3 border-white">
                            <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>
                          </div>
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-orange-600 rounded-full"></div>
                        </div>
                        {/* School Bag */}
                        <div className="absolute -right-2 bottom-2 w-6 h-8 bg-blue-400 rounded-lg border-2 border-blue-600">
                          <div className="w-full h-1 bg-blue-600 mt-1"></div>
                        </div>
                        {/* Raised Hand */}
                        <div className="absolute -top-3 -left-1 w-3 h-5 bg-yellow-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full opacity-50"></div>
                    <div className="absolute top-8 -right-6 w-6 h-6 bg-blue-300 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 -left-8 w-10 h-6 bg-green-300 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-pink-300 rounded-full opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Cards Section */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Academic Excellence */}
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Excellence</h3>
                  <p className="text-gray-600 text-sm">Comprehensive curriculum designed for holistic development</p>
                </div>

                {/* Smart Learning Tools */}
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Learning Tools</h3>
                  <p className="text-gray-600 text-sm">Interactive digital platforms for enhanced learning</p>
                </div>

                {/* Expert Teachers */}
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Teachers</h3>
                  <p className="text-gray-600 text-sm">Qualified educators committed to student success</p>
                </div>

                {/* Safe & Supportive Campus */}
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <School size={32} className="text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Supportive Campus</h3>
                  <p className="text-gray-600 text-sm">Secure environment fostering growth and well-being</p>
                </div>
              </div>
            </div>
          </section>

          {/* Programs & Levels Section */}
          <section className="px-6 py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Programs */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Programs & Levels</h2>
                <div className="space-y-4">
                  {/* Primary School */}
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Primary School</h3>
                          <p className="text-gray-600 text-sm">Classes 1-5 • Foundation building</p>
                        </div>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</a>
                    </div>
                  </div>

                  {/* Middle School */}
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <BookOpen size={24} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Middle School</h3>
                          <p className="text-gray-600 text-sm">Classes 6-8 • Skill development</p>
                        </div>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</a>
                    </div>
                  </div>

                  {/* High School */}
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Lightbulb size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">High School</h3>
                          <p className="text-gray-600 text-sm">Classes 9-10 • Career preparation</p>
                        </div>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</a>
                    </div>
                  </div>

                  {/* Digital Learning Support */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle size={24} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Digital Learning Support</h3>
                          <p className="text-gray-600 text-sm">24/7 online resources & support</p>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Why EduMind */}
              <div>
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why EduMind?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">Student-centric learning approach tailored to individual needs</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">Strong parent-teacher collaboration for holistic development</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">Real-time attendance & progress tracking system</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">Secure QR-based attendance for safety & efficiency</p>
                    </div>
                  </div>

                  {/* Illustration */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={32} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Stay Connected with EduMind</h2>
              <p className="text-blue-100 mb-8">Get the latest updates, events, and school news delivered to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-yellow-400"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  Subscribe
                  <Send size={20} className="ml-2" />
                </button>
              </div>
            </div>
          </section>

          {/* Quick Links & Dashboard Cards */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <Calendar size={20} className="text-blue-500" />
                    <span>Events Calendar</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <FileText size={20} className="text-green-500" />
                    <span>Homework Plans</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <Shield size={20} className="text-red-500" />
                    <span>Bullying Prevention</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <Mail size={20} className="text-purple-500" />
                    <span>Registration Forms</span>
                  </a>
                </div>
              </div>

              {/* Dashboard Cards */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Explore Our Dashboards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Dashboard */}
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <User size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Student Dashboard</h4>
                    <p className="text-blue-100 text-sm mb-4">Access your grades, assignments, and school activities</p>
                    <a href="#" className="text-white hover:text-blue-100 font-medium">View Dashboard →</a>
                  </div>

                  {/* Parent Dashboard */}
                  <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Users size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Parent Dashboard</h4>
                    <p className="text-pink-100 text-sm mb-4">Monitor your child's progress and communicate with teachers</p>
                    <a href="#" className="text-white hover:text-pink-100 font-medium">View Dashboard →</a>
                  </div>

                  {/* Teacher Dashboard */}
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Teacher Dashboard</h4>
                    <p className="text-yellow-100 text-sm mb-4">Manage classes, assignments, and student progress</p>
                    <a href="#" className="text-white hover:text-yellow-100 font-medium">View Dashboard →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-gray-400">© 2026 EduMind School. All Rights Reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
