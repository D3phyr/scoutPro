import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import SportButton from '~/components/common/SportButton';
import AppButton from '~/components/common/AppButton';
import useMobile from '~/hooks/useMobile';

import styles from './Sports.module.scss';

const Sports = ({ data }) => {
  const isMobile = useMobile(450);

  return (
    <div className={styles.outer}>
      {isMobile ? (
        <ScrollContainer className={styles.wrapper}>
          <div className={styles.inner}>
            {data.map(el => (
              <SportButton
                icon={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`}
                text={el.title}
                key={el.id}
                link={`/news/?filter=${el.slug}`}
              />
            ))}
            <AppButton isArrow link="/news" className={styles.button}>
              СМОТРЕТЬ ВСЕ
            </AppButton>
          </div>
        </ScrollContainer>
      ) : (
        <>
          <ScrollContainer className={styles.wrapper}>
            <div className={styles.inner}>
              {data.map(el => (
                <SportButton
                  icon={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`}
                  text={el.title}
                  key={el.id}
                  link={`/news/?filter=${el.slug}`}
                />
              ))}
            </div>
          </ScrollContainer>
          <AppButton isArrow link="/news">
            СМОТРЕТЬ ВСЕ
          </AppButton>
        </>
      )}
    </div>
  );
};

export default Sports;
