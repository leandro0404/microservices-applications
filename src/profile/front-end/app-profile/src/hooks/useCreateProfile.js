import { useState } from 'react';
import profileService from '../services/profileService';
import { useAccount } from '../contexts/AccountContext';

const useCreateProfile = (onProfileCreated) => {
  const { account } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    biography: '',
    avatar: {
      url: '/default-avatar.png'
    },
    helm: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'avatarUrl') {
      setProfileData(prev => ({
        ...prev,
        avatar: {
          ...prev.avatar,
          url: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Preparar os dados do perfil, garantindo que helm seja 'DEFAULT' se vazio
      const dataToSubmit = {
        name: profileData.name,
        biography: profileData.biography || '',
        avatar: profileData.avatar,
        helm: profileData.helm?.trim() || 'DEFAULT'
      };

      console.log('Dados sendo enviados para a API:', dataToSubmit);
      const newProfile = await profileService.createProfile(account.id, dataToSubmit, account.token);
      if (onProfileCreated) {
        onProfileCreated(newProfile);
      }
      return newProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profileData, loading, error, handleChange, handleSubmit };
};

export default useCreateProfile;
