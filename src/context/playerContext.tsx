import { createContext, useState, ReactNode } from 'react';

type Episode = {
    title: string,
    thumbnail: string,
    members: string,
    duration: number,
    url: string
};

type playerContextData = {
    episodeList : Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    tooglePlay : () => void;
    setPlayingState : (state: boolean) => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const playerContext = createContext({} as playerContextData);


export function PlayerContextProvider({children}: PlayerContextProviderProps){

const [episodeList, setEpisodeList] = useState([]);
const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }
  return(
    <playerContext.Provider value={{
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        tooglePlay, 
        play, 
        setPlayingState 
    }}>
        {children}
    </playerContext.Provider>
  )
} 
