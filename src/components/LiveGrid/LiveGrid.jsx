import React, { useState, useEffect } from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import AppCard from '~/components/common/AppCard';
import EmptyImg from '~/assets/img/empty.png';

import styles from './LiveGrid.module.scss';

const LiveGrid = () => {
  const [matchesArr, setMatchesArr] = useState(null);

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Трансляции', path: '/translations', active: true },
  ];

  const fetchData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchData: {
          NOT: {
            factically_started_at: null,
            broadcast_link: 'http',
          },
          ended_at: null,
        },
        page: 1,
        count: 999,
      }),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesUnauthorised`, requestOptions);
    const matches = await response.json();
    const matchesArr = matches.message.filter(el => el.statistics.matchLink && el.statistics.matchLink !== 'http');
    setMatchesArr(matchesArr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className={styles.title}>Трансляции</h1>
      <div className={styles.inner}>
        {matchesArr &&
          matchesArr.length > 0 &&
          matchesArr.map(el => (
            <AppCard
              thumbnail="/video_thumbnail.jpg"
              link={`/live/${el.id}`}
              title={el.name}
              date="LIVE NOW"
              className={styles.card}
              key={el.id}
            />
          ))}
        {matchesArr && matchesArr.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyInner}>
              <img src={EmptyImg.src} alt="" className={styles.emptyImg} />
              <p className={styles.emptyText}>Нет активных трансляций</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveGrid;
