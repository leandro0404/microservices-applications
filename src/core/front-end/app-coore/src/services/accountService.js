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
    // Fazendo a requisição para a API com o token de autenticação
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // Retorna os dados da conta
    return response.data;
  } catch (error) {
    // Logando o erro
    console.error('Erro ao buscar dados da conta:', error);

    // Se a resposta for uma falha de autenticação (401), podemos lançar um erro específico
    if (error.response && error.response.status === 401) {
      throw new Error('Autenticação falhou. O token pode estar inválido.');
    }

    // Caso contrário, lançar o erro genérico
    throw new Error('Erro ao buscar dados da conta');
  }
};

export default { fetchAccountData };
