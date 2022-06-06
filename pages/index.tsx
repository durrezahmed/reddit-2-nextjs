import type { NextPage } from 'next';
import Head from 'next/head';
import PostBox from '../components/PostBox';
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries';
import Feed from './../components/Feed';
import { useQuery } from '@apollo/client';
import SubredditRow from './../components/SubredditRow';
import { Jelly } from '@uiball/loaders';

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subreddits: Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className='my-7 mx-auto max-w-5xl'>
      <Head>
        <title>Reddit 2.0 | Durrez Ahmed</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <PostBox />

      <div className='m-4 mt-2 grid grid-cols-6 gap-4 lg:m-0'>
        <div className='col-span-6 mt-2 lg:col-span-4'>
          <Feed />
        </div>

        <div className='sticky top-[180px] col-span-2 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>

          {data ? (
            <div>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow
                  key={subreddit.id}
                  topic={subreddit.topic}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className='flex w-full items-center justify-center p-10 text-xl'>
              <Jelly size={50} color='#FF4501' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
