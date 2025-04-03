import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthAndAccount from './hooks/useAuthAndAccount';
import EditPreferences from './Components/EditPreferences';

const App = () => {
  const { isAuthenticated, loginWithRedirect,  isLoading } = useAuth0();
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
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Box sx={{ padding: 2 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <EditPreferences 
                  onPreferenceUpdated={() => {}} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Suspense>
    </Router>
  );
}

export default App;

