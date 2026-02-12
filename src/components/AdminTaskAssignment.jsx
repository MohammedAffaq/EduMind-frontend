import React, { useState, useEffect } from 'react';
import { Users, Calendar, AlertCircle, CheckCircle, Send } from 'lucide-react';

const AdminTaskAssignment = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    staffId: '',
    taskTitle: '',
    description: '',
    priority: 'medium',
    department: 'administration',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      // Assuming we can filter users by role via query param based on previous context
      // If not, we'd fetch all and filter client-side
      const response = await fetch('http://localhost:5000/api/users?role=staff'); 
      const data = await response.json();
      
      if (data.success) {
        // Filter specifically for staff role just in case the API returns mixed results
        const staff = data.users.filter(u => u.role === 'staff');
        setStaffList(staff);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      setMessage({ type: 'error', text: 'Failed to load staff list.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    if (!formData.staffId) {
      setMessage({ type: 'error', text: 'Please select a staff member.' });
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token') || JSON.parse(localStorage.getItem('currentUser') || '{}').token;
      
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Task assigned successfully!' });
        // Reset form except for maybe date
        setFormData(prev => ({
          ...prev,
          taskTitle: '',
          description: '',
          staffId: '', // Reset selection
          priority: 'medium'
        }));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to assign task.' });
      }
    } catch (error) {
      console.error('Task assignment error:', error);
      setMessage({ type: 'error', text: 'Server error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="text-indigo-600" size={24} />
        Assign Staff Task
      </h2>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <option value="">Select Staff Member</option>
              {staffList.map(staff => (
                <option key={staff.id || staff._id} value={staff.id || staff._id}>
                  {staff.firstName} {staff.lastName} ({staff.designation || staff.staffType || 'Staff'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            placeholder="e.g., Inventory Check - Library"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="administration">Administration</option>
              <option value="maintenance">Maintenance</option>
              <option value="library">Library</option>
              <option value="transport">Transport</option>
              <option value="security">Security</option>
              <option value="it">IT Support</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Detailed instructions for the task..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting || loading}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>Processing...</>
            ) : (
              <>
                <Send size={18} />
                Assign Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTaskAssignment;