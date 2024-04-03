import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Function to connect to WebSocket server
    const connectWebSocket = () => {
      const socket = new WebSocket('wss://of022jtfp6.execute-api.us-east-1.amazonaws.com/production/'); // Replace with your WebSocket server URL

      // WebSocket event listeners
      socket.onopen = () => {
        console.log('WebSocket connected');
        setWs(socket); // Save WebSocket instance to state
      };

      socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        setMessage(event.data); // Set received message in state
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
      };

      // Save WebSocket instance to state
      setWs(socket);
    };

    // Initial connection
    connectWebSocket();

    // Clean up function to close WebSocket connection
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // Dependency array is empty to run this effect only once on component mount

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('Hello, WebSocket!'); // Send message to WebSocket server
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <h2>Connection Status:</h2>
        <p>{message}</p> {/* Render received message */}
      </div>
    </div>
  );
};

export default WebSocketComponent;