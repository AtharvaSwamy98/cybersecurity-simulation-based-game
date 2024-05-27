import { Button } from '@mui/material'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import userpool from '../UserPool.js'
import { logout } from '../services/authenticate';
import WebSocketComponent from '../Temp/WebSocket.js';

const Dashboard = () => {

  const Navigate = useNavigate();

  useEffect(()=>{
    let user=userpool.getCurrentUser();
    console.log(user);
    if(!user){
      Navigate('/login');
    }
  },[]);

  const handleLogoout=()=>{
    logout();
  };

  return (
    <div className='Dashboard'>
        <WebSocketComponent />
      <Button
        style={{margin:"10px"}}
        variant='contained'
        onClick={handleLogoout}
      >
        Logout
      </Button>
    </div>
  )
}

export default Dashboard