import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

const Auth = () => {
  const CLIENT_ID = '54ldo5nmo4818h35i1fjf3emuj';
  const REDIRECT_URI = 'http://localhost:3000/callback';
  const AUTHORIZE_URL = 'https://api-client.auth.us-east-1.amazoncognito.com/oauth2/authorize';
  const TOKEN_URL = 'https://api-client.auth.us-east-1.amazoncognito.com/oauth2/token';
  const CLIENT_SECRET = '4bi0ba2ngnngul0nc3bilehc0pjteosl011fptdpsru69q28nsl';
  const scope = encodeURIComponent('openid https://api_userpool_resource_server.com/threats_read');
  const COGNITO_LOGOUT_URL = 'https://api-client.auth.us-east-1.amazoncognito.com/oauth2/revoke';

  const location = useLocation();
  const history = useHistory();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    if (location.pathname === '/callback') {
      const authorizationCode = new URLSearchParams(location.search).get('code');
      if (authorizationCode) {
        getToken(authorizationCode);
      }
    }
  }, [location]);

  const getToken = async (authorizationCode) => {
    const tokenData = {
      grant_type: 'authorization_code',
      code: authorizationCode,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    };

    try {
      const response = await axios.post(TOKEN_URL, new URLSearchParams(tokenData), { headers });
      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      history.push('/');
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const logout = async () => {
    const tokenData = {
      token: refreshToken,
      client_id: CLIENT_ID,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    };

    try {
      await axios.post(COGNITO_LOGOUT_URL, new URLSearchParams(tokenData), { headers });
      setAccessToken(null);
      setRefreshToken(null);
      history.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = () => {
    const authorizationUrl = `${AUTHORIZE_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          <div>Access Token: {accessToken}</div>
        </div>
      )}
    </div>
  );
};

export default Auth;
