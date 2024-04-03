import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file
import Login from './Component/Login';
import Container from './Container/Container';
import WebSocketComponent from './Temp/WebSocket';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const PlayAPI = async () => {
      try {
        // Call your API here
        const response = await fetch('https://e5l5aptdy4.execute-api.us-east-1.amazonaws.com/test/play');
        const data = await response.json();
        
        // Do something with the data, for example:
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData immediately when the component mounts
    PlayAPI();

    // No need to include fetchData in the dependency array
  }, []); 
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
      {/* {loggedIn ? ( */}
       
        <div>
       <Container/>
       {/* <WebSocketComponent/> */}
       </div>
      {/* // ) : (
      //   <Login onLogin={handleLogin} />
      // )} */}
    </div>
  );
};

export default App;
