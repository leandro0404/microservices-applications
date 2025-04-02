// src/services/profileService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_PROFILE_BASE_URL || 'https://fs5g3oo51b.execute-api.us-east-1.amazonaws.com/Prod';

const profileService = {
  async fetchProfiles(accountId, token) {
    try {
      const response = await axios.get(`${API_URL}/account/${accountId}/profiles`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
      throw error;
    }
  },

  async fetchProfileById(profileId, token) {
    try {
      const response = await axios.get(`${API_URL}/account/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  async createProfile(accountId, profileData, token) {
    try {
      const response = await axios.post(`${API_URL}/account/${accountId}/profile`, {
        ...profileData,
        accountId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      throw error;
    }
  },

  async updateProfile(profileId, profileData, token) {
    try {
      const response = await axios.put(`${API_URL}/account/profile/${profileId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  async deleteProfile(profileId, token) {
    try {
      await axios.delete(`${API_URL}/account/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Erro ao deletar perfil:', error);
      throw error;
    }
  },

  async fetchProfileACCountDefault(accountId, token) {
    try {
      const { data } = await axios.get(`${API_URL}/account/${accountId}/profile/DEFAULT`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      throw new Error('Erro ao carregar perfil.');
    }
  }
};

export default profileService;
