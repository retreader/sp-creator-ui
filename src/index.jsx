import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const darkGothicTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8e44ad',  // Gothic purple
    },
    secondary: {
      main: '#c0392b',  // Pop red
    },
  },
  // Add more customizations if needed
}); 

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <ThemeProvider theme={darkGothicTheme}>
		<App />
    </ThemeProvider>
	</React.StrictMode>
)