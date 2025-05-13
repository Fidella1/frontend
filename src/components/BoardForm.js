// src/components/BoardForm.js

import React, { useState } from 'react';
import { createBoard } from '../services/boardService';

const BoardForm = ({ onBoardCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Board name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const result = await createBoard(formData);
      
      // Reset form
      setFormData({
        name: '',
        description: ''
      });
      
      // Notify parent component about the new board
      if (onBoardCreated) {
        onBoardCreated(result.data);
      }
      
    } catch (err) {
      setError('Failed to create board. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="board-form-container">
      <h2>Create New Board</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Board Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter board name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Enter board description (optional)"
            rows="3"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Board'}
        </button>
      </form>
    </div>
  );
};

export default BoardForm;