import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blueGrey from '@material-ui/core/colors/blueGrey';
import * as serviceWorker from './serviceWorker';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: {
      main: '#cfd8dc',
    },
    background: {
      default: '#eceff1',
    },
  },
  status: {
    danger: 'red',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
