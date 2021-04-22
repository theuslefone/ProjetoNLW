import { GetStaticProps } from 'next';
import { api } from '../services/api';

type episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
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


  return {
    props: {
      episodes: data,

    },
    revalidate: 60 * 60 * 8
  }

}
