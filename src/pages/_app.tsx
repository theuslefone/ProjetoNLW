
import Player from '../components/player';
import Header from "../components/Header";

import styles from '../styles/app.module.scss';
import '../styles/global.scss';

import {PlayerContextProvider} from './../context/playerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
        <div className={styles.appWrapper}>

          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </div>
    </PlayerContextProvider>
  );
}

export default MyApp
