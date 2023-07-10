import React from 'react';
import AppCard from '~/components/common/AppCard';
import AppButton from '~/components/common/AppButton';
import useMobile from '~/hooks/useMobile';
import { getConvertedDate } from '~/utils/getConvertedDate';

import styles from './NewsGrid.module.scss';

const NewsGrid = ({ title, news, topButtonLink, mobileButton }) => {
  const isMobile = useMobile(450);

  if (news.length === 0) return null;

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {topButtonLink && !isMobile && (
            <AppButton isArrow link={topButtonLink}>
              СМОТРЕТЬ ВСЕ
            </AppButton>
          )}
        </div>
      )}
      <div className={styles.wrapper}>
        {news
          .sort((el1, el2) => new Date(el2.updatedAt) - new Date(el1.updatedAt))
          .map(el => (
            <AppCard
              link={`/news/${el.slug}`}
              thumbnail={`${process.env.NEXT_PUBLIC_BASEURL}${el.bannerMedia?.image?.url} ` ?? undefined}
              title={el.title}
              date={getConvertedDate(el.updatedAt)}
              key={el.id}
            />
          ))}
      </div>
      {isMobile && mobileButton && (
        <AppButton isArrow link={topButtonLink} className={styles.mobileBtn}>
          СМОТРЕТЬ ВСЕ
        </AppButton>
      )}
    </section>
  );
};

export default NewsGrid;
