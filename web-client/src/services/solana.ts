import { Connection, PublicKey, clusterApiUrl, Commitment } from '@solana/web3.js';
import { AccountClient, Idl, IdlTypes, Program, Provider, web3 } from '@project-serum/anchor';

import idl from '../../idl.json';
import { TypeDef } from '@project-serum/anchor/dist/cjs/program/namespace/types';
import { IdlTypeDef } from '@project-serum/anchor/dist/cjs/idl';

type Opts = {
  preflightCommitment: Commitment;
};

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const baseAccount = Keypair.generate();

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts: Opts = {
  preflightCommitment: 'processed',
};

export type ExtendedWindow = Window & typeof globalThis & { solana: any };

const getProvider = (): Provider => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, (window as ExtendedWindow).solana, {
    commitment: opts.preflightCommitment,
  });
  return provider;
};

const getProgram = (customProvider?: Provider) => {
  const provider = customProvider || getProvider();
  return new Program(idl as Idl, programID, provider);
};

export const createAccount = async (): Promise<string | null> => {
  try {
    const provider = getProvider();
    const program = getProgram(provider);

    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log('Created a new BaseAccount w/ address:', baseAccount.publicKey.toString());
    return baseAccount.publicKey.toString();
  } catch (error) {
    console.log('Error creating BaseAccount account:', error);
    return null;
  }
};

export const getAccount = async (): Promise<TypeDef<IdlTypeDef, IdlTypes<Idl>>> => {
  const program = getProgram();
  return program.account.baseAccount.fetch(baseAccount.publicKey);
};

export const getOrCreateAccount = async (): Promise<TypeDef<IdlTypeDef, IdlTypes<Idl>>> => {
  const program = getProgram();
  const account = await program.account.baseAccount.fetchNullable(baseAccount.publicKey);

  if (account) {
    return account;
  }

  // If the account dosn't exist create it
  await createAccount();

  return program.account.baseAccount.fetch(baseAccount.publicKey);
};
