import React, { useState, useEffect } from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import { useRouter } from 'next/router';
import AwardIcon from '~/assets/img/award.png';
import data from './data';
import useMobile from '~/hooks/useMobile';
import TeamImg from '~/assets/img/team.png';

import styles from './TeamStats.module.scss';

const TeamStats = () => {
  const [teamData, setTeamData] = useState(null);
  const [events, setEvents] = useState([]);

  const isMobile = useMobile(450);

  const router = useRouter();

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: teamData?.KindOfSport?.name, path: router.asPath, active: false },
    { title: teamData?.name, path: router.asPath, active: true },
  ];

  const fetchData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchData: {
          id: Number(router.query.id),
        },
      }),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SCOUTURL}/api/searchTeam`, requestOptions);
    const data = await response.json();
    const events = [];
    for (let key in data[0].statistics) {
      if (key.includes('event')) {
        events.push(data[0].statistics[key]);
      }
    }
    setEvents(events);
    setTeamData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      {teamData ? (
        <>
          {isMobile && <Breadcrumbs links={breadcrumbs} />}
          <div className={styles.left}>
            <img src={TeamImg.src} alt="" className={styles.image} />
            <h1 className={styles.name}>{teamData.name}</h1>
            {/* <p className={styles.city}>{`Город: ${data.city}`}</p>
            <p className={styles.season}>{`Сезон ${data.season}`}</p> */}
          </div>
          <div className={styles.right}>
            {!isMobile && <Breadcrumbs links={breadcrumbs} />}
            <div className={styles.header}>
              <span className={styles.tab}>Статистика</span>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Результаты</th>
                    <th>Всего</th>
                    <th>Дома</th>
                    <th>В гостях</th>
                    {/* <th>Серия</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ПОБЕДЫ</td>
                    <td>{teamData.statistics.wins_total ?? ''}</td>
                    <td>{teamData.statistics.wins_home ?? ''}</td>
                    <td>{teamData.statistics.wins_anywhere ?? ''}</td>
                  </tr>
                  <tr>
                    <td>ПОРАЖЕНИЯ</td>
                    <td>{teamData.statistics.fails_total ?? ''}</td>
                    <td>{teamData.statistics.fails_home ?? ''}</td>
                    <td>{teamData.statistics.fails_anywhere ?? ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.rates}>
              <p className={styles.sectionTitle}>Коэффициенты</p>
              <div className={styles.grid}>
                {events.map((el, i) => (
                  <article className={styles.item} key={i}>
                    <p className={styles.rateValue}>{el.count}</p>
                    <p className={styles.rateTitle}>{el.name}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className={styles.awards}>
              {teamData.statistics.awards && (
                <>
                  <p className={styles.sectionTitle}>Награды</p>
                  <div className={styles.grid}>
                    {teamData.statistics.awards &&
                      teamData.statistics.awards.map((el, i) => (
                        <article className={styles.item} key={i}>
                          <img src={AwardIcon.src} alt="" className={styles.awardIcon} />
                          <p className={styles.awardTitle}>{el}</p>
                        </article>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.inner}>
          <p>Загрузка...</p>
        </div>
      )}
    </div>
  );
};

export default TeamStats;
