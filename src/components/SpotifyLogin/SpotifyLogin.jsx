import React from 'react';
import {Button} from '@mui/material';
import apiService from '../../services/apiService.jsx'; // Assuming you have this service

function SpotifyLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function checkLoginStatus() {
      const loggedIn = await apiService.isLoggedIn();
      setIsLoggedIn(loggedIn);
    }

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    apiService.handleLogin();
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleLogin} 
      disabled={isLoggedIn}
    >
      {isLoggedIn ? 'Logged in to Spotify' : 'Login to Spotify'}
    </Button>
  );
}

export default SpotifyLoginButton;
