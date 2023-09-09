import {createTheme} from '@mui/material/styles';

export default createTheme({
    palette: {
        primary: {
            main: '#89ABE3',
            contrastText: '#fff', // This ensures text on the button is readable
        },
        secondary: {
            main: '#98DDCA',
        },
        background: {
            default: '#F2F2F2',
        },
    },
    typography: {
        fontFamily: '"Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #89ABE3 30%, #98DDCA 90%)',
                    borderRadius: '3px',
                    border: 0,
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgba(137, 171, 227, .3)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #98DDCA 30%, #89ABE3 90%)',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    margin: '2rem 0'
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    margin: '0rem 0'
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    margin: '0.2rem 0'
                },
            },
        },
    },
});
