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
    playList: (list: Episode[], index: number) => void;
    tooglePlay : () => void;
    setPlayingState : (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
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

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true)
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function playNext(){
    if (currentEpisodeIndex < episodeList.length){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(){
    if (currentEpisodeIndex > 0){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return(
    <playerContext.Provider value={{
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        tooglePlay, 
        play, 
        setPlayingState,
        playList,
        playNext,
        playPrevious
    }}>
        {children}
    </playerContext.Provider>
  )
} 
