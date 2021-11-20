import { web3 } from '@project-serum/anchor';
import kp from '../../keypair.json';

export const getKeyFromFile = () => {
  const arr = Object.values(kp._keypair.secretKey);
  const secret = new Uint8Array(arr);
  return web3.Keypair.fromSecretKey(secret);
};
