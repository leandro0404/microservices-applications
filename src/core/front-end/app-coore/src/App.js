import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthAndAccount from './hooks/useAuthAndAccount';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import HomePage from "./pages/HomePage";
import PreferencePage from "./pages/PreferencePage";
import ProfilePage from "./pages/ProfilePage";
import PersonPage from "./pages/PersonPage";
import theme from './theme/index'

const App = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
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
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<CircularProgress />}>
          <Navbar organizationName={`Bem-vindo!`} />
          <Box>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/preferences" element={<PreferencePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/person" element={<PersonPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer/>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
