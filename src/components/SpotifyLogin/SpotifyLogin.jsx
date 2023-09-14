import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/actions/actions';
import { Button } from '@mui/material';
import apiService from '../../services/apiService.jsx';

function SpotifyLoginButton() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    React.useEffect(() => {
        async function checkLoginStatus() {
            const loggedIn = await apiService.isLoggedIn();
            dispatch(setIsLoggedIn(loggedIn));
        }

        checkLoginStatus();
    }, [dispatch]);

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
