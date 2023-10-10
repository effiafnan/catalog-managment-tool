import { GlobalContextProvider } from '../context/GlobalContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
