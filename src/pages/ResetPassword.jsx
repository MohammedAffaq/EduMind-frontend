import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, CheckCircle, Lock } from 'lucide-react';


export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (errors.password) setErrors({ ...errors, password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      
      try {
        // TODO: Replace with your actual API endpoint
        /*
        const response = await fetch('https://api.edumind.com/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });

        if (!response.ok) throw new Error('Failed to reset password');
        */

        // Simulate API delay for now
        await new Promise(resolve => setTimeout(resolve, 1500));

        localStorage.removeItem('resetEmail');
        setSubmitted(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setErrors({ form: 'Failed to reset password. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been changed. You can now login with your new password.
          </p>
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Redirecting to login page...
            </p>
            <div className="flex gap-1 justify-center">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="flex items-center gap-2 text-accent hover:opacity-90 mb-6 font-medium transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          Back to Forgot Password
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4">
            <Lock className="text-accent" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-accent text-center mb-2">Reset Password</h1>
          <p className="text-gray-600 text-sm text-center">
            Create a new strong password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔒 New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition ${
                  errors.password
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus-accent'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔒 Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition ${
                  errors.confirmPassword
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus-accent'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 mt-6 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-accent hover:opacity-95' 
            }`}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Remember your password? <button onClick={() => navigate('/')} className="text-accent hover:text-accent font-semibold transition-colors duration-200">Login here</button>
        </p>
      </div>
    </div>
  );
}
