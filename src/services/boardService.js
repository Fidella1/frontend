import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all boards
export const getBoards = async () => {
  try {
    const response = await axios.get(`${API_URL}/boards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

// Create a new board
export const createBoard = async (boardData) => {
  try {
    const response = await axios.post(`${API_URL}/boards`, boardData);
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

// Get a single board by ID
export const getBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board ${boardId}:`, error);
    throw error;
  }
};