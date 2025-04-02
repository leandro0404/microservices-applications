// hooks/useAuthAndAccount.js
import { useAuth0 } from "@auth0/auth0-react";
import { useAccount } from "../contexts/AccountContext"; // 🔥 Importar o contexto

const useAuthAndAccount = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const { account } = useAccount(); // 🔥 Consumir o contexto em vez de chamar o serviço diretamente

  return { isAuthenticated, loginWithRedirect, user, isLoading, account };
};

export default useAuthAndAccount;
