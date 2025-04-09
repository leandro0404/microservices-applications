import { useState, useCallback, useEffect } from 'react';
import { personService } from '../services/personService';
import useAuthAndAccount from './useAuthAndAccount';

export const usePerson = () => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { account } = useAuthAndAccount();

  const fetchPerson = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await personService.getPerson(account.token);
      setPerson(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching person:', err);
    } finally {
      setLoading(false);
    }
  }, [account?.token]);

  const updatePerson = useCallback(async (updatedPerson) => {
    try {
      setLoading(true);
      setError(null);
      const data = await personService.updatePerson(updatedPerson, account.token);
      setPerson(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error updating person:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [account?.token]);

  useEffect(() => {
    if (account?.token) {
      fetchPerson();
    }
  }, [fetchPerson, account?.token]);

  return {
    person,
    loading,
    error,
    fetchPerson,
    updatePerson
  };
}; 