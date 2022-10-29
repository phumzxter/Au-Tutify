import { red } from '@mui/material/colors';
import { createTheme, createColor } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    blue: {
      main: '#3498DB',
    },
  },
});

export default theme;
