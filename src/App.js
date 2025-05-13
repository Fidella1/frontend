// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import TaskPage from './pages/TaskPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/boards/:boardId" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;