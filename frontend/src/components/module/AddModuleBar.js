import React, { useState } from 'react';
import './AddModuleBar.css';

const AddModuleBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="add-modules-container">
      <form onSubmit={handleSearch}>
        <input className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or Name"
          required
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  );
};

export default AddModuleBar;
