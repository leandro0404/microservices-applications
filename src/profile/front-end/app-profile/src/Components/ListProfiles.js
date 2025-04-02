// src/components/ListProfiles.js
import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
import ProfileCard from './ProfileCard';
import EditProfile from './EditProfile';
import CreateProfile from './CreateProfile';
import useListProfiles from '../hooks/useListProfiles';
import { eventService, EVENT_TYPES } from '../services/eventService';
import profileService from '../services/profileService';
import { useAccount } from '../contexts/AccountContext';
import { AccountProvider } from '../contexts/AccountContext';

const ListProfilesContent = () => {
  const { account } = useAccount();
  const {
    profiles,
    loading,
    error,
    selectedProfileId,
    isCreating,
    setSelectedProfileId,
    setIsCreating,
    handleProfileUpdated,
    handleProfileCreated,
    handleProfileDeleted,
  } = useListProfiles();

  useEffect(() => {
    console.log('ListProfilesContent - Account atualizado:', account ? 'Presente' : 'Ausente');
    console.log('ListProfilesContent - Token atualizado:', account?.token ? 'Presente' : 'Ausente');
  }, [account]);

  const handleProfileUpdate = (profile) => {
    if (!account?.id) {
      console.error('ListProfilesContent - Account ID não disponível');
      return;
    }

    // Emit event when profile is updated
    eventService.emit(EVENT_TYPES.PROFILE_UPDATED, {
      profileId: profile.id,
      accountId: account.id,
      timestamp: new Date().toISOString()
    });
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      if (!account?.token) {
        console.error('ListProfilesContent - Token não disponível para deletar perfil');
        return;
      }

      await profileService.deleteProfile(profileId, account.token);
      handleProfileDeleted(profileId);
      
      // Emit event when profile is deleted
      const event = new CustomEvent('profile-updated', {
        detail: {
          profileId: profileId,
          timestamp: new Date().getTime()
        }
      });
      console.log('🚀 Disparando evento profile-updated após deleção:', {
        profileId: profileId,
        timestamp: new Date().getTime()
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Erro ao deletar perfil:', error);
    }
  };

  if (selectedProfileId) {
    return (
      <EditProfile
        profileId={selectedProfileId}
        onProfileUpdated={(profile) => {
          handleProfileUpdated(profile);
          handleProfileUpdate(profile);
        }}
      />
    );
  }

  if (isCreating) {
    return (
      <CreateProfile
        onProfileCreated={(profile) => {
          handleProfileCreated(profile);
          handleProfileUpdate(profile);
        }}
      />
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {account?.id && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreating(true)}
          sx={{ marginBottom: 3 }}
        >
          Criar Novo Perfil
        </Button>
      )}

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : profiles.length === 0 ? (
        <Typography variant="body1" color="textSecondary">Nenhum perfil encontrado.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2 }}>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onEdit={() => setSelectedProfileId(profile.id)}
              onDelete={handleDeleteProfile}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// Wrapper component that provides the AccountContext
const ListProfiles = ({ token }) => {
  console.log('ListProfiles - Token recebido:', token ? 'Presente' : 'Ausente');

  // Se já existe um token global, use-o
  const effectiveToken = token || window.appProfileToken;

  return (
    <AccountProvider externalToken={effectiveToken}>
      <ListProfilesContent />
    </AccountProvider>
  );
};

export default ListProfiles;
