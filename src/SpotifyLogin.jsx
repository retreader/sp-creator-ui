// SpotifyLogin.jsx

import React, { useState, useEffect } from 'react';

import apiService from './apiService';

function SpotifyLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    fetch('/is-logged-in')
      .then(response => response.json())
      .then(data => setIsLoggedIn(data.isLoggedIn));
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <span>User is logged in</span>
      ) : (
        <button onClick={apiService.handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
}

export default SpotifyLogin;
