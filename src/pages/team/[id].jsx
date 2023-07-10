import Head from 'next/head';
import Header from '~/components/common/Header';
import TeamStats from '~/components/TeamStats';
import Footer from '~/components/common/Footer';
import { useRouter } from 'next/router';

const TeamPage = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Статистика команды</title>
        <meta name="title" content="Статистика команды" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Header data={data} />
        <main>
          <TeamStats key={router.asPath} />
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

export default TeamPage;
