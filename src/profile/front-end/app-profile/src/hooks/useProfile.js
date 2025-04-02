import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';
import { useAccount } from '../contexts/AccountContext';

const useProfile = () => {
  const { account } = useAccount();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // Função para buscar o perfil
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await profileService.fetchProfileACCountDefault(account.id, account.token);
      setProfile(profileData);
    } catch (error) {
      console.error('Erro ao buscar o perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para recarregar o perfil
  const refreshProfile = useCallback(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (account?.id && account?.token) {
      fetchProfile();
    }
  }, [account?.id, account?.token]);

  // Funções para manipular o popover
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return {
    profile,
    loading,
    anchorEl,
    handleClick,
    handleClose,
    refreshProfile,
  };
};

export default useProfile;
