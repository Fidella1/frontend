// src/pages/BoardPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoardForm from '../components/BoardForm';
import BoardList from '../components/BoardList';
import { getAllBoards } from '../services/boardService';

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all boards on component mount
  useEffect(() => {
    fetchBoards();
  }, []);

  // Function to fetch boards from API
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await getBoards();
      setBoards(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch boards. Please refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for when a new board is created
  const handleBoardCreated = (newBoard) => {
    setBoards([...boards, newBoard]);
  };

  return (
    <div className="board-page">
      <header className="page-header">
        <h1>Task Management App</h1>
      </header>
      
      <div className="page-content">
        <div className="left-panel">
          <BoardForm onBoardCreated={handleBoardCreated} />
        </div>
        
        <div className="right-panel">
          <BoardList 
            boards={boards} 
            loading={loading} 
            error={error} 
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;