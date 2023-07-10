import React, { useState } from 'react';
import cn from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';
import SportButton from '~/components/common/SportButton';
import AppButton from '~/components/common/AppButton';
import useMobile from '~/hooks/useMobile';

import styles from './SportFilters.module.scss';

const SportFilters = ({ data, activeFilter }) => {
  const isMobile = useMobile(450);

  return (
    <div className={styles.outer}>
      {
        <>
          <ScrollContainer className={styles.wrapper}>
            <div className={styles.inner}>
              <AppButton link="/news" className={cn(styles.buttonAll, activeFilter === '' && styles.active)}>
                ВСЕ НОВОСТИ
              </AppButton>
              {data.map(el => (
                <SportButton
                  icon={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`}
                  text={el.title}
                  key={el.id}
                  isActive={activeFilter === el.slug}
                  link={`/news/?filter=${el.slug}`}
                />
              ))}
            </div>
          </ScrollContainer>
        </>
      }
    </div>
  );
};

export default SportFilters;
