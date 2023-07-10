import Head from 'next/head';
import Header from '~/components/common/Header';
import News from '~/components/News';
import Footer from '~/components/common/Footer';
import { useRouter } from 'next/router';

const NewsPage = ({ data }) => {
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
          <News data={data} />
        </main>
        <Footer data={data} />
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/news-page?start=0&limit=15${
      ctx.query.filter ? `&sport=${ctx.query.filter}` : ''
    }`,
  );
  const data = await response.json();
  return { props: { data } };
}

export default NewsPage;
