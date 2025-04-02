import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';
import { useAccount } from '../contexts/AccountContext';

const useEditProfile = (profileId, onProfileUpdated) => {
  const { account } = useAccount();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (profileId && account?.token) {
        setLoading(true);
        try {
          console.log(profileId);
          const data = await profileService.fetchProfileById(profileId, account.token);
          setProfile(data);
          setFormData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [profileId, account?.token]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    if (name === 'avatarUrl') {
      setFormData(prev => ({
        ...prev,
        avatar: {
          ...prev.avatar,
          url: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await profileService.updateProfile(profileId, formData, account.token);
      setProfile(updatedProfile);
      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }
      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, handleSave, handleProfileChange, formData };
};

export default useEditProfile;
