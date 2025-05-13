// src/services/taskService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all tasks for a specific board
export const getTasksByBoardId = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${boardId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks for board ${boardId}:`, error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update a task's status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};