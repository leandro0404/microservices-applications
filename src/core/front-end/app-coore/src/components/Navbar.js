import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import LogoutButton from './LogoutButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileNavBar = React.lazy(() => import('app_profile/ProfileNavBar'));

const Navbar = ({ organizationName }) => {
  const { account } = useAccount();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!account?.token || !account?.id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Informações da conta não disponíveis.</Typography>
      </Box>
    );
  }

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isHomeSelected = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 3, height: 80, width: '100%' }}>
        <Toolbar sx={{ 
          height: '100%',
          width: '100%',
          padding: { xs: 1, sm: 2 },
          display: 'flex',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ 
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {organizationName}
            </Typography>
          </Box>

          {/* Menus da Sidebar replicados na Navbar */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' }, 
            gap: 2, 
            marginRight: 2,
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <Button 
              color={isHomeSelected ? 'primary' : 'inherit'}
              variant={isHomeSelected ? 'contained' : 'text'}
              onClick={() => handleNavigation('/home')}
              size="small"
            >
              Home
            </Button>
            <Button 
              color={location.pathname === '/profile' ? 'primary' : 'inherit'}
              variant={location.pathname === '/profile' ? 'contained' : 'text'}
              onClick={() => handleNavigation('/profile')}
              size="small"
            >
              Profile
            </Button>
            <Button 
              color={location.pathname === '/preferences' ? 'primary' : 'inherit'}
              variant={location.pathname === '/preferences' ? 'contained' : 'text'}
              onClick={() => handleNavigation('/preferences')}
              size="small"
            >
              Preferences
            </Button>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            padding: { xs: 0, sm: 2 },
            flexShrink: 0,
            minWidth: 'fit-content',
          }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LogoutButton />
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              overflow: 'hidden',
              minWidth: 'fit-content',
            }}>
              <ProfileNavBar accountId={account.id} token={account.token} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navbar;
