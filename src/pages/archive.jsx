import Head from 'next/head';
import Header from '~/components/common/Header';
import Archive from '~/components/Archive';
import Footer from '~/components/common/Footer';
import { useRouter } from 'next/router';

const ArchivePage = ({ data, dataMatches }) => {
  const { seoTitle, seoDescription, seoImage } = { ...data.entity.meta };

  const router = useRouter();
  const seoUrl = `${process.env.NEXT_PUBLIC_BASEURL}${router.asPath}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASEURL}${seoImage?.url}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_BASEURL}${seoImage?.url}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Header data={data} />
        <main>
          <Archive data={dataMatches}></Archive>
        </main>
        <Footer data={data} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchData: {
        NOT: {
          ended_at: null,
        },
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          lte: new Date().toISOString(),
        },
        sportId: undefined,
      },
      page: 1,
      count: 200,
    }),
  };
  const responseMatches = await fetch(`${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesUnauthorised`, requestOptions);
  const responseMatchesData = await responseMatches.json();
  const dataMatches = responseMatchesData.message;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/archive-page`);
  const data = await response.json();
  return { props: { data, dataMatches } };
}

export default ArchivePage;
