// src/components/Board.js

import React from 'react';
import { Link } from 'react-router-dom';

const Board = ({ board }) => {
  return (
    <div className="board-item">
      <h3>{board.name}</h3>
      {board.description && <p>{board.description}</p>}
      <div className="board-actions">
        <Link to={`/boards/${board._id}`} className="view-board-btn">
          View Tasks
        </Link>
      </div>
    </div>
  );
};

export default Board;