import React, { useState, useEffect, useMemo } from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import AppCard from '~/components/common/AppCard';
import { useRouter } from 'next/router';
import { Player, BigPlayButton } from 'video-react';
import HLSSource from './HLSSource';

import styles from './LiveMatch.module.scss';

const LiveMatch = () => {
  const [matchesArr, setMatchesArr] = useState([]);
  const [current, setCurrent] = useState(null);

  const router = useRouter();

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Трансляции', path: '/live', active: false },
    { title: current?.name ?? 'Загрузка...', path: router.asPath, active: true },
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
    setMatchesArr([...matches.message]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const currentMatch = matchesArr.filter(el => el.id === Number(router.query.id))[0];
    setCurrent(currentMatch);
  }, [matchesArr]);

  const otherMatches = useMemo(() => matchesArr.filter(el => el.id !== Number(router.query.id)), [matchesArr]);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <div className={styles.videoWrapper}>
        {current ? (
          <>
            <Player autoPlay muted>
              <BigPlayButton position="center" />
              <HLSSource isVideoChild src={current.statistics.matchLink} />
            </Player>
            <h1 className={styles.matchTitle}>{current.name}</h1>
            <div className={styles.live}>LIVE NOW</div>
          </>
        ) : (
          <p>Зазрузка...</p>
        )}
      </div>

      <div className={styles.other}>
        <p className={styles.title}>Другие трансляции</p>
        <div className={styles.inner}>
          {otherMatches.length > 0 &&
            otherMatches.map(el => (
              <AppCard
                thumbnail="/video_thumbnail.jpg"
                link={`/live/${el.id}`}
                title={el.name}
                date="LIVE NOW"
                className={styles.card}
                key={el.id}
              />
            ))}
          {otherMatches.length === 0 && <p>В данный момент нет других активных трансляций</p>}
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
