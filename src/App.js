import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS file
import WebSocketComponent from './Temp/WebSocket';

// Constants for OAuth
const CLIENT_ID = '54ldo5nmo4818h35i1fjf3emuj';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPE = encodeURIComponent('https://api_userpool_resource_server.com/Read');
const AUTHORIZE_URL = 'https://api-client.auth.us-east-1.amazoncognito.com/oauth2/authorize';

const App = ({ accessToken }) => {
  return (
    <div className="app-container">
      {accessToken ? (
        <WebSocketComponent />
      ) : (
        <div>
          <h1>Redirecting to Cognito...</h1>
        </div>
      )}
    </div>
  );
};

const Callback = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      const fetchAccessToken = async () => {
        const CLIENT_SECRET = '4bi0ba2ngnngul0nc3bilehc0pjteosl011fptdpsru69q28nsl';
        const TOKEN_URL = 'https://api-client.auth.us-east-1.amazoncognito.com/oauth2/token';

        const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
        const encodedCredentials = btoa(credentials);

        const tokenData = {
          grant_type: 'authorization_code',
          code: authorizationCode,
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          scope: SCOPE,
        };

        const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}`,
          },
          body: new URLSearchParams(tokenData),
        });

        const data = await response.json();
        if (response.ok) {
          onLogin(data.access_token);
          navigate('/game');
        } else {
          console.error('Error fetching access token:', data);
        }
      };

      fetchAccessToken();
    }
  }, [navigate, onLogin]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

const Home = () => {
  const handleStartGame = () => {
    const authorizationUrl = `${AUTHORIZE_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Cybersecurity Game</h1>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

const AppWrapper = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  const handleLogin = (accessToken) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback onLogin={handleLogin} />} />
        <Route path="/game" element={<App accessToken={accessToken} />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
