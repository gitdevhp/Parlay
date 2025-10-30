import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="filters-container">
      <div className="filters-title">
        <h2><i className="fas fa-filter"></i> Filter Data</h2>
        <i className="fas fa-chevron-up toggle-icon"></i>
      </div>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="sport">Sport</label>
          <select id="sport" name="sport" value={filters.sport} onChange={onFilterChange}>
            <option value="basketball">Basketball</option>
            <option value="football">Football</option>
            <option value="baseball">Baseball</option>
            <option value="hockey">Hockey</option>
          </select>
        </div>
        {/* Add other filter groups here */}
      </div>
    </div>
  );
};

export default Filters;