import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import App from './App'
import theme from './theme';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
)