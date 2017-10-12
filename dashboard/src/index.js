import React from 'react';
import ReactDOM from 'react-dom';
import { blueGrey500, orange700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import routes from './infra/router'
import 'mdi/css/materialdesignicons.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    accent1Color: orange700
  },

});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    {routes}
  </MuiThemeProvider>,
  document.getElementById('root')
);