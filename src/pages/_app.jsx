import '~/styles/globals.scss';
import MatchPanel from '~/components/common/MatchPanel';

export default function App({ Component, pageProps }) {
  return (
    <>
      <MatchPanel />
      <Component {...pageProps} />
    </>
  );
}
