// src/components/TaskList.js

import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, loading, error, onTaskStatusChange }) => {
  // Group tasks by status
  const groupTasksByStatus = () => {
    const grouped = {
      'To Do': [],
      'In Progress': [],
      'Done': []
    };
    
    if (tasks && tasks.length > 0) {
      tasks.forEach(task => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        } else {
          // Fallback for any unexpected status
          grouped['To Do'].push(task);
        }
      });
    }
    
    return grouped;
  };
  
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="no-tasks">No tasks found for this board. Add one to get started!</div>;
  }

  const groupedTasks = groupTasksByStatus();

  return (
    <div className="task-list">
      <div className="task-columns">
        <div className="task-column todo-column">
          <h3 className="column-header">To Do</h3>
          <div className="tasks-container">
            {groupedTasks['To Do'].map(task => (
              <Task 
                key={task._id} 
                task={task} 
                onStatusChange={onTaskStatusChange} 
              />
            ))}
          </div>
        </div>
        
        <div className="task-column progress-column">
          <h3 className="column-header">In Progress</h3>
          <div className="tasks-container">
            {groupedTasks['In Progress'].map(task => (
              <Task 
                key={task._id} 
                task={task} 
                onStatusChange={onTaskStatusChange} 
              />
            ))}
          </div>
        </div>
        
        <div className="task-column done-column">
          <h3 className="column-header">Done</h3>
          <div className="tasks-container">
            {groupedTasks['Done'].map(task => (
              <Task 
                key={task._id} 
                task={task} 
                onStatusChange={onTaskStatusChange} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;