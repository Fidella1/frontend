// src/pages/TaskPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getBoardById } from '../services/boardService';
import { getTasksByBoardId } from '../services/taskService';

const TaskPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch board and its tasks on component mount
  useEffect(() => {
    if (boardId) {
      fetchBoardData();
    }
  }, [boardId]);

  // Function to fetch board details and its tasks
  const fetchBoardData = async () => {
    try {
      setLoading(true);
      
      // Fetch board details
      const boardResponse = await getBoardById(boardId);
      setBoard(boardResponse.data);
      
      // Fetch tasks for this board
      const tasksResponse = await getTasksByBoardId(boardId);
      setTasks(tasksResponse.data);
      
      setError('');
    } catch (err) {
      setError('Failed to fetch board data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for when a new task is created
  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Handler for when a task's status is updated
  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  if (loading && !board) {
    return <div className="loading">Loading board...</div>;
  }

  if (error && !board) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/" className="back-btn">Back to Boards</Link>
      </div>
    );
  }

  return (
    <div className="task-page">
      <header className="page-header">
        <div className="header-left">
          <Link to="/" className="back-btn">← Boards</Link>
          <h1>{board ? board.name : 'Loading...'}</h1>
        </div>
        {board && board.description && (
          <p className="board-description">{board.description}</p>
        )}
      </header>
      
      <div className="page-content">
        <div className="task-form-panel">
          <TaskForm 
            boardId={boardId} 
            onTaskCreated={handleTaskCreated} 
          />
        </div>
        
        <div className="task-list-panel">
          <TaskList 
            tasks={tasks} 
            loading={loading} 
            error={error}
            onTaskStatusChange={handleTaskStatusChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;