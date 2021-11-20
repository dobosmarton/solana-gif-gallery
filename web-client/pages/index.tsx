import type { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../src/hooks/useWallet';
import { ConnectWallet } from '../src/components/buttons/connectWallet';
import { Footer } from '../src/components/footer/footer';

const Home: NextPage = () => {
  const { walletAddress, gifList, connectWallet } = useWallet();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center pt-20">
          <div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold my-4">🖼 Awesome GIF Portal</p>
              <p className="sub-text my-4">View your GIF collection in the metaverse ✨</p>
              {!walletAddress && <ConnectWallet onClick={connectWallet} />}

              {walletAddress && (
                <>
                  <form
                    className="my-12 sm:flex sm:items-center"
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}>
                    <div className="w-full sm:max-w-xs">
                      <label htmlFor="link" className="sr-only">
                        Gif link
                      </label>
                      <input
                        name="link"
                        id="link"
                        className="w-64 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter gif link!"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Submit
                    </button>
                  </form>
                  <div className="grid grid-cols-3 gap-2 justify-center">
                    {gifList.map((gif) => (
                      <div className="flex flex-col justify-self-center self-center" key={gif}>
                        <img src={gif} alt={gif} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;