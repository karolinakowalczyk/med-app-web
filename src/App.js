//import logo from './logo.svg';
//import './App.css';
import { ThemeProvider, Typography } from '@mui/material';
import theme from "./styles/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Typography variant="h2" component="div" color="primary.main">
          Hello
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;
