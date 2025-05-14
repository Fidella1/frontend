import axios from 'axios';

console.log('API_URL:', API_URL);

// Get all boards
export const getAllBoards = () => axios.get(`${API_URL}/getAllBoards`);
// Create a new board
export const createBoard= () => axios.post(`${API_URL}/createBoard`);


// Get a single board by ID
// export const getBoardById = async (boardId) => {
//   try {
//     const response = await axios.get(`${API_URL}/boards/${boardId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching board ${boardId}:`, error);
//     throw error;
//   }
// };