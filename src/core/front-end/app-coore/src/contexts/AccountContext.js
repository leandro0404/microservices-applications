import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import accountService from '../services/accountService';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (isAuthenticated && !account) { // 🔥 Garante que só chama a API se não tiver os dados
        try {
          const claims = await getIdTokenClaims();
          const idToken = claims.__raw;
          const accountData = await accountService.fetchAccountData(idToken);

          // 🔥 Agora, o estado `account` inclui o `idToken`
          setAccount({
            ...accountData,
            token: idToken, // ✅ Inclui o idToken no objeto account
          });
        } catch (error) {
          console.error('Erro ao buscar dados da conta:', error);
        }
      }
    };

    fetchAccountData();
  }, [isAuthenticated, getIdTokenClaims, account]); // 🔥 Adicionado `account` como dependência

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
