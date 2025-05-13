// src/components/Task.js

import React from 'react';
import { updateTaskStatus } from '../services/taskService';

const Task = ({ task, onStatusChange }) => {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    
    try {
      await updateTaskStatus(task._id, newStatus);
      
      // Notify parent component about the status change
      if (onStatusChange) {
        onStatusChange(task._id, newStatus);
      }
    } catch (err) {
      console.error('Failed to update task status:', err);
      // Revert the select back to original value on error
      e.target.value = task.status;
    }
  };

  // Function to determine task card color based on status
  const getStatusColorClass = (status) => {
    switch(status) {
      case 'To Do':
        return 'status-todo';
      case 'In Progress':
        return 'status-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusColorClass(task.status)}`}>
      <h4 className="task-title">{task.title}</h4>
      {task.description && <p className="task-description">{task.description}</p>}
      
      <div className="task-footer">
        <div className="task-status">
          <label htmlFor={`status-${task._id}`}>Status:</label>
          <select
            id={`status-${task._id}`}
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <span className="task-created">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default Task;