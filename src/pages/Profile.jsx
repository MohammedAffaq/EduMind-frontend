import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Aarjav Patel',
    email: 'aarjav@example.com',
    phone: '+91 98765 43210',
    address: '123 School Lane, City, State',
    bio: 'Class 10-A Student | Mathematics Enthusiast',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userRole="student" onLogout={() => {}} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{profileData.fullName}</h1>
              <p className="text-gray-600">Class 10-A Student</p>
              <p className="text-sm text-gray-500 mt-1">Member since 2020</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-accent hover:opacity-95 text-white px-4 py-2 rounded-lg font-medium"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent disabled:bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent disabled:bg-gray-100"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent disabled:bg-gray-100"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-accent disabled:bg-gray-100"
              ></textarea>
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Account Settings */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-gray-900">Change Password</p>
                <p className="text-sm text-gray-600">Update your password regularly</p>
              </button>
              <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </button>
              <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-gray-900">Connected Apps</p>
                <p className="text-sm text-gray-600">Manage apps connected to your account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
