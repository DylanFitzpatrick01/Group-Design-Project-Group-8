import React, { useState } from 'react';
import './AddSocietyBar.css'; // You might want to create a similar or shared CSS file

const AddSocietiesBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="add-societies-container">
      <form onSubmit={handleSearch}>
        <input className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name"
          required
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  );
};

export default AddSocietiesBar;
