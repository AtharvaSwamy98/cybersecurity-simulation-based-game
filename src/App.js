// import React, { useState, useEffect } from 'react';
// import './App.css'; // Import CSS file
// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   useEffect(() => {
   

//     // Call fetchData immediately when the component mounts
//     PlayAPI();
    
//     // No need to include fetchData in the dependency array
//   }, []); 

//   const PlayAPI = async () => {
//     try {
//       // Call your API here
//       const response = await fetch('https://e5l5aptdy4.execute-api.us-east-1.amazonaws.com/test/play');
//       const data = await response.json();
//       alert("Player has been register");
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const handleLogin = (username) => {
//     setUsername(username);
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setUsername('');
//     setLoggedIn(false);
//   };

//   return (
//     <div className="app-container">
//       {/* {loggedIn ? ( */}
       
//         <div>
      
//        <WebSocketComponent/>
//         {/* <Container webSocketJsons={webSocketJson} /> */}
//        </div>
//       {
//        // ) : (
//       //   <Login onLogin={handleLogin} />
    
//       }


   
//     </div>
//   );
// };

// export default App;
import WebSocketComponent from './Temp/WebSocket';
import React, { useEffect } from 'react'
import { BrowserRouter,Routes, Route,Navigate  } from 'react-router-dom'
import Home from './Component/Home';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';

import './App.css';
import userpool from './UserPool';

function App() {

  useEffect(()=>{
    let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/dashboard" replace />
      }
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/start" element={<WebSocketComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;