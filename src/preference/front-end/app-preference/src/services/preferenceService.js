import axios from 'axios';
import { DEFAULT_PREFERENCES } from '../constants/preferences';

const API_URL = 'https://gfm3nsb970.execute-api.us-east-1.amazonaws.com/Prod/preference';

class PreferenceService {
  async fetchPreferences(idToken) {
    try {
      const { data } = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return {
        locale: data.locale || DEFAULT_PREFERENCES.locale,
        timezone: data.timezone || DEFAULT_PREFERENCES.timezone,
      };
    } catch (error) {
      console.error('Erro ao buscar preferências:', error);
      throw new Error('Não foi possível carregar as preferências');
    }
  }

  async savePreferences(preferences, idToken) {
    try {
      await axios.put(API_URL, preferences, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      throw new Error('Não foi possível salvar as preferências');
    }
  }
}

export const preferenceService = new PreferenceService();
