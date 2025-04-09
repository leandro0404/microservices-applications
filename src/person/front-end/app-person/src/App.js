import React, { Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthAndAccount from './hooks/useAuthAndAccount';
import PersonWizard from './Components/PersonWizard';
import SuccessPage from './Components/SuccessPage';

const App = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const { account } = useAuthAndAccount();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Redirecionando para o login...</Typography>
      </Box>
    );
  }

  if (!account?.id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Informações da conta não disponíveis.</Typography>
      </Box>
    );
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/cadastro-pessoa" element={<PersonWizard />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/" element={<Navigate to="/cadastro-pessoa" replace />} />
        </Routes>
      </Box>
    </Suspense>
  );
};

export default App;

