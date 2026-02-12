import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, ArrowRight, Loader2, AlertCircle, Shield, GraduationCap, Users, Briefcase, RefreshCw, Upload, Calendar, Phone } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    dob: '',
    staffType: 'teaching',
    designation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput('');
  };

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const response = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       // Store user data and token
  //       localStorage.setItem('currentUser', JSON.stringify(data.user));
  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('userRole', data.user.role);
  //       localStorage.setItem('isLoggedIn', 'true');

  //       // Show welcome message
  //       alert(data.message || 'Welcome to EduMind! You have successfully logged in.');

  //       // Navigate based on role
  //       const userRole = data.user.role;
  //       if (userRole === 'admin') {
  //         navigate('/admin');
  //       } else if (userRole === 'student') {
  //         navigate('/student');
  //       } else if (userRole === 'parent') {
  //         navigate('/parent');
  //       } else if (userRole === 'teacher') {
  //         navigate('/teacher');
  //       } else if (userRole === 'staff') {
  //         // Check if staff is teaching or non-teaching based on data
  //         if (data.user.staffType === 'non-teaching') {
  //           navigate('/staff');
  //         } else {
  //           navigate('/teacher');
  //         }
  //       } else {
  //         navigate('/');
  //       }
  //     } else {
  //       setError(data.error || 'Login failed');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic CAPTCHA validation
    if (captchaInput !== captcha) {
      setError('Invalid CAPTCHA. Please try again.');
      setIsLoading(false);
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Read response safely (IMPORTANT)
      const rawText = await response.text();
      let data;

      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        console.error('Non-JSON response from server:', rawText);
        throw new Error('Server error. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // SUCCESS
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('isLoggedIn', 'true');

      alert(data.message || 'Login successful');

      // Role-based navigation
      const userRole = data.user.role;

      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'student') {
        navigate('/student');
      } else if (userRole === 'parent') {
        navigate('/parent');
      } else if (userRole === 'teacher') {
        navigate('/teacher');
      } else if (userRole === 'staff') {
        const nonTeachingRoles = ['driver', 'accountant', 'peon', 'cleaning', 'cleaning-staff', 'cleaner', 'librarian', 'receptionist', 'security', 'office-staff'];
        const designation = data.user.designation ? data.user.designation.toLowerCase().replace(/\s+/g, '-') : '';

        // Check if staffType is explicitly non-teaching OR if the designation is in the non-teaching list
        if (
          data.user.staffType === 'non-teaching' ||
          nonTeachingRoles.includes(designation)
        ) {
          navigate('/staff');
        } else {
          // Default to teacher for teaching staff or unidentified roles (safe fallback)
          navigate('/teacher');
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const renderRoleTabs = () => (
    <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
      {[
        { id: 'admin', label: 'Admin', icon: Shield },
        { id: 'student', label: 'Student', icon: GraduationCap },
        { id: 'parent', label: 'Parent', icon: Users },
        { id: 'staff', label: 'Staff', icon: Briefcase },
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setRole(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${role === tab.id
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
        >
          <tab.icon size={16} />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );

  const renderFields = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="admin@edumind.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </>
        );
      case 'student':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="student@edumind.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </>
        );
      case 'parent':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="parent@edumind.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  Visible for debugging
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Make sure this matches the password you used during registration</p>
            </div>
          </>
        );
      case 'staff':
        return (
          <>
            <div className="flex gap-4 mb-4 p-1 bg-gray-50 rounded-lg">
              {['teaching', 'non-teaching'].map((type) => (
                <label key={type} className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-2 rounded-md transition-all hover:bg-white hover:shadow-sm">
                  <input
                    type="radio"
                    name="staffType"
                    value={type}
                    checked={formData.staffType === type}
                    onChange={(e) => setFormData({ ...formData, staffType: e.target.value, designation: '' })}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">{type.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="">Select Designation</option>
                {formData.staffType === 'teaching' ? (
                  <>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Subject Teacher">Subject Teacher</option>
                    <option value="HOD">HOD</option>
                    <option value="Principal">Principal</option>
                  </>
                ) : (
                  <>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Peon">Peon</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Driver">Driver</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="staff@edumind.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative min-h-screen bg-white">
        <div className="relative z-10 w-full max-w-2xl">
          <img
            src="/assets/school.png"
            alt="School"
            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-float"
          />
          <div className="text-center mt-8 text-gray-900">
            <h2 className="text-3xl font-bold mb-2">Welcome to EduMind</h2>
            <p className="text-gray-600 text-lg">Your gateway to a smarter, connected educational experience.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white min-h-screen">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 tracking-wide">LOGIN</h1>
          </div>

          {renderRoleTabs()}

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 animate-fadeIn">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {renderFields()}

            {/* Security Check */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-300 font-mono text-lg tracking-widest text-gray-600 select-none">
                  {captcha}
                </div>
                <button type="button" onClick={generateCaptcha} className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-full transition-colors">
                  <RefreshCw size={20} />
                </button>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm mb-3"
                placeholder="Enter CAPTCHA"
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="robot" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="robot" className="text-sm text-gray-600 cursor-pointer">I'm not a robot</label>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 font-semibold hover:text-blue-700">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  {role === 'staff' && formData.staffType === 'non-teaching'
                    ? 'Login as Non-Teaching Staff'
                    : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
export default LoginPage;