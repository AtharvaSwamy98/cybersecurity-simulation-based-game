import React, { useState, useEffect } from 'react';
import Container from '../Container/Container';

const WebSocketComponent = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [data,setData]= useState(null);
  const [jsonData,setJsonData]=useState(false);
  useEffect(() => {
    // Open WebSocket connection
    const ws = new WebSocket('wss://of022jtfp6.execute-api.us-east-1.amazonaws.com/production/');

    // Add event listeners
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      // console.log('Received message:', event.data);
      // Handle incoming messages here  
      
        console.log(event.data);

        setData(event.data);
        setJsonData(true);
      
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Close WebSocket connection on component unmount
    return () => {
      ws.close();
    };

    // Set WebSocket instance to state
    setWebSocket(ws);
    
  },[]); // Run effect only once on component mount

  // Function to send message through WebSocket
  const sendMessage = (message) => {
    if (webSocket) {
      webSocket.send(message);
    } else {
      console.error('WebSocket connection not established.');
    }
  };
  return (
    <div>
      {/* <button onClick={() => sendMessage('Hello WebSocket!')}>Send Message</button> */}
      {jsonData && (
      <Container 
      jsonDataValues={data}
      />
       )}
       {!jsonData &&(
        <h1> Game hasn't started by Admin</h1>
       )}
    </div>
  );
};

export default WebSocketComponent;
