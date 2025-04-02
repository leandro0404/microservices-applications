import React from 'react';
import { Button, CircularProgress, TextField, Avatar, Grid, Box, Typography } from '@mui/material';
import useCreateProfile from '../hooks/useCreateProfile';
import { AccountProvider } from '../contexts/AccountContext';

const CreateProfileContent = ({ onProfileCreated }) => {
  const { profileData, loading, handleChange: originalHandleChange, handleSubmit: originalHandleSubmit } = useCreateProfile((createdProfile) => {
    // Chama o callback original
    if (onProfileCreated) {
      onProfileCreated(createdProfile);
    }

    // Dispara o evento de atualização
    const event = new CustomEvent('profile-updated', {
      detail: {
        profileId: createdProfile.id,
        timestamp: new Date().getTime()
      }
    });
    console.log('🚀 Disparando evento profile-updated após criação:', {
      profileId: createdProfile.id,
      timestamp: new Date().getTime()
    });
    window.dispatchEvent(event);
  });

  // Wrapper para o handleChange que permite apagar todo o texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    originalHandleChange({
      target: {
        name,
        value: value
      }
    });
  };

  // Wrapper para o handleSubmit que garante o valor DEFAULT no helm apenas se estiver vazio
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfileData = {
      ...profileData,
      helm: profileData.helm?.trim() || 'DEFAULT'
    };
    console.log('Enviando perfil com dados:', updatedProfileData);
    originalHandleSubmit(e, updatedProfileData);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="create-profile-container" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Criar Novo Perfil
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar 
              src={profileData?.avatar?.url || ''}
              alt="Avatar"
              sx={{ width: 120, height: 120 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              name="name"
              value={profileData?.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Biografia"
              name="biography"
              value={profileData?.biography || ''}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="URL do Avatar"
              name="avatarUrl"
              value={profileData?.avatar?.url || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Helm"
              name="helm"
              value={profileData?.helm || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              helperText="Se não preenchido, será definido como 'DEFAULT'"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Criar Perfil'}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

// Wrapper component that provides the AccountContext
const CreateProfile = ({ token, ...props }) => {
  return (
    <AccountProvider externalToken={token}>
      <CreateProfileContent {...props} />
    </AccountProvider>
  );
};

export default CreateProfile;
