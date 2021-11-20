This is the Solana program bootstrapped with [`Anchor`](https://github.com/project-serum/anchor)

## Getting Started

1. Create a local keypair

   ```bash
   solana-keygen new
   solana address
   ```

2. Set url to the localhost

   ```bash
   solana config set --url localhost
   solana config get
   ```

3. Install the package dependencies and run the tests

   ```bash
   yarn & anchor test
   ```

## Set up your environment for devnet

1. Switch to devnet

   ```bash
   solana config set --url devnet
   solana config get
   ```

2. Airdrop some SOL on the devnet

   ```bash
   solana airdrop 5
   solana balance
   ```

3. Changing some variables in the `Anchor.toml`

   - `[programs.localnet]` => `[programs.devnet]`

   - `cluster = "localnet"` => `cluster = "devnet"`

4. Get the program id

   ```bash
   anchor build
   solana address -k target/deploy/solana_gif-keypair.json
   ```

   Update Anchor.toml and lib.rs with new program id.
   Make sure Anchor.toml is on devnet.

5. Build and deploy

   ```bash
   anchor build
   anchor deploy
   ```
