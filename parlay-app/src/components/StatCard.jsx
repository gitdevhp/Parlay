import React from 'react';

const StatCard = ({ title, value, trend, trendDirection }) => {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <div className="value">{value}</div>
      <div className={`trend ${trendDirection}`}>
        <i className={`fas fa-arrow-${trendDirection}`}></i>
        <span>{trend}</span>
      </div>
    </div>
  );
};

export default StatCard;