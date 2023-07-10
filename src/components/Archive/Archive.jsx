import React, { useState, useRef, useEffect } from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import SportFilters from './SportFilters';
import MatchTable from './MatchTable';
import DateFilters from './DateFilters';
import Modal from './Modal';

import styles from './Archive.module.scss';

const Archive = ({ data }) => {
  const [sportFilterId, setSportFilterId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sportArray, setSportArray] = useState([
    'Хоккей',
    'Футбол',
    'Баскетбол',
    'Теннис',
    'Волейбол',
    'Настольный теннис',
    'Крикет',
  ]);
  const [dateFilterId, setDateFilterId] = useState(2);
  const [dateArray, setDateArray] = useState([
    'Сегодня',
    'Вчера',
    'Текущий месяц',
    'Текущий квартал',
    'Последние 30 дней',
    'Весь год',
  ]);
  const [matches, setMatches] = useState(data);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      fetchData();
    }
  }, [sportFilterId, startDate]);

  useEffect(() => {
    if (isLoaded) {
      changeStartEndPoints();
    }
  }, [dateFilterId]);

  const changeStartEndPoints = val => {
    if (dateFilterId === 0) {
      const currentDate = new Date();
      const tomorrow = currentDate.setDate(currentDate.getDate() + 1);
      setEndDate(new Date(new Date(tomorrow).setUTCHours(0, 0, 0, 0)).toISOString(0, 0, 0, 0));
      setStartDate(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString());
    } else if (dateFilterId === 1) {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      setEndDate(new Date(date.setUTCHours(23, 59, 59, 999)).toISOString());
      setStartDate(new Date(date.setUTCHours(0, 0, 0, 0)).toISOString());
    } else if (dateFilterId === 2) {
      setEndDate(new Date().toISOString());
      setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
    } else if (dateFilterId === 3) {
      if (Math.floor(new Date().getMonth() / 3 + 1) === 1) {
        setStartDate(new Date(new Date().getFullYear(), 0, 1).toISOString());
      } else if (Math.floor(new Date().getMonth() / 3 + 1) === 2) {
        setStartDate(new Date(new Date().getFullYear(), 3, 1).toISOString());
      } else if (Math.floor(new Date().getMonth() / 3 + 1) === 3) {
        setStartDate(new Date(new Date().getFullYear(), 6, 1).toISOString());
      } else if (Math.floor(new Date().getMonth() / 3 + 1) === 4) {
        setStartDate(new Date(new Date().getFullYear(), 9, 1).toISOString());
      }
      setEndDate(new Date().toISOString());
    } else if (dateFilterId === 4) {
      setEndDate(new Date().toISOString());
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());
    } else if (dateFilterId === 5) {
      setEndDate(new Date().toISOString());
      setStartDate(new Date(new Date().getFullYear(), 0, 1).toISOString());
    }
  };

  const changeSportFilter = val => {
    setIsLoaded(true);
    setSportFilterId(val);
  };

  const changeDateFilter = val => {
    setIsLoaded(true);
    setDateFilterId(val);
  };

  const fetchData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchData: {
          NOT: {
            ended_at: null,
          },
          date: {
            gte: startDate,
            lte: endDate,
          },
          sportId: sportFilterId === 0 ? undefined : sportFilterId,
        },
        page: 1,
        count: 200,
      }),
    };
    const responseMatches = await fetch(
      `${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesUnauthorised`,
      requestOptions,
    );
    const dataMatches = await responseMatches.json();
    if (dataMatches.message.length) {
      setMatches(dataMatches.message);
    } else {
      setMatches(null);
    }
  };

  const onModalOpen = data => {
    setModalData(data);
    setIsModalActive(true);
  };

  const onModalClose = () => {
    setIsModalActive(false);
    setModalData(null);
  };

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('body-scroll-disabled');
    } else {
      document.body.classList.remove('body-scroll-disabled');
    }
  }, [isModalActive]);

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Архив', path: '/archive', active: true },
  ];

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className={styles.title}>Архив матчей</h1>
      <SportFilters
        changeSportFilter={changeSportFilter}
        currentSportIndex={sportFilterId}
        data={sportArray}
      ></SportFilters>
      <DateFilters changeDateFilter={changeDateFilter} currentDateIndex={dateFilterId} data={dateArray}></DateFilters>
      <MatchTable data={matches} onModalOpen={onModalOpen}></MatchTable>
      <Modal isActive={isModalActive} onClose={onModalClose} data={modalData} />
    </div>
  );
};

export default Archive;
