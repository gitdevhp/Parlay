import React from 'react';

const PlayerSelector = ({ players, selectedPlayer, onPlayerSelect }) => {
  return (
    <div className="player-selector">
      <h3><i className="fas fa-user"></i> Select Player:</h3>
      <div className="player-list">
        {players.map(player => (
          <div 
            key={player.id} 
            className={`player-card ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
            onClick={() => onPlayerSelect(player)}
          >
            <div className="player-info">
              <h4>{player.name}</h4>
              <p>{player.team} • {player.position}</p>
            </div>
            <div className="player-stats">
              <span className="prop-line">{player.propLine}</span>
              <span className="prop-type">{player.propType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSelector;