import Head from 'next/head';
import Header from '~/components/common/Header';
import LiveMatch from '~/components/LiveMatch';
import Footer from '~/components/common/Footer';
import { useRouter } from 'next/router';

const MatchPage = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Прямой эфир</title>
        <meta name="title" content="Прямой эфир" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Header data={data} />
        <main>
          <LiveMatch key={router.asPath} />
        </main>
        <Footer data={data} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/header-footer`);
  const data = await response.json();
  return { props: { data } };
}

export default MatchPage;
