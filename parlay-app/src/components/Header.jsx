import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <i className="fas fa-basketball-ball"></i>
          <span>ESPN PropAnalytics</span>
        </div>
        <nav>
          <ul>
            <li><a href="#" className="active"><i className="fas fa-chart-line"></i> Analytics</a></li>
            <li><a href="#"><i className="fas fa-users"></i> Players</a></li>
            <li><a href="#"><i className="fas fa-table"></i> Leaderboard</a></li>
            <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;