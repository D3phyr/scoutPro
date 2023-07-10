import Head from 'next/head';
import NotFoundPageComponent from '~/components/Page404';

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Страница не найдена</title>
        <meta name="title" content="Страница не найдена" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <NotFoundPageComponent />
      </div>
    </>
  );
};

export default Page404;
