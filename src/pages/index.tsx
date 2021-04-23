import { GetStaticProps } from 'next';
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import {convertDurationToTimeString} from '../utils/convertDurationToTimeString';

import styles from '.home.module.scss';


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



//Render aqui
export default function Home(props, HomeProps) {
  return (
    <div className= {styles.homePage}>
     <section className= {styles.latestEpisodes}>
       <h2>Últimos lançamentos</h2>

       <ul>
         
       </ul>

     </section>

     <section classNmae = {styles.allEpisodes}>

     </section>
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

const latestEpisodes = episodes.slice(0, 2);
const allEpisodes = episodes.slice(2, episodes.length) 


  return {
    props: {
      episodes,

    },
    revalidate: 60 * 60 * 8
  }

}
