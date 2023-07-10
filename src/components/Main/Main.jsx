import Sports from '~/components/common/Sports';
import NewsGrid from '~/components/common/NewsGrid';
import StoriesSection from './StoriesSection';
import LiveSection from './LiveSection';

import styles from './Main.module.scss';

const Main = ({ data }) => {
  const { typeOfSport } = data.typesOfSports.typesOfSports;
  const { newsInTrend, newsBySports, storiesZone } = data.entity;

  return (
    <div className={styles.wrapper}>
      <StoriesSection data={storiesZone} />
      <Sports data={typeOfSport} />
      <NewsGrid title={newsInTrend.title} news={newsInTrend.newsArticles} />
      <LiveSection />
      {newsBySports.typeOfSport.map(el => (
        <NewsGrid
          title={el.title}
          news={el.newsArticles}
          topButtonLink={`/news?filter=${el.slug}`}
          mobileButton
          key={el.id}
        />
      ))}
    </div>
  );
};

export default Main;
