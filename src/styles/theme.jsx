import {
  createTheme
} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EE',
    },
    secondary: {
      light: '#eee7dd',
      main: '#78909C',
    },
    white: {
      main: '#fff',
    }
  },
});

export default theme;