import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaGif } from '../target/types/solana_gif';

describe('solana-gif', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaGif as Program<SolanaGif>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
