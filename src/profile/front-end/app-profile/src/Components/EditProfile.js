import React from 'react';
import { Box, Typography, CircularProgress, Button, TextField, Avatar } from '@mui/material';
import useEditProfile from '../hooks/useEditProfile';
import { AccountProvider } from '../contexts/AccountContext';

const EditProfileContent = ({ profileId, onProfileUpdated }) => {
  const { profile, loading, handleSave, handleProfileChange, formData } = useEditProfile(profileId, onProfileUpdated);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" color="error">
        Erro ao carregar perfil.
      </Typography>
    );
  }

  const onSave = async () => {
    await handleSave();
    // Dispara um evento customizado quando o perfil é atualizado
    const event = new CustomEvent('profile-updated', {
      detail: {
        profileId,
        timestamp: new Date().getTime()
      }
    });
    console.log('🚀 Disparando evento profile-updated:', {
      profileId,
      timestamp: new Date().getTime()
    });
    window.dispatchEvent(event);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Editar Perfil: {formData.name || profile.name}
      </Typography>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Avatar
          alt={formData.name || profile.name}
          src={formData.avatar?.url || profile.avatar.url}
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name || ''}
          onChange={handleProfileChange}
        />
        
        <TextField
          label="Biografia"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          name="biography"
          value={formData.biography || ''}
          onChange={handleProfileChange}
        />
        
        <TextField
          label="URL do Avatar"
          variant="outlined"
          fullWidth
          margin="normal"
          name="avatarUrl"  
          value={formData.avatar?.url || ''} 
          onChange={handleProfileChange}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            sx={{ width: '200px' }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Wrapper component that provides the AccountContext
const EditProfile = ({ token, ...props }) => {
  return (
    <AccountProvider externalToken={token}>
      <EditProfileContent {...props} />
    </AccountProvider>
  );
};

export default EditProfile;
