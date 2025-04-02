import { useAccount } from '../contexts/AccountContext';

export const useAuthToken = () => {
  const { account } = useAccount();
  return account?.token;
}; 