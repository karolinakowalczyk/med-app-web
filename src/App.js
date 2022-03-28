//import logo from './logo.svg';
//import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import MainRoute from "./router/MainRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainRoute />
      </div>
    </ThemeProvider>
  );
}

export default App;
