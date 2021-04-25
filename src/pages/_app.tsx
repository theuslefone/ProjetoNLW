import { useState } from 'react';

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import Player from '../components/player'
import Header from "../components/Header";
import { playerContext } from '../context/playerContext';


function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <playerContext.Provider value={{episodeList, currentEpisodeIndex, isPlaying, play}}>
      <div className={styles.appWrapper}>
      <main><Header />
      <Component {...pageProps} />
      </main>
      <Player />
      </div>
    </playerContext.Provider>
    
  );
}

export default MyApp
