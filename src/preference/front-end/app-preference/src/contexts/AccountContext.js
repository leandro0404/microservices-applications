import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import accountService from '../services/accountService';

const AccountContext = createContext();

const CACHE_KEY = 'account_data';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos em milissegundos

const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('AccountProvider - Cache limpo');
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
  }
};

const getCachedAccountData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;
    
    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao ler cache:', error);
    return null;
  }
};

const setCachedAccountData = (data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Erro ao salvar cache:', error);
  }
};

export const AccountProvider = ({ children, externalToken }) => {
  const auth0 = useAuth0();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousToken, setPreviousToken] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        let idToken;
        
        console.log('AccountProvider - Iniciando fetchAccountData');
        console.log('AccountProvider - externalToken:', externalToken);
        console.log('AccountProvider - auth0.isAuthenticated:', auth0.isAuthenticated);
        console.log('AccountProvider - Token global:', window.appPreferenceToken ? 'Presente' : 'Ausente');
        
        // Se já existe um token global e não foi fornecido um novo token, use o global
        if (!externalToken && window.appPreferenceToken) {
          idToken = window.appPreferenceToken;
          console.log('AccountProvider - Usando token global existente');
        } else if (externalToken) {
          // Se um token externo foi fornecido, use-o
          idToken = externalToken;
          console.log('AccountProvider - Usando externalToken fornecido');
        } else if (auth0.isAuthenticated) {
          // Caso contrário, tente usar o Auth0
          const claims = await auth0.getIdTokenClaims();
          idToken = claims.__raw;
          console.log('AccountProvider - Usando token do Auth0');
        } else {
          // Se nenhum token estiver disponível, não faça nada
          console.log('AccountProvider - Nenhum token disponível');
          setLoading(false);
          return;
        }

        // Verifica se o token mudou
        if (previousToken && previousToken !== idToken) {
          console.log('AccountProvider - Token mudou, limpando cache');
          clearCache();
        }

        console.log('AccountProvider - Token obtido:', idToken ? 'Presente' : 'Ausente');

        // Armazena o token globalmente
        window.appPreferenceToken = idToken;
        setPreviousToken(idToken);
        console.log('AccountProvider - Token armazenado globalmente');

        // Verifica se já existe dados em cache
        const cachedData = getCachedAccountData();
        if (cachedData) {
          console.log('AccountProvider - Usando dados do cache');
          setAccount({
            ...cachedData,
            token: idToken,
          });
          setLoading(false);
          return;
        }

        // Se não houver cache, busca da API
        const accountData = await accountService.fetchAccountData(idToken);
        console.log('AccountProvider - Dados da conta obtidos da API:', accountData);

        // Salva no cache
        setCachedAccountData(accountData);
        console.log('AccountProvider - Dados salvos no cache');

        setAccount({
          ...accountData,
          token: idToken,
        });
      } catch (error) {
        console.error('AccountProvider - Erro ao buscar dados da conta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [auth0.isAuthenticated, auth0.getIdTokenClaims, externalToken]);

  // Se estiver carregando, retorna null ou um loading spinner
  if (loading) {
    console.log('AccountProvider - Ainda carregando...');
    return null;
  }

  console.log('AccountProvider - Renderizando com account:', account ? 'Presente' : 'Ausente');
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount deve ser usado dentro de um AccountProvider");
  }
  return context;
}; 