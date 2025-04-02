import React, { useEffect } from 'react';
import { Avatar, Popover, Typography, CircularProgress, Box } from '@mui/material';
import useProfile from '../hooks/useProfile';
import { AccountProvider } from '../contexts/AccountContext';

const ProfileNavBarContent = () => {
  const { profile, loading, anchorEl, handleClick, handleClose, refreshProfile } = useProfile();

  useEffect(() => {
    console.log('🎯 ProfileNavBar montado, configurando listener para profile-updated');
    
    // Função que será chamada quando o evento profile-updated for disparado
    const handleProfileUpdate = (event) => {
      console.log('📥 Evento profile-updated recebido:', event.detail);
      console.log('🔄 Atualizando ProfileNavBar...');
      refreshProfile();
    };

    // Adiciona o listener do evento
    window.addEventListener('profile-updated', handleProfileUpdate);

    // Cleanup: remove o listener quando o componente for desmontado
    return () => {
      console.log('🧹 Removendo listener do profile-updated');
      window.removeEventListener('profile-updated', handleProfileUpdate);
    };
  }, [refreshProfile]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        alt={profile?.name || 'Usuário'}
        src={profile?.avatar?.url || '/default-avatar.png'}
        sx={{ width: 40, height: 40, cursor: 'pointer' }}
        onClick={handleClick} // Quando clicar, abre o Popover
        onMouseEnter={handleClick} // Quando passar o mouse, abre o Popover
      />

      {/* Popover exibindo as informações do perfil */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ padding: 2, maxWidth: '250px', width: '100%' }}>
          <Typography variant="h6">{profile?.name || 'Nome não disponível'}</Typography>
          <Typography variant="body2" color="textSecondary">
            {profile?.helm || 'Helm não disponível'}
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            {profile?.biography?.slice(0, 100) + '...'}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

// Wrapper component that provides the AccountContext
const ProfileNavBar = ({ token }) => {
  return (
    <AccountProvider externalToken={token}>
      <ProfileNavBarContent />
    </AccountProvider>
  );
};

export default ProfileNavBar;
