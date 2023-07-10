import React, { useState, useEffect } from 'react';
import { Player, BigPlayButton } from 'video-react';
import HLSSource from '~/components/LiveMatch/HLSSource';
import useMobile from '~/hooks/useMobile';
import AppButton from '~/components/common/AppButton';

import styles from './LiveSection.module.scss';

const LiveSection = () => {
  const [matchData, setMatchData] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const isMobile = useMobile(450);

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
        count: 20,
      }),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesUnauthorised`, requestOptions);
    const data = await response.json();
    if (data.message.length === 0) {
      setIsEmpty(true);
      return;
    }
    const match = data.message.filter(el => el.statistics.matchLink && el.statistics.matchLink !== 'http');
    if (match.length > 0) {
      setMatchData(match[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!matchData) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Сейчас в прямом эфире</h2>
        {!isMobile && (
          <AppButton isArrow link="/live">
            СМОТРЕТЬ ВСЕ
          </AppButton>
        )}
      </div>
      <div className={styles.inner}>
        {matchData ? (
          <>
            <div className={styles.videoWrapper}>
              <Player autoPlay muted>
                <BigPlayButton position="center" />
                <HLSSource isVideoChild src={matchData.statistics.matchLink} />
              </Player>
            </div>
            <div className={styles.right}>
              <div className={styles.live}>LIVE NOW</div>
              <p className={styles.matchTitle}>{matchData.name}</p>
            </div>
          </>
        ) : isEmpty ? (
          <div className={styles.message}>
            <p>Нет активных трансляций</p>
          </div>
        ) : (
          <div className={styles.message}>
            <p>Загрузка...</p>
          </div>
        )}
      </div>
      {isMobile && (
        <AppButton isArrow link="/live" className={styles.mobileBtn}>
          СМОТРЕТЬ ВСЕ
        </AppButton>
      )}
    </section>
  );
};

export default LiveSection;
