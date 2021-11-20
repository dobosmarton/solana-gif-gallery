import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { assert } from 'chai';
import { SolanaGif } from '../target/types/solana_gif';

// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3;

describe('solana-gif', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaGif as Program<SolanaGif>;

  it('Is initialized!', async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log('Your transaction signature', tx);
  });

  it('should initialize the GIF counter', async () => {
    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();

    // Call start_stuff_off, pass it the params it needs!
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    // Fetch data from the account.
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    assert.strictEqual(account.totalGifs.toString(), '0', 'The initial gif count is not 0');
  });
});
