import axios from 'axios';

const API_URL = 'https://wfp9v2bl9e.execute-api.us-east-1.amazonaws.com/Prod/account';

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