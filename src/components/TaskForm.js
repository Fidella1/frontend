// src/components/TaskForm.js

import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ boardId, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { title, description, status } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const taskData = {
        ...formData,
        boardId
      };
      
      const result = await createTask(taskData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        status: 'To Do'
      });
      
      // Notify parent component about the new task
      if (onTaskCreated) {
        onTaskCreated(result.data);
      }
      
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h3>Add New Task</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Enter task description (optional)"
            rows="2"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={onChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;