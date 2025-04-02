// src/hooks/useListProfiles.js
import { useState, useEffect } from 'react';
import profileService from '../services/profileService';
import { useAccount } from '../contexts/AccountContext';

const useListProfiles = () => {
  const { account } = useAccount();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Função para carregar os perfis
  useEffect(() => {
    if (account?.id && account?.token) {
      setLoading(true);
      profileService.fetchProfiles(account.id, account.token)
        .then((data) => {
          setProfiles(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [account?.id, account?.token]);

  const handleProfileUpdated = (updatedProfile) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setSelectedProfileId(null);
  };

  const handleProfileCreated = (newProfile) => {
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    setIsCreating(false);
  };

  const handleProfileDeleted = (profileId) => {
    setProfiles((prevProfiles) => prevProfiles.filter(profile => profile.id !== profileId));
  };

  return {
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
  };
};

export default useListProfiles;
