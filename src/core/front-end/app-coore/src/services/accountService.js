// src/services/accountService.js

import axios from 'axios';

// URL da API para buscar dados da conta
const API_URL = 'https://wfp9v2bl9e.execute-api.us-east-1.amazonaws.com/Prod/account';

/**
 * Função para buscar os dados da conta utilizando o id_token para autenticação.
 * @param {string} idToken O id_token obtido após o login do usuário.
 * @returns {Promise<Object>} Os dados da conta retornados pela API.
 * @throws {Error} Lança um erro se a requisição falhar.
 */
const fetchAccountData = async (idToken) => {
  try {
    console.log('accountService - Iniciando fetchAccountData');
    console.log('accountService - Token recebido:', idToken ? 'Presente' : 'Ausente');
    console.log('accountService - Token global:', window.appProfileToken ? 'Presente' : 'Ausente');

    // Usa o token global se disponível, caso contrário usa o token passado
    const token = window.appProfileToken || idToken;
    
    if (!token) {
      console.error('accountService - Nenhum token disponível');
      throw new Error('Token não disponível');
    }

    console.log('accountService - Fazendo requisição para API com token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('accountService - Resposta da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('accountService - Erro ao buscar dados da conta:', error);

    if (error.response && error.response.status === 401) {
      console.error('accountService - Erro de autenticação');
      throw new Error('Autenticação falhou. O token pode estar inválido.');
    }

    throw new Error('Erro ao buscar dados da conta');
  }
};

export default { fetchAccountData };
