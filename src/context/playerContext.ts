import { createContext } from 'react';

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
};

export const playerContext = createContext({} as playerContextData);
