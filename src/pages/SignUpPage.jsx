import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Shield, GraduationCap, Users, Briefcase, AlertCircle, Mail, Eye, EyeOff, Plus, Trash2, Calendar, Upload } from 'lucide-react';
import { API_URL } from '../config/api';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('admin');
  const [staffType, setStaffType] = useState('teaching');
  const [step, setStep] = useState('form'); // 'form', 'otp', 'verify', 'success'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpInputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'admin',
    // Role-specific fields
    rollNumber: '',
    staffType: 'teaching',
    className: '',
    designation: '',
    subject: '',
    children: [{ name: '', className: '' }],
    relationship: '',
    dob: '',
    documents: '',
  });

  const [userId, setUserId] = useState('');

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });

    // Real-time validation for password
    if (touched.password) {
      const newErrors = { ...errors };
      if (!pwd) newErrors.password = 'Password is required';
      else delete newErrors.password;

      if (confirmPassword && pwd !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      } else {
        delete newErrors.confirmPassword;
      }
      setErrors(newErrors);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const cnfPwd = e.target.value;
    setConfirmPassword(cnfPwd);
    if (touched.confirmPassword && formData.password !== cnfPwd) setErrors({ ...errors, confirmPassword: 'Passwords do not match.' });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formData[name]);
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Role-specific validation
    if (role === 'student') {
      if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
      else if (!/^[A-Za-z0-9]+$/.test(formData.rollNumber)) newErrors.rollNumber = 'Roll number must be alphanumeric';

      if (!formData.className.trim()) newErrors.className = 'Class is required';
    }
    if (role === 'staff') {
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (staffType === 'teaching' && !formData.subject.trim()) newErrors.subject = 'Subject is required';
    }
    if (role === 'parent') {
      const validChildren = formData.children.filter(c => c.name.trim() !== '');
      if (validChildren.length === 0) {
        newErrors.children = 'At least one child name is required';
      }
      if (!formData.relationship.trim()) newErrors.relationship = 'Relationship is required';
    }
    if (role === 'student') {
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      // Documents are optional, but if you want to enforce it:
      // if (!formData.documents) newErrors.documents = 'Document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) newErrors.firstName = 'First name is required';
        else delete newErrors.firstName;
        break;
      case 'lastName':
        if (!value.trim()) newErrors.lastName = 'Last name is required';
        else delete newErrors.lastName;
        break;
      case 'email':
        if (!value.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Email is invalid';
        else delete newErrors.email;
        break;
      case 'phone':
        if (!value.trim()) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
        else delete newErrors.phone;
        break;
      case 'rollNumber':
        if (role === 'student' && !value.trim()) newErrors.rollNumber = 'Roll number is required';
        else if (role === 'student' && !/^[A-Za-z0-9]+$/.test(value)) newErrors.rollNumber = 'Roll number must be alphanumeric';
        else delete newErrors.rollNumber;
        break;
      case 'className':
        if (role === 'student' && !value.trim()) newErrors.className = 'Class is required';
        else delete newErrors.className;
        break;
      case 'designation':
        if (role === 'staff' && !value.trim()) newErrors.designation = 'Designation is required';
        else delete newErrors.designation;
        break;
      case 'subject':
        if (role === 'staff' && staffType === 'teaching' && !value.trim()) newErrors.subject = 'Subject is required';
        else delete newErrors.subject;
        break;
      case 'relationship':
        if (role === 'parent' && !value.trim()) newErrors.relationship = 'Relationship is required';
        else delete newErrors.relationship;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        setErrors({ ...errors, documents: 'File size must be less than 1MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, documents: reader.result });
        // Clear error if any
        const newErrors = { ...errors };
        delete newErrors.documents;
        setErrors(newErrors);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({ ...formData, role: newRole, staffType: 'teaching' });
    // Clear role-specific errors when changing role
    const newErrors = { ...errors };
    delete newErrors.rollNumber;
    delete newErrors.className;
    delete newErrors.designation;
    delete newErrors.subject;
    delete newErrors.relationship;
    setErrors(newErrors);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show errors
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: role, staffType: staffType }),
      });

      const result = await response.json();

      if (result.success) {
        setUserId(result.userId);
        setStep('otp');
        setResendTimer(60); // 60 seconds cooldown
      } else {
        setErrors({ general: result.error || 'Failed to register. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Connection failed. Please ensure the backend server is running on port 3001.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (!otpValue.trim()) {
      setErrors({ otp: 'Please enter the OTP' });
      return;
    }

    if (otpValue.length !== 4 || !/^\d{4}$/.test(otpValue)) {
      setErrors({ otp: 'OTP must be 4 digits' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: otpValue }),
      });

      const result = await response.json();

      if (result.success) {
        // OTP Verified. Now Register the User!
        try {
          const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              role: role,
              staffType: role === 'staff' ? staffType : undefined,
            }),
          });

          const registerResult = await registerResponse.json();

          if (registerResult.success) {
            setStep('success');
            setTimeout(() => {
              navigate('/'); // Redirect to login page
            }, 3000);
          } else {
            setErrors({ general: registerResult.error || 'Registration failed. Please try again.' });
          }
        } catch (registerError) {
          console.error('Registration API error:', registerError);
          setErrors({ general: 'Registration failed due to network error.' });
        }
      } else {
        setErrors({ otp: result.error || 'Invalid OTP. Please try again.' });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrors({ otp: 'Connection failed. Please ensure the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: role, staffType: staffType }),
      });

      const result = await response.json();

      if (result.success) {
        setResendTimer(60);
        setOtp(new Array(4).fill("")); // Clear previous OTP
      } else {
        setErrors({ general: result.error || 'Failed to resend OTP. Please try again.' });
      }
    } catch (error) {
      console.error('OTP resend error:', error);
      setErrors({ general: 'Connection failed. Please ensure the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'admin': return <Shield size={20} />;
      case 'staff': return <Briefcase size={20} />;
      case 'student': return <GraduationCap size={20} />;
      case 'parent': return <Users size={20} />;
      default: return <Users size={20} />;
    }
  };

  const getRoleDescription = (roleType) => {
    switch (roleType) {
      case 'admin': return 'System administrator with full access.';
      case 'staff': return 'School staff member (teaching or non-teaching).';
      case 'student': return 'Student enrolled in classes.';
      case 'parent': return 'Parent/guardian of a student.';
      default: return '';
    }
  };

  const handleAddChild = () => {
    setFormData({ ...formData, children: [...formData.children, { name: '', className: '' }] });
  };

  const handleRemoveChild = (index) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: newChildren });
  };

  const handleChildChange = (index, field, value) => {
    const newChildren = [...formData.children];
    newChildren[index][field] = value;
    setFormData({ ...formData, children: newChildren });
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && index < 3) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 4).split("");
    if (data.length > 0) {
      const newOtp = [...otp];
      data.forEach((value, index) => {
        if (index < 4 && !isNaN(value)) newOtp[index] = value;
      });
      setOtp(newOtp);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-2">Welcome to EduMind! 🎉</p>
          <p className="text-sm text-gray-500 mb-4">A welcome email has been sent to {formData.email}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4 py-8">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>
      <div className="w-full max-w-2xl">
        <div className="flex justify-start items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-accent hover:opacity-90 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-accent px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">EduMind Registration</h1>
            <p className="text-white">Create your account to access the EduMind system</p>
          </div>

          {step === 'form' && (
            <form onSubmit={handleSendOTP} className="p-8 space-y-6">
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errors.general}</p>
                </div>
              )}

              {/* Role Selection */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Your Role</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['admin', 'staff', 'student', 'parent'].map((roleType) => (
                    <button
                      key={roleType}
                      type="button"
                      onClick={() => handleRoleChange(roleType)}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${role === roleType
                        ? 'border-accent bg-gray-50 text-accent'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {getRoleIcon(roleType)}
                        <span className="font-medium capitalize">{roleType}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{getRoleDescription(role)}</p>
              </div>

              {/* Basic Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (touched.firstName) validateField('firstName', e.target.value);
                      }}
                      onBlur={handleBlur}
                      placeholder="John"
                      className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        if (touched.lastName) validateField('lastName', e.target.value);
                      }}
                      onBlur={handleBlur}
                      placeholder="Doe"
                      className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (touched.email) validateField('email', e.target.value);
                      }}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (touched.phone) validateField('phone', e.target.value);
                      }}
                      onBlur={handleBlur}
                      placeholder="9876543210"
                      className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {role === 'student' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, rollNumber: e.target.value });
                          if (touched.rollNumber) validateField('rollNumber', e.target.value);
                        }}
                        onBlur={handleBlur}
                        placeholder="STU001"
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      />
                      {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                      <select
                        name="className"
                        value={formData.className}
                        onChange={(e) => {
                          setFormData({ ...formData, className: e.target.value });
                          if (touched.className) validateField('className', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.className ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      >
                        <option value="">Select Class</option>
                        {[...Array(12)].map((_, i) => <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                      </select>
                      {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) => {
                          setFormData({ ...formData, dob: e.target.value });
                          if (touched.dob) validateField('dob', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                        required
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document (ID Proof)</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {formData.documents ? (
                              <div className="text-center">
                                <p className="text-sm text-green-600 font-semibold mb-1">File Selected</p>
                                <p className="text-xs text-gray-500">Click to change</p>
                              </div>
                            ) : (
                              <>
                                <ArrowLeft className="w-8 h-8 text-gray-400 mb-2 rotate-90" />
                                <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 1MB)</p>
                              </>
                            )}
                          </div>
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                      </div>
                      {errors.documents && <p className="text-red-500 text-xs mt-1">{errors.documents}</p>}
                    </div>
                  </div>
                </div>
              )}

              {role === 'staff' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Staff Information</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Type *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="staffType" value="teaching" checked={staffType === 'teaching'} onChange={(e) => { setStaffType(e.target.value); setFormData({ ...formData, designation: '' }); }} className="w-4 h-4 text-accent focus-accent" />
                        Teaching Staff
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="staffType" value="non-teaching" checked={staffType === 'non-teaching'} onChange={(e) => { setStaffType(e.target.value); setFormData({ ...formData, designation: '' }); }} className="w-4 h-4 text-accent focus-accent" />
                        Non-Teaching Staff
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={(e) => {
                          setFormData({ ...formData, designation: e.target.value });
                          if (touched.designation) validateField('designation', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.designation ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      >
                        <option value="">Select Designation</option>
                        {staffType === 'teaching' ? (
                          <>
                            <option value="Principal">Principal</option>
                            <option value="HOD">HOD</option>
                            <option value="Class Teacher">Class Teacher</option>
                            <option value="Subject Teacher">Subject Teacher</option>
                          </>
                        ) : (
                          <>
                            <option value="Driver">Driver</option>
                            <option value="Librarian">Librarian</option>
                            <option value="Lab Assistant">Lab Assistant</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Clerk">Clerk</option>
                            <option value="Security">Security</option>
                            <option value="Peon">Peon</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Cleaning Staff">Cleaning Staff</option>
                          </>
                        )}
                      </select>
                      {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                    </div>

                    {staffType === 'teaching' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={(e) => {
                            setFormData({ ...formData, subject: e.target.value });
                            if (touched.subject) validateField('subject', e.target.value);
                          }}
                          onBlur={handleBlur}
                          placeholder="e.g., Mathematics"
                          className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.subject ? 'border-red-500' : 'border-gray-300'
                            }`}
                          required
                        />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {role === 'parent' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Parent Information</h3>
                  <div className="space-y-4">
                    {formData.children.map((child, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50 relative">
                        {formData.children.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveChild(index)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Child Name *</label>
                          <input
                            type="text"
                            value={child.name}
                            onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                            placeholder="Alex Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                          <select
                            value={child.className}
                            onChange={(e) => handleChildChange(index, 'className', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent"
                          >
                            <option value="">Select Class</option>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddChild}
                      className="flex items-center gap-2 text-sm font-medium text-accent hover:opacity-90"
                    >
                      <Plus size={16} /> Add Another Child
                    </button>
                    {errors.children && <p className="text-red-500 text-xs">{errors.children}</p>}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                      <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={(e) => {
                          setFormData({ ...formData, relationship: e.target.value });
                          if (touched.relationship) validateField('relationship', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.relationship ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      >
                        <option value="">Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                      {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Password Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Password Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        onBlur={handleBlur}
                        placeholder="Create a strong password"
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onBlur={handleBlur}
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-2 border rounded-lg focus-accent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-500">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-accent hover:opacity-95'
                    }`}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/')}
                    className="text-accent hover:text-accent font-semibold transition-colors"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="p-8 space-y-6">
              <div className="text-center">
                <Mail className="w-16 h-16 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a 4-digit OTP to <strong>{formData.email}</strong>
                </p>
              </div>

              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errors.general}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Enter OTP</label>
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handlePaste}
                        className={`w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.otp ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 4}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${loading || otp.join("").length !== 4
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-accent hover:shadow-lg transform hover:scale-105'
                    }`}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the OTP?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || loading}
                    className={`text-sm font-medium ${resendTimer > 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-accent hover:text-accent'
                      }`}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>

                <div className="text-center pt-4 border-t">
                  <button
                    onClick={() => setStep('form')}
                    className="text-accent hover:text-accent font-semibold transition-colors"
                  >
                    ← Back to Form
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
