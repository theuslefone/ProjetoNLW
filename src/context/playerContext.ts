import { createContext } from 'react';

type Episode = {
    title: string,
    thumbnail: string,
    members: string,
    duration: number,
    url: string
};

type playerContextData = {
    episodeList : Episode[],
    currentEpisodeIndex: number
    play: (episode: Episode) => void;
};

export const playerContext = createContext({} as playerContextData);
