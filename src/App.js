import React, { useState } from 'react';
import './App.css'; // Import CSS file
import Login from './Component/Login';
import Container from './Container/Container';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
       
        <div>
       <Container/>
       </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
