import { useEffect, useState } from 'react';
import { createAccount as createSolanaAccount, getAccount as getSolanaAccount } from '../services/solana';

export enum ACCOUNT_ERROR {
  NOT_CREATED = 'NOT_CREATED',
}

type GifItem = {
  gifLink: string;
};

type UseWallettHook = (walletAddress: string | null) => {
  notExistingAccount: boolean;
  createGifAccount: () => Promise<string | null>;
  gifList: GifItem[];
};

export const useAccount: UseWallettHook = (walletAddress) => {
  const [gifList, setGifList] = useState<GifItem[]>([]);
  const [accountError, setAccountError] = useState<ACCOUNT_ERROR | null>(null);

  const getGifList = async () => {
    try {
      const account = await getSolanaAccount();

      console.log('Got the account', account);
      setGifList(account.gifList);
      setAccountError(null);
    } catch (error) {
      console.log('Error in getGifList: ', error);
      setGifList([]);
      setAccountError(ACCOUNT_ERROR.NOT_CREATED);
    }
  };

  const createGifAccount = async (): Promise<string | null> => {
    try {
      const account = await createSolanaAccount();
      setAccountError(null);
      return account;
    } catch (error) {
      console.log('Error in getGifList: ', error);
      setAccountError(ACCOUNT_ERROR.NOT_CREATED);
      return null;
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      getGifList();
    }
  }, [walletAddress]);

  return {
    notExistingAccount: accountError === ACCOUNT_ERROR.NOT_CREATED,
    createGifAccount,
    gifList,
  };
};
