import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Usando HashRouter
import { AccountProvider } from './contexts/AccountContext'; // Importando o AccountProvider
import useAuthAndAccount from './hooks/useAuthAndAccount';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import HomePage from "./pages/HomePage";
import PreferencePage from "./pages/PreferencePage";
import ProfilePage from "./pages/ProfilePage";
import theme from './theme/index'


const App = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuthAndAccount();

  // Verificar se a autenticação ou os dados da conta estão carregando
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Redirecionar para o login se não estiver autenticado
  if (!isAuthenticated) {
    loginWithRedirect();
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Redirecionando para o login...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <AccountProvider>
      <Router>
        <Suspense fallback={<CircularProgress />}>
          <Navbar organizationName={`Bem-vindo, ${user?.name}!`} />
          <Box>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/preferences" element={<PreferencePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Rota comodín que redireciona para a Home quando a rota não for encontrada */}
              <Route path="*" element={<Navigate to="/#" replace />} />
            </Routes>
          </Box>
          <Footer/>
        </Suspense>
      </Router>
    </AccountProvider>
    </ThemeProvider>
  );
};

export default App;
