import { useAuth0 } from "@auth0/auth0-react";
import { useAccount } from "../contexts/AccountContext";

const useAuthAndAccount = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  const { account } = useAccount();

  return { isAuthenticated, loginWithRedirect, user, isLoading, account };
};

export default useAuthAndAccount; 