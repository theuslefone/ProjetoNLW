import { GetStaticProps } from 'next';
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {convertDurationToTimeString} from '../utils/convertDurationToTimeString';
import { api } from '../services/api';

type episode = {
  id:string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration : number,
  durationAsString: string,
  description : string,
  url: string
}
type HomeProps = {
  episodes: episode[];
}

export default function Home(props, HomeProps) {
  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

// Chamar API
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      order: 'desc',
    }
  });

  // Formatar dados da API

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration : Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description : episode.description,
      url: episode.file.url,

    }
  })


  return {
    props: {
      episodes,

    },
    revalidate: 60 * 60 * 8
  }

}
