import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { getConvertedDate } from '~/utils/getConvertedDate';

import styles from './Modal.module.scss';

const Modal = ({ isActive, onClose, data }) => {
  const [eventsData, setEventsData] = useState([]);
  const [matchId, setMatchId] = useState(null);

  const fetchEvents = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchWithEvents/${matchId}`);
    const data = await response.json();
    setEventsData(data.events);
  };

  useEffect(() => {
    if (data) {
      setMatchId(data.id);
    }
  }, [data]);

  useEffect(() => {
    if (matchId) {
      fetchEvents();
    }
  }, [matchId]);

  useEffect(() => {
    return () => {
      setEventsData([]);
    };
  }, []);

  return (
    <>
      <div className={cn(styles.outer, isActive && styles.active)}>
        <div className={cn(styles.wrapper, isActive && styles.active)}>
          {data && (
            <>
              <div className={styles.close} onClick={onClose}></div>
              <p className={styles.sectionTitle}>Статистика по матчу</p>
              <div className={styles.info}>
                <p className={styles.title}>{data.name}</p>
                <p className={styles.date}>{getConvertedDate(data.date)}</p>
                <p className={styles.score}>{`${data.statistics.Side_1.points} : ${data.statistics.Side_2.points}`}</p>
                <div className={styles.times}>
                  {data.statistics.times.map((el, i) => (
                    <span key={i}>
                      <span>{el}</span>
                      {i < data.statistics.times.length - 1 && <span className={styles.divider}>|</span>}
                    </span>
                  ))}
                </div>
                {data.statistics.Referee && (
                  <p className={styles.arbitr}>{`Судьи: ${data.statistics.Referee.map((el, i) =>
                    i < data.statistics.Referee.length ? ` ${el}` : el,
                  )}`}</p>
                )}
                {data.statistics?.Side_1?.possession !== undefined &&
                  data.statistics?.Side_1?.possession !== 0 &&
                  data.statistics?.Side_2?.possession !== undefined &&
                  data.statistics?.Side_2?.possession !== 0 && (
                    <div className={styles.progress}>
                      <p className={styles.progressTitle}>Владение</p>
                      <div className={styles.progressInner}>
                        <div className={styles.left}>
                          <div className={styles.bar}></div>
                          <div
                            className={styles.activeLeftBar}
                            style={{ width: `${data.statistics.Side_1.possession}%` }}
                          ></div>
                          <p className={styles.text}>{`${data.statistics.Side_1.possession}%`}</p>
                        </div>
                        <div className={styles.right}>
                          <div className={styles.bar}></div>
                          <div
                            className={styles.activeRightBar}
                            style={{ width: `${data.statistics.Side_2.possession}%` }}
                          ></div>
                          <p className={styles.text}>{`${data.statistics.Side_2.possession}%`}</p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className={styles.events}>
                <p className={styles.eventsTitle}>Протокол событий</p>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Дата</th>
                        <th>Игровое время</th>
                        <th>Тип события</th>
                        <th>Команда</th>
                        <th>Игрок</th>
                        <th>Счет</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsData.map((el, i) => {
                        if (i === 0 || i === eventsData.length - 1 || !el.data['Match.statistics.text_messages'])
                          return null;
                        const dataArr = el.data['Match.statistics.text_messages'].slice(1).split('|');
                        return (
                          <tr key={i}>
                            <td>{getConvertedDate(el.date, true)}</td>
                            <td>{dataArr[0]}</td>
                            <td>{dataArr[dataArr.length - 2]}</td>
                            <td>{dataArr[3]}</td>
                            <td>{dataArr[dataArr.length - 1]}</td>
                            <td>{dataArr[2]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={cn(styles.overlay, isActive && styles.active)} onClick={onClose}></div>
    </>
  );
};

export default Modal;
