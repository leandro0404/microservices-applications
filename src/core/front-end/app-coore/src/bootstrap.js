import React from 'react'; 
import { createRoot } from 'react-dom/client'; // Alterado para "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { AccountProvider } from './contexts/AccountContext'; // Importar o AccountProvider
import { getConfig } from "./config";
import history from "./utils/history";

// Função de callback para redirecionamento após login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Configuração do Auth0
const config = getConfig(); // Pode pegar as configurações do seu arquivo config

const providerConfig = {
  domain: config.domain, 
  clientId: config.clientId, 
  onRedirectCallback, 
  authorizationParams: {
    redirect_uri: window.location.origin, 
    ...(config.audience ? { audience: config.audience } : null),
  },
};

// Usando ReactDOM.createRoot para criar a raiz e renderizar
const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider {...providerConfig}>
    <AccountProvider> {/* 🔥 Envolvendo o App com o AccountProvider */}
      <App />
    </AccountProvider>
  </Auth0Provider>
);
