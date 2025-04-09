import React from 'react'; 
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router } from 'react-router-dom';
import App from "./App";
import { AccountProvider } from './contexts/AccountContext';
import { getConfig } from "./config";
import history from "./utils/history";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Função de callback para redirecionamento após login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Configuração do Auth0
const config = getConfig();

const providerConfig = {
  domain: config.domain, 
  clientId: config.clientId, 
  onRedirectCallback, 
  authorizationParams: {
    redirect_uri: window.location.origin, 
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider {...providerConfig}>
    <AccountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AccountProvider>
  </Auth0Provider>
); 