import { createContext, useState, ReactNode } from 'react';
import { useContext } from 'react';

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
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    tooglePlay : () => void;
    toogleLoop : () => void;
    toogleShuffle : () => void;
    setPlayingState : (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasPrevious: boolean,
    hasNext: boolean
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const playerContext = createContext({} as playerContextData);
export function PlayerContextProvider({children}: PlayerContextProviderProps){

const [episodeList, setEpisodeList] = useState([]);
const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [isLooping, setIsLooping] = useState(false);
const [isShuffling, setIsShuffling] = useState(false);

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
  
  function toogleLoop(){
    setIsLooping(!isLooping)
  }

  function toogleShuffle(){
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0

  function playNext(){
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }else if (hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(){
    if (hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return(
    <playerContext.Provider value={{
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        isLooping, 
        isShuffling,
        tooglePlay,
        toogleLoop,
        toogleShuffle, 
        play, 
        setPlayingState,
        playList,
        playNext,  
        hasNext,
        playPrevious,
        hasPrevious,
        clearPlayerState
    }}>
        {children}
    </playerContext.Provider>
  )
} 

export const usePlayer = () =>{
  return useContext(playerContext);
}
