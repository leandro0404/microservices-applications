// src/components/LogoutButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';  // Importando o Button do Material UI

const clearAllAccountCaches = () => {
  try {
    // Limpa o cache unificado
    localStorage.removeItem('account_data');
    
    // Limpa os tokens globais
    window.appProfileToken = null;
    window.appPreferenceToken = null;
    
    console.log('Cache de conta foi limpo');
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
  }
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    const productionUrl = 'https://d13o1rfshhax5u.cloudfront.net/';  // URL de produção
    
    // Limpa o cache antes de fazer logout
    clearAllAccountCaches();
    
    logout({ returnTo: productionUrl }); // Redireciona para o domínio de produção após o logout
  };

  return (
    <Button 
      variant="outlined"   // Estilo de botão com borda
      color="inherit"       // Cor do texto do botão
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
