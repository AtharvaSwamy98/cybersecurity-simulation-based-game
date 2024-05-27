import React, { useState } from 'react'
import { Button, TextField,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';
import userpool from '../UserPool'

const Login = () => {

  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr,setLoginErr]=useState('');

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required")
        resolve({ email: "Email is Required", password: "Password is required" });
      }
      else if (email === '') {
        setEmailErr("Email is Required")
        resolve({ email: "Email is Required", password: "" });
      }
      else if (password === '') {
        setPasswordErr("Password is required")
        resolve({ email: "", password: "Password is required" });
      }
      else if (password.length < 6) {
        setPasswordErr("must be 6 character")
        resolve({ email: "", password: "must be 6 character" });
      }
      else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          const authenticationData = {
            Username: email,
            Password: password,
          };
  
          const authenticationDetails = new AuthenticationDetails(authenticationData);
  
          const userData = {
            Username: email,
            Pool: userPool,
          };
  
          const cognitoUser = new CognitoUser(userData);
  
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
              console.log('Authentication successful', session);
              // Redirect to dashboard or any other protected route
              Navigate('/dashboard');
            },
            onFailure: (err) => {
              console.error('Authentication failed', err);
              setLoginErr(err.message); // Update state to show error message
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
              // This callback will be invoked if the user is required to set a new password
              console.log('New password required', userAttributes, requiredAttributes);
              // Handle new password requirement, if applicable
            },
          });
        }
      })
      .catch((err) => console.error(err));
  };
  

  return (
    <div className="login">

      <div className='form'>
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="Password"
            helperText={passwordErr}
          />
        </div>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Login</Button>
        </div>
        <Typography variant="body">{loginErr}</Typography>
      </div>

    </div>
  )
}

export default Login