// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark', // This will set the dark mode for Material-UI components
    primary: {
      main: '#b71c1c', // A deep, gothic red
    },
    secondary: {
      main: '#311b92', // A dark purple
    },
    background: {
      default: '#121212', // A dark gray background
      paper: '#1e1e1e', // Slightly lighter for contrast
    },
  },
  typography: {
    fontFamily: "'Cinzel', serif", // A gothic-like font
    h4: {
      fontWeight: 600,
      marginBottom: '20px',
    },
  },
});

export default theme;
