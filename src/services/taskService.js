// src/services/taskService.js

import axios from 'axios';

console.log('API_URL:', API_URL);

// Get all tasks for a specific board
export const getAllTasks = () => axios.get(`${API_URL}/getAllTaskss`);
// Create a new Task
export const createTask= () => axios.post(`${API_URL}/createTask`);

// Update a task's status
// export const updateTaskStatus = async (taskId, status) => {
//   try {
//     const response = await axios.patch(`${API_URL}/tasks/${taskId}`, { status });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating task ${taskId}:`, error);
//     throw error;
//   }
// };