import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/logo.png" 
                alt="EduMind Logo" 
                className="w-20 h-20 object-contain" 
              />
              <span className="text-xl font-bold">EduMind</span>
            </div>
            <p className="text-gray-400">
              Empowering young minds for a brighter tomorrow through holistic education.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#academics" className="hover:text-white transition-colors">Academics</a></li>
              <li><a href="/admissions" className="hover:text-white transition-colors">Admissions</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#academics" className="hover:text-white transition-colors">Primary School</a></li>
              <li><a href="/#academics" className="hover:text-white transition-colors">Middle School</a></li>
              <li><a href="/#academics" className="hover:text-white transition-colors">High School</a></li>
              <li><a href="/#academics" className="hover:text-white transition-colors">Digital Learning</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1">
                <span className="text-sm font-bold">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1">
                <span className="text-sm font-bold">in</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 EduMind School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;