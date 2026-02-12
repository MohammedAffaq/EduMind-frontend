import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Clock, AlertTriangle, Play, Square, RefreshCw, Calendar } from 'lucide-react';

const CleaningStaffTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming token is stored here
      // Use relative path or configured base URL in a real app
      const response = await axios.get('http://localhost:5000/api/tasks/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTasks(response.data.tasks);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setTasks(tasks.map(task => 
          task._id === taskId ? response.data.task : task
        ));
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update task status');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) return <div className="p-8 text-center text-gray-500">Loading tasks...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
        <button onClick={fetchTasks} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" title="Refresh">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'pending', 'in_progress', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === status ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-500">
            No tasks found.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-600">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Calendar size={14} /> Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className="capitalize">Assigned by: {task.assignedBy?.firstName} {task.assignedBy?.lastName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {task.status === 'pending' && (
                    <button onClick={() => handleStatusUpdate(task._id, 'in_progress')} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                      <Play size={16} /> Start
                    </button>
                  )}
                  {task.status === 'in_progress' && (
                    <button onClick={() => handleStatusUpdate(task._id, 'completed')} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-colors">
                      <CheckCircle size={16} /> Complete
                    </button>
                  )}
                  {task.status === 'completed' && (
                    <span className="flex items-center gap-2 px-4 py-2 text-green-600 font-medium bg-green-50 rounded-lg">
                      <CheckCircle size={16} /> Done
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CleaningStaffTasks;