import { useState, useEffect, useCallback } from 'react';
import { preferenceService } from '../services/preferenceService';
import { DEFAULT_PREFERENCES } from '../constants/preferences';
import { useAccount } from '../contexts/AccountContext';

export const usePreferences = () => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { account } = useAccount();

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!account?.token) {
        throw new Error('Token não disponível');
      }

      const data = await preferenceService.fetchPreferences(account.token);
      setPreferences(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar preferências:', err);
    } finally {
      setLoading(false);
    }
  }, [account?.token]);

  const savePreferences = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);

      if (!account?.token) {
        throw new Error('Token não disponível');
      }

      await preferenceService.savePreferences(preferences, account.token);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao salvar preferências:', err);
    } finally {
      setSaving(false);
    }
  }, [preferences, account?.token]);

  const updatePreference = useCallback((field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (account?.token) {
      fetchPreferences();
    }
  }, [fetchPreferences, account?.token]);

  return {
    preferences,
    loading,
    saving,
    error,
    success,
    savePreferences,
    updatePreference,
    setSuccess,
  };
};
