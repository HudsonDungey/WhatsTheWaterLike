'use client';
import { createContext, useState, useContext, ReactNode } from 'react';
import { AccountDetails } from '~/types/mainTypes';

interface AccountContextType {
  account: AccountDetails | null;
  setAccount: React.Dispatch<React.SetStateAction<AccountDetails | null>>;
  clearAccount: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccountContext = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<AccountDetails | null>(null);

  const clearAccount = () => setAccount(null);

  return (
    <AccountContext.Provider value={{ account, setAccount, clearAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

