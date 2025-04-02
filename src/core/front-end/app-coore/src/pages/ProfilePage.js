// src/pages/ProfilePage.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAccount } from '../contexts/AccountContext'; // Importando useAccount
import ListProfiles from 'app_profile/ListProfiles'; // Importando o componente ListProfiles

const ProfilePage = () => {
  // Pegando os dados do contexto
  const { account } = useAccount();

  // Verificando se temos os dados necessários
  if (!account?.token || !account?.id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Informações da conta não disponíveis.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <ListProfiles token={account.token} accountId={account.id} />
    </Box>
  );
};

export default ProfilePage;
