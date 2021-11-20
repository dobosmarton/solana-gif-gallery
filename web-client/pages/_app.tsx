import type { AppProps } from 'next/app';
import idl from '../idl.json';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
