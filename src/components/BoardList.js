// src/components/BoardList.js

import React from 'react';
import Board from './Board';

const BoardList = ({ boards, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading boards...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!boards || boards.length === 0) {
    return <div className="no-boards">No boards found. Create one to get started!</div>;
  }

  return (
    <div className="board-list">
      <h2>Your Boards</h2>
      <div className="boards-container">
        {boards.map(board => (
          <Board key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;