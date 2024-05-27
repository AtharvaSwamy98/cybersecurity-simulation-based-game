import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game'); // Navigate to the game page for now
  };

  return (
    <div className="home-page">
      <div className="animated-background"></div>
      <header className="home-header">
        <h1>CyberGame</h1>
        <h2 className="subtitle">Secure your systems, defend against threats, and make strategic decisions</h2>
      </header>
      <main className="home-content">
        <p>
          Welcome to CyberGame, where you will test your cybersecurity skills in a series of challenging scenarios. Can you keep your system secure and stay ahead of cyber threats?
        </p>
        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>
      </main>
    </div>
  );
};

export default HomePage;

